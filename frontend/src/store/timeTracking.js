import { defineStore } from 'pinia';

export const useTimeTrackingStore = defineStore('timeTracking', {
  state: () => ({
    entries: [], // Alle Zeiteinträge
    currentView: 'week', // Aktive Ansicht: 'week', 'month', 'year'
  }),

  getters: {
    totalHours: (state) => {    // Der Pfeil-Operator (Arrow Function) definiert eine Funktion.
      // Berechnet die Gesamtstunden basierend auf den Einträgen
      return state.entries.reduce((sum, entry) => sum + entry.hours, 0);
    },
    groupedEntriesByDay: (state) => {
      // Gruppiert Einträge nach Datum
      return state.entries.reduce((grouped, entry) => {
        if (!grouped[entry.date]) grouped[entry.date] = [];
        grouped[entry.date].push(entry);
        return grouped;
      }, {});
    },
    filteredEntries: (state) => (filter) => {
        return state.entries.filter((entry) => entry.date.includes(filter));
    }
  },

  actions: {
    addEntry(entry) {
      // Fügt einen neuen Eintrag hinzu
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
  },
});
