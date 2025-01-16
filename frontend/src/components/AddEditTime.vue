<template>
    <base-card>
      <div class="add-edit-time">
        <h2> {{ isEditing ? "Eintrag bearbeiten" : "Neuen Eintrag hinzufügen" }}</h2>
        <form @submit.prevent="saveEntry">
          <!-- Date -->
          <div>
            <label for="date">Datum:</label>
            <input type="date" id="date" v-model="localDate" required />
          </div>
          <!-- Start Time -->
          <div>
            <label for="startTime">Startzeit:</label>
            <input type="time" id="startTime" v-model="localStartTime" required />
          </div>
          <!-- End Time -->
          <div>
            <label for="endTime">Endzeit:</label>
            <input type="time" id="endTime" v-model="localEndTime" required />
          </div>
          <!-- Description -->
          <div>
            <label for="description">Beschreibung (optional):</label>
            <textarea id="description" v-model="localDescription" placeholder="Beschreibung hinzufügen"></textarea>
          </div>
          <!-- Buttons -->
          <div class="buttons">
            <button type="submit">Speichern</button>
            <button type="button" @click="$emit('cancel')">Abbrechen</button>
          </div>
        </form>
      </div>
    </base-card>
  </template>
  
  <script>
  export default {
    props: ["entry"], // Optional prop for editing existing entries
    computed: {
      isEditing() {
        return !!this.entry;
      },
    },
    data() {
      return {
        localDate: this.entry?.date || "",
        localStartTime: this.entry?.startTime || "",
        localEndTime: this.entry?.endTime || "",
        localDescription: this.entry?.description || "",
      };
    },
    methods: {
      saveEntry() {
        this.$emit("add-entry", {
          date: this.localDate,
          startTime: this.localStartTime,
          endTime: this.localEndTime,
          description: this.localDescription,
        });
  
        // Reset form fields after saving
        this.localDate = "";
        this.localStartTime = "";
        this.localEndTime = "";
        this.localDescription = "";
      },
    },
  };
  </script>
  