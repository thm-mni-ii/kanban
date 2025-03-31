import { defineStore } from 'pinia';
import axios from 'axios';

export const useTimeTrackingStore = defineStore('timeTracking', {
  state: () => ({
    entries: [], // Alle Zeiteinträge
    currentView: 'Woche', // Aktive Ansicht: 'Woche', 'Monat', 'Jahr'
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
      return days.reduce((acc, day) => {
        acc[day] = state.entries.filter((entry) => {
          const entryDate = new Date(entry.activity_start);
          const entryDay = entryDate.toLocaleDateString("de-DE", { weekday: "long" }); 
          return entryDay === day;
        });
        return acc;
      }, {});
    },
    

    groupedEntriesByWeek: (state) => {
      const getWeekNumber = (dateString) => {
        const date = new Date(dateString);
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear + 86400000) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
      };
    
      return state.entries.reduce((weeks, entry) => {
        const weekNumber = getWeekNumber(entry.date);
        if (!weeks[weekNumber]) weeks[weekNumber] = []; // ✅ Korrektur der Initialisierung
        weeks[weekNumber].push(entry);
        return weeks;
      }, {});
    },
    

    filteredEntries: (state) => (filter) => {
        return state.entries.filter((entry) => entry.date.includes(filter));
    }
  },

  actions: {
    async addEntry(entry) {
      const bearerToken = localStorage.getItem("token")? localStorage.getItem("token"):import.meta.env.VITE_KANBAN_TOKEN;

      // make time utc
      if(entry.activity_start) {
        entry.activity_start = new Date(entry.activity_start).toUTCString();
      }

      try {
        // TODO: Call the kanban api instead of localhost
        const response = await fetch("http://localhost:3000/time/", {
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

      // make time utc
      if(entry.activity_start) {
        entry.activity_start = new Date(entry.activity_start).toUTCString();
      }

      try {
        // TODO: Call the kanban API instead of localhost
        const response = await axios.put(`http://localhost:3000/time/${entryId}`, entry,{
          headers: {
            'Authorization': `Bearer ${bearerToken}`, // Send token in Authorization header
            'Content-Type': 'application/json',
          }
        });

        // Axios automatically parses JSON, no need for response.json()
        this.fetchEntries();
      } catch (err) {
        this.error = err.message;
        console.error(this.error);
        console.log(JSON.stringify(entry));
      } finally {
        this.loading = false;
      }
    },
    removeEntry(entryId) {
      // Entfernt einen Eintrag nach seiner ID
      this.entries = this.entries.filter((entry) => entry.id !== entryId);
    },
    changeView(view) {
      // Ändert die aktuelle Ansicht
      this.currentView = view;
    },
    async fetchEntries() {
      const bearerToken = localStorage.getItem("token") ? localStorage.getItem("token") : import.meta.env.VITE_KANBAN_TOKEN;
      const userId = localStorage.getItem("userid") ? localStorage.getItem("userid") : import.meta.env.VITE_USER_ID;

      try {
        // TODO: Call the kanban API instead of localhost
        const response = await axios.get(`http://localhost:3000/time/user/${userId}`, {
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
