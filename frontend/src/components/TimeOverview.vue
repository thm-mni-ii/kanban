<template>
  <div>
    <!-- Pass entries and handle events -->
    <time-tracking
      :entries="entries"
      @add-entry="addEntry"
      @edit-entry="editEntry"
      @delete-entry="deleteEntry"
    />
  </div>
</template>

<script>
import TimeTracking from '@/TimeTracking.vue';

export default {
  components: { TimeTracking },
  data() {
    return {
      entries: [
        {
          date: "2024-12-15",
          startTime: "08:00",
          endTime: "12:45",
          description: "Meeting",
        },
        {
          date: "2024-12-16",
          startTime: "13:00",
          endTime: "17:00",
          description: "Project Work",
        },
      ],
    };
  },

  methods: {
    addEntry(newEntry) {
      const entry = {
        date: newEntry.date || "2025-01-01",
        startTime: newEntry.startTime || "09:00",
        endTime: newEntry.endTime || "17:00",
        description: newEntry.description || "New Entry",
      };
      this.entries.push(entry);
    },

    editEntry(updatedEntry, index) {
      this.entries[index] = updatedEntry; // Replace the entry at the specified index
    },

    deleteEntry(index) {
      this.entries.splice(index, 1); // Remove the entry at the specified index
    },
  },
};
</script>
