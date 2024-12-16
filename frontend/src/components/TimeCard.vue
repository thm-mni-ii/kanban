
<template>
    <div class="time-card">
        <div class="time-card-header">
            <h3>{{ formattedDate }}</h3>
            <p>{{ formattedTime }}</p>
        </div>
        <div class="time-card-body">
            <p>{{ description || "<Optionale Beschreibung>" }}</p>
            <p><strong>{{ hours }} Stunden </strong></p>    
        </div>
        <div class="time-card-actions">
            <button @click="editEntry" title="Bearbeiten">
                ✏️
            </button>
            <button @click="deleteEntry" title="Löschen">
                🗑️
            </button>
        </div>
    </div>
</template>


<script>
export default {
    name: "TimeCard",
    props: {
        date: {
            type: String,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        hours: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
    },

    computed: {
        formattedDate(){
            return new Date(this.date).toLocaleString("de - DE",{
                weekday: "short",
                year:    "numeric",
                month:   "long",
                day:     "numeric",
            });   
        },
        formattedTime(){
            return `${this.startTime} - ${this.endTime}`;
        },

    },
    methods: {
        editEntry(){
            this.$emit("edit"); 
        },
        deleteEntry(){
            this.$emit("delete");
        }, 
    },
};
</script>