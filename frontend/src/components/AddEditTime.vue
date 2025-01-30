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
import { useTimeTrackingStore } from '@/store/timeTracking';


export default {
  name: "AddEditTime",
  props: ["entry"], // Optional prop for editing existing entries
  emits: ["add-entry", "cancel","edit-entry"],
  computed: {
    isEditing() {
      return !!this.entry; // Prüft, ob ein bestehender Eintrag bearbeitet wird
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
      const store = useTimeTrackingStore(); // Zugriff auf den Store

      // Neuer Eintrag mit allen Daten
      const updatedEntry = {
        id: this.entry?.id || Date.now(),
        date: this.localDate,
        startTime: this.localStartTime,
        endTime: this.localEndTime,
        description: this.localDescription,
      };

      if(this.isEditing){
        // Bestehenden Eintrag bearbeiten
        store.editEntry(updatedEntry);
        this.$emit("edit-entry",updatedEntry);
      }else {
        // Neuen Eintrag speichern
        store.addEntry(updatedEntry);
        this.$emit("add-entry",updatedEntry);
      }


      // Formular zurücksetzen und schließen
      this.resetForm();
      
      this.$emit("cancel");
    },

    // Reset form fields after saving
    resetForm() {
      this.localDate = "";
      this.localStartTime = "";
      this.localEndTime = "";
      this.localDescription = "";
    },
  },
};
</script>
