<template>
  <div class="time-grid-view">
    <div class="grid-header">
      <div
        class="grid-column"
        v-for="(header, index) in headers"
        :key="index"
      >
        <h3>{{ header }}</h3>
      </div>
    </div>
    <div class="grid-body">
      <div
        class="grid-column"
        v-for="(columnEntries, dayIndex) in entriesByColumn"
        :key="dayIndex"
      >
        <div
          v-for="(entry, entryIndex) in columnEntries"
          :key="entryIndex"
        >
          <time-card
            :date="entry.date"
            :startTime="entry.startTime"
            :endTime="entry.endTime"
            :description="entry.description"
          />
        </div>
        <button @click="$emit('open-add-form', dayIndex)">+ Neuer Eintrag</button>
      </div>
    </div>
  </div>
</template>



<script>
import TimeCard from './TimeCard.vue';

export default {
    name:"TimeGridView",
    components: {TimeCard},
    props: {
      entriesByColumn: {
        type: Array,
        required: true
      },
      viewType: {
        type: String,
        required: true,
      },
     
    },
    computed: {
      headers(){
        if(this.viewType == "weekly"){
          return ["Montag","Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
        }
        if(this.viewType == "monthly"){
          return ["Woche 1", "Woche2", "Woche 3", "Woche 4 ", "Woche 5"];
        }
        if(this.viewType == "yearly"){
          return ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
        }
        return [];

      },
    },
    methods: {
      openAddForm(columnIndex){
        this.$emit("open-add-form", columnIndex);
      },
      deleteEntry(columnIndex, entryIndex){
        this.$emit("delete-entry", entryIndex);
      },
      editEntry(updatedEntry, columnIndex, entryIndex){
        this.$emit("edit-entry",{updatedEntry, columnIndex, entryIndex});
      },
    },

};

</script>