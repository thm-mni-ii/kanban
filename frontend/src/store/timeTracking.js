import { defineStore } from 'pinia';
import { TimeTrackingService } from '@/lib/timetracking.service';
import { UserService } from '@/lib/user.service';

export const useTimeTrackingStore = defineStore('timeTracking', {
  state: () => ({
    entries: [], // Alle Zeiteinträge
    currentView: 'Woche', // Aktive Ansicht: 'Woche', 'Monat', 'Jahr'
    fromDate: null,
    toDate: null,
    error: null,
    loading: false,
    currentGroupId: -1,
  }),

  getters: {
    totalHours: (state) => {
      return state.entries.reduce((sum, entry) => sum + (entry.hours || 0), 0);
    },

    groupedEntriesByMonth: (state) => {
      // Wenn kein Zeitraum gesetzt ist: nicht filtern, aber trotzdem pro Tag gruppieren
      const hasRange = !!(state.fromDate && state.toDate);

      const from = hasRange ? new Date(state.fromDate) : null;
      const to = hasRange ? new Date(state.toDate) : null;

      if (from && to) {
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
      }

      const pad = (n) => String(n).padStart(2, "0");
      const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

      const map = {};

      for (const e of state.entries ?? []) {
        // Datum bestimmen
        let d = null;
        if (e.activity_start) {
          d = new Date(e.activity_start);
        } else if (e.date) {
          d = new Date(e.date);
        } else {
          continue; // kein Datum -> überspringen
        }

        // Optional filtern
        if (hasRange) {
          const cmp = new Date(d);
          cmp.setHours(12, 0, 0, 0); // Stabil gegen TZ-Kanten
          if (cmp < from || cmp > to) continue;
        }

        const key = toISO(d); // pro Kalendertag gruppieren
        if (!map[key]) map[key] = [];
        map[key].push(e);
      }

      return map; // { '2025-09-01': [..], '2025-09-02': [..], ... }
    },

    groupedEntriesByDay: (state) => {
      const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

      if (!state.fromDate || !state.toDate) {
        return days.reduce((acc, day) => {
          acc[day] = (state.entries ?? []).filter((entry) => {
            const entryDate = new Date(entry.activity_start || entry.date);
            const entryDay = entryDate.toLocaleDateString("de-DE", { weekday: "long" });
            return entryDay === day;
          });
          return acc;
        }, {});
      }

      const from = new Date(state.fromDate);
      const to = new Date(state.toDate);
      from.setHours(0, 0, 0, 0);
      to.setHours(23, 59, 59, 999);

      return days.reduce((acc, day) => {
        acc[day] = (state.entries ?? []).filter((entry) => {
          const entryDate = new Date(entry.activity_start || entry.date);
          entryDate.setHours(0, 0, 0, 0);
          const entryDay = entryDate.toLocaleDateString("de-DE", { weekday: "long" });

          return entryDay === day && entryDate >= from && entryDate <= to;
        });
        return acc;
      }, {});
    }
  },


  actions: {
    async addEntry(entry) {
      this.loading = true;
      this.error = null;

      // make time utc
      if (entry.activity_start) {
        entry.activity_start = new Date(entry.activity_start).toUTCString();
      }

      try {
        await TimeTrackingService.createTimeTracker(entry);
        await this.fetchEntries();
      } catch (err) {
        this.error = err.message;
        console.error(this.error);
      } finally {
        this.loading = false;
      }
    },
    updateActivityLocally(id, updatedData) {
      // get index of entry with the id in question, returns -1 if entry with the id was not found
      const index = this.entries.findIndex(
        entry => entry.time_tracking_id === id
      )

      // proceed if entry was found eg. index is not -1
      if (index !== -1) {
        // merge the data of the entry at the found index, to ensure only changed fields get updated
        this.entries[index] = {
          ...this.entries[index],
          ...updatedData
        }
      } else {
        // if no entry with a matching id was found eg. index == 0 print a warning. 
        console.warn(`Activity with id ${id} not found`)
      }
    },
    async editEntry(entry) {
      this.loading = true;
      this.error = null;
      const entryId = entry.time_tracking_id;

      // make time utc
      if (entry.activity_start) {
        entry.activity_start = new Date(entry.activity_start).toUTCString();
      }

      try {
        await TimeTrackingService.updateTimeTracker(entryId, entry);
        await this.fetchEntries();
      } catch (err) {
        this.error = err.message;
        console.error(this.error);
      } finally {
        this.loading = false;
      }
    },
    async removeEntry(entryId) {
      // Entfernt einen Eintrag nach seiner ID
      this.loading = true;
      this.error = null;

      try {
        await TimeTrackingService.deleteTimeTracker(entryId);
        await this.fetchEntries();
      } catch (err) {
        this.error = err.message;
        console.error(this.error);
      } finally {
        this.loading = false;
      }
    },
    changeView(view) {
      // Ändert die aktuelle Ansicht
      this.currentView = view;
    },
    setCurrentGroup(groupId) {
      this.currentGroupId = groupId;
    },
    async fetchEntries() {
      this.loading = true;
      this.error = null;

      try {
        const user = await UserService.getCurrentUser();
        const group_id = this.currentGroupId;


        if (group_id === -1 || group_id === null) {
          // no group selected
          this.entries = await TimeTrackingService.getTimeTrackersByUser(user.id);
        } else {
          // group selected -> backend decides if the user see only his own entries or the groups entries
          this.entries = await TimeTrackingService.getTimeTrackersByGroup(group_id);
        }

      } catch (err) {
        this.error = err.message;
        console.error(this.error);
      } finally {
        this.loading = false;
      }
    },
    setMonthRange(year, month) {
      // month: 1-12 (Januar = 1)
      const first = new Date(year, month - 1, 1);
      const last = new Date(year, month, 0); // letzter Tag des Monats

      // Normalisierungen
      first.setHours(0, 0, 0, 0);
      last.setHours(23, 59, 59, 999);

      this.fromDate = first.toISOString();
      this.toDate = last.toISOString();
    }

  }
});
