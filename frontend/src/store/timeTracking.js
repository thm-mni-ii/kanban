import { defineStore } from 'pinia';

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
          const entryDate = new Date(entry.date);
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
      // TODO: Get the correct token
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
      }
      
      this.entries = [...this.entries,entry];
      console.log(this.entries)
    },
    editEntry(updatedEntry){
      const index = this.entries.findIndex(entry => entry.id === updatedEntry.id);
      if(index !== -1){
        this.entries = [...this.entries.slice(0, index), updatedEntry, ...this.entries.slice(index + 1)];
      }
    },
    removeEntry(entryId) {
      // Entfernt einen Eintrag nach seiner ID
      this.entries = this.entries.filter((entry) => entry.id !== entryId);
    },
    changeView(view) {
      // Ändert die aktuelle Ansicht
      this.currentView = view;
    }
  },
});
