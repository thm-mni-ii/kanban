import { defineStore } from 'pinia';
import axios from 'axios';

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
      const bearerToken = localStorage.getItem("token")? localStorage.getItem("token"):import.meta.env.VITE_KANBAN_TOKEN;
      const baseURL = import.meta.env.VITE_APP_API_URL;

      // make time utc
      if(entry.activity_start) {
        entry.activity_start = new Date(entry.activity_start).toUTCString();
      }

      try {
        const response = await fetch(baseURL+"/time/", {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${bearerToken}`, // Send token in Authorization header
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(entry)
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch groups');
        }
  
        const data = await response.json();
        // todo fetch time entries
  
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
        this.fetchEntries();
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
      const bearerToken = localStorage.getItem("token") ? localStorage.getItem("token") : import.meta.env.VITE_KANBAN_TOKEN;
      const userId = localStorage.getItem("userid") ? localStorage.getItem("userid") : import.meta.env.VITE_USER_ID;
      const entryId = entry.time_tracking_id;
      const baseURL = import.meta.env.VITE_APP_API_URL;

      // make time utc
      if(entry.activity_start) {
        entry.activity_start = new Date(entry.activity_start).toUTCString();
      }

      try {
        const response = await axios.put(`${baseURL}/time/${entryId}`, entry,{
          headers: {
            'Authorization': `Bearer ${bearerToken}`, // Send token in Authorization header
            'Content-Type': 'application/json',
          }
        });

        // fetch data, when update was successful
        this.fetchEntries();
      } catch (err) {
        this.error = err.message;
        console.error(this.error);
      } finally {
        this.loading = false;
      }
    },
    async removeEntry(entryId) {
      // Entfernt einen Eintrag nach seiner ID
      const bearerToken = localStorage.getItem("token") ? localStorage.getItem("token") : import.meta.env.VITE_KANBAN_TOKEN;
      const baseURL = import.meta.env.VITE_APP_API_URL;
      try {
        const response = await axios.delete(`${baseURL}/time/${entryId}`,{
          headers: {
            'Authorization': `Bearer ${bearerToken}`, // Send token in Authorization header
            'Content-Type': 'application/json',
          }
        });

        // fetch data when delete was successful
        this.fetchEntries();
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
      const bearerToken = localStorage.getItem("token") ? localStorage.getItem("token") : import.meta.env.VITE_KANBAN_TOKEN;
      const userId = localStorage.getItem("userid") ? localStorage.getItem("userid") : import.meta.env.VITE_USER_ID;
      const baseURL = import.meta.env.VITE_APP_API_URL;

      try {
        const response = await axios.get(`${baseURL}/time/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${bearerToken}`, // Send token in Authorization header
            'Content-Type': 'application/json',
          }
        });

        // Axios automatically parses JSON, no need for response.json()
        this.entries = response.data;
      } catch (err) {
        this.error = err.message;
        console.error(this.error);
      } finally {
        this.loading = false;
      }
    }
  }
});
