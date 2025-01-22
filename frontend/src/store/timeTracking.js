import { defineStore } from 'pinia';

export const useTimeTrackingStore = defineStore('timeTracking', {
  state: () => ({
    entries: [], // Alle Zeiteinträge
    currentView: 'Woche', // Aktive Ansicht: 'Woche', 'Monat', 'Jahr'
  }),

  getters: {
    totalHours: (state) => {    // Der Pfeil-Operator (Arrow Function) definiert eine Funktion.
      // Berechnet die Gesamtstunden basierend auf den Einträgen
      return state.entries.reduce((sum, entry) => sum + entry.hours, 0);
    },



    groupedEntriesByDay: (state) => {
      // Gruppiert Einträge nach Datum
      const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
      return days.reduce((acc, day) => {
        acc[day] = state.entries.filter((entry) => entry.day === day);
        return acc;
      }, {});
    },


    groupedEntriesByWeek: (state) => {
        const getWeekNumber = (dateString) => {
            const date = new Date(dateString);
            const firstDayOfYear = new Date(date.getFullYear(), 0 , 1);
            const pastDaysOfYear = (date - firstDayOfYear + 86400000) / 86400000;
            return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() +1) / 7);
        };

        return state.entries.reduce((weeks, entry) => {
            const weekNumber = getWeekNumber(entry.date);
            if(!weeks[weekNumber].push(entry));
            return weeks;
        }, {});
    },



    filteredEntries: (state) => (filter) => {
        return state.entries.filter((entry) => entry.date.includes(filter));
    }
  },

  actions: {
    addEntry(entry) {
      // Fügt einen neuen Eintrag hinzu
      entry.hours = this.calculateHours(entry.startTime, entry.endTime);
      this.entries.push(entry);
    },
    removeEntry(entryId) {
      // Entfernt einen Eintrag nach seiner ID
      this.entries = this.entries.filter((entry) => entry.id !== entryId);
    },
    changeView(view) {
      // Ändert die aktuelle Ansicht
      this.currentView = view;
    },
    calculateHours(startTime, endTime) {
        const [startHour, startMinute] = startTime.split(":").map(Number);
        const [endHour, endMinute] = endTime.split(":").map(Number);
        const totalHours = (endHour + endMinute / 60) - (startHour + startMinute / 60);
        return Math.max(0, totalHours.toFixed(2));
    }
  },
});
