
<template>
    <div class="time-overview">
        <h2>{{ viewTitle }}</h2>
        <div v-if="filteredEntries.length">
            <!--Alle gefilterten TimeCards anzeigen-->
            <TimeCard
            v-for="entry in filteredEntries"
            :key="entry.id"
            :date="entry.date"
            :startTime="entry.startTime"
            :endTime="entry.endTime"
            :hours="entry.hours"
            :description="entry.description"
            @edit="editEntry(entry)"
            @delete="deleteEntry(entry)"
            />
        </div>  
        <p v-else>Keine Einträge für andere Ansichten</p>
    </div>
</template>




<script>
import TimeCard from "./TimeCard.vue";

export default {
  name: "TimeOverview",

  components: {
    TimeCard,
  },
  props: {
    view: {
      type: String,
      required: true, // "day", "week", "month", "year"
    },
    entries: {
      type: Array,
      required: true, // List of timeentries
    },
  },

  computed: {
    filteredEntries() {
      // Filterlogic based on the current view

      const now = new Date();
      return this.entries.filter((entry) => {
        const entryDate = new Date(entry.date);

        if (this.view === "day") {
          return entryDate.toDateString() === now.toDateString();
        }

        if (this.view === "week") {
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay());

          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);

          return entryDate >= startOfWeek && entryDate <= endOfWeek;
        }

        if (this.view === "month") {
          return (
            entryDate.getMonth() === now.getMonth() &&
            entryDate.getFullYear() === now.getFullYear()
          );
        }

        if (this.view === "year") {
          return entryDate.getFullYear() === now.getFullYear();
        }

        return true;
      });
    },

    methods: {

      viewTitle() {
      const titles = {
        day: "Tagesübersicht",
        week: "Wochenübersicht",
        month: "Monatsübersicht",
        year: "Jahresübersicht",
      };
      return titles[this.view] || "Übersicht";
    },
  },
    
},

  methods: {
    editEntry(entry) {
      this.$emit("edit", entry);
    },
    deleteEntry(entry) {
      this.$emit("delete", entry);
    },
  },
};
</script>
