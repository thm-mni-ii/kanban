<template>
    <div>
        <TimeOverview
            :entries="timeEntries"
            @edit="editEntry"
            @delete="deleteEntry"
        />
        <AddEditTime
            v-if="showForm"
            :entry="currentEntry"
            @save="saveEntry"
            @cancel="cancelEdit"
        />
        <button @click="createNewEntry">Neuer Eintrag</button>
    </div>
</template>




<script>
import TimeOverview from './components/TimeOverview.vue';
import AddEditTime from './components/AddEditTime.vue';

export default {

    components: {
        TimeOverview,
        AddEditTime
    },

    data(){
        return {
            showForm: false,
            currentEntry: null,
            timeEntries: [
                {id: 1, date: "2024-12-15", startTime:"08:00", endTime: "12:45", description: "Meeting"},
                {id: 2, date: "2024-12-16", startTime: "13:00", endTime: "17:00", description: "Projektarbeit" },
            ],
        };
    },

    methods: {

        editEntry(entry){
            this.currentEntry = entry;          // Edit entry
            this.showForm = true;               
        },

        deleteEntry(entry){
            this.timeEntries = this.timeEntries.filter((e) => e.id !== entry.id);
        },

        saveEntry(newEntry){
            if(this.currentEntry){
                Object.assign(this.currentEntry, newEntry)
            }else {
                this.timeEntries.push({id: Date.now(), ...newEntry}) // ...newEntry copies properties from newEntry in a new Object     
            }                                                        //Date.now(): Returns the current time in milliseconds since 1970
            this.showForm = false;               // close form

        },

        cancel(){
            this.showForm = false;              // close form
        },

        createNewEntry(){
            this.currentEntry = null;           // Edit entry
            this.showForm = true;
        }
        
    },
};




</script>