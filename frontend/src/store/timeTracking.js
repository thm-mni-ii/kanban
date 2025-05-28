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
  }),

  getters: {
    totalHours: (state) => {    // Der Pfeil-Operator (Arrow Function) definiert eine Funktion.
      // Berechnet die Gesamtstunden basierend auf den Einträgen
      return state.entries.reduce((sum, entry) => sum + entry.hours, 0);
    },


    groupedEntriesByDay: (state) => {
      const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

      // Falls fromDate oder toDate nicht gesetzt sind → alle Einträge zurückgeben wie bisher
      if (!state.fromDate || !state.toDate) {
        return days.reduce((acc, day) => {
          acc[day] = state.entries.filter((entry) => {
            const entryDate = new Date(entry.activity_start);
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
        acc[day] = state.entries.filter((entry) => {
          const entryDate = new Date(entry.activity_start || entry.date);
          entryDate.setHours(0, 0, 0, 0);
          const entryDay = entryDate.toLocaleDateString("de-DE", { weekday: "long" });

          return (
            entryDay === day &&
            entryDate >= from &&
            entryDate <= to
          );
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
      if(entry.activity_start) {
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
    async editEntry(entry){
      this.loading = true;
      this.error = null;
      const entryId = entry.time_tracking_id;

      // make time utc
      if(entry.activity_start) {
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
    async fetchEntries() {
      this.loading = true;
      this.error = null;

      try {
        const user = await UserService.getCurrentUser();
        this.entries = await TimeTrackingService.getTimeTrackersByUser(user.id);
      } catch (err) {
        this.error = err.message;
        console.error(this.error);
      } finally {
        this.loading = false;
      }
    }
  }
});
