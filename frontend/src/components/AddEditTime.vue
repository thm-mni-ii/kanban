<template>
  <base-card>
    <div class="add-edit-time">
      <h2> {{ isEditing ? "Eintrag bearbeiten" : "Neuen Eintrag hinzufügen" }}</h2>
      <form @submit.prevent="saveEntry">
        <!-- Title -->
        <div>
          <label for="title">Titel:</label>
          <input type="datetime-local" id="startTime" v-model="localStartTime" required />
        </div>

        <!-- TODO: Group selection, see useGroupStore.js -->
        <div>
          <h2>Ausgewählte Gruppe: {{ selectedGroup }}</h2>
          <GroupSelector v-model="selectedGroup" />
          <p v-if="selectedGroup.id">
            Selected Group: {{ selectedGroup.name }} (ID: {{ selectedGroup.id }})
          </p>
        </div>


        <!-- Start Time -->
        <div>
          <label for="startTime">Startzeit:</label>
          <input type="datetime-local" id="startTime" v-model="localStartTime" required />
        </div>
        <!-- End Time -->
        <div>
          <label for="endTime">Dauer:</label>
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
      // TODO: adapt timetracking data to match api
      const timeTracking = {
        time_tracking_id: this.entry?.id || Date.now(),
        group_id: 42,
        user_id: 101,
        activity_start: "2025-02-26T09:00:00Z",
        activity_duration: 120, // Dauer in Minuten
        title: "Daily Stand-up",
        description: "Tägliches Team-Meeting zur Abstimmung der Aufgaben"
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

    // combines the start date and time fields to 
    combineDateTime() {
      // Ensure both fields have values
      if (!this.localDate || !this.localStartTime) {
        console.warn('Bitte sowohl Datum als auch Zeit angeben.');
        return;
      }
      
      // If time input is "HH:mm" (5 characters), append seconds as ":00"
      let timeString = this.localStartTime;
      if (this.localStartTime.length === 5) {
        timeString += ':00';
      }
      
      // Combine date and time with a space separator
      this.combinedTimestamp = `${this.localDate} ${timeString}`;
      
      console.log('Kombinierter Timestamp:', this.combinedTimestamp);
      return this.combinedTimestamp;
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
