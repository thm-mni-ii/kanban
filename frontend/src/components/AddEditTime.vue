<template>
  <base-card>
    <div class="add-edit-time">
      <h2> {{ isEditing ? "Eintrag bearbeiten" : "Neuen Eintrag hinzufügen" }}</h2>
      <form @submit.prevent="saveEntry">
        <!-- Title -->
        <div>
          <label for="title">Titel:</label>
          <input type="text" id="title" v-model="localTitle" required />
        </div>
        
        <!-- Group -->
        <div>
          <label for="group">Gruppe:</label>
          <GroupSelector id="group" v-model="localGroup"/>
        </div>
          

        <!-- Start Time -->
        <div>
          <label for="startTime">Startzeit:</label>
          <input type="datetime-local" id="startTime" v-model="localStartTime" required />
        </div>
        <!-- End Time -->
        <div>
          <label for="durationTime">Dauer:</label>
          <input type="time" id="durationTime" v-model="localDuration" required />
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
import GroupSelector from './GroupSelector.vue';


export default {
  name: "AddEditTime",
  props: ["entry"], // Optional prop for editing existing entries
  emits: ["add-entry", "cancel", "edit-entry"],
  components: {
    GroupSelector
  },
  computed: {
    isEditing() {
      return !!this.entry; // Prüft, ob ein bestehender Eintrag bearbeitet wird
    }
  },
  data() {
    return {
      localTitle: this.entry?.title || "",
      localGroup: this.entry?.group || -1,
      localStartTime: this.entry?.startTime || this.initStartDate(),
      localDuration: this.entry?.durationTime || "00:00",
      localDescription: this.entry?.description || "",
    };
  },
  methods: {
    saveEntry() {
      const store = useTimeTrackingStore(); // Zugriff auf den Store

      // Neuer Eintrag mit allen Daten
      const entry_id = this.entry?.id || Date.now();
      const updatedEntry = {
        group_id: this.localGroup,
        activity_start: this.localStartTime,
        activity_duration: this.localDuration,
        title: this.localTitle,
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
      this.localTitle = ""
      this.localGroup = -1
      this.localStartTime = "";
      this.localDuration = "";
      this.localDescription = "";
    },

    initStartDate() {
      const now = new Date();

      // Format date and time components with leading zeros
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');

      // Combine into the correct format YYYY-MM-DDTHH:MM
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
  },
};
</script>
