
<template>
    <base-card>
    <div class="time-card">
        <!-------------------------------------------Header-Area------------------------------------------------------------->
        <div class="time-card-header">
            <h3> {{ formattedDate }}</h3>
            <p>{{ formattedTime }}</p>
        </div>
        <!-------------------------------------------Body-Area---------------------------------------------------------------->
        <div class="time-card-body">
            <template v-if="!isEditing">
                <p>{{ description || "Optionale Beschreibung" }}</p>
                <p><strong>{{ hours }} Stunden</strong></p>
            </template>

            <template v-else>
                <form @submit.prevent="saveChanges">
                    <label>
                        Datum:
                        <input type="date" v-model="editDate"/>
                    </label>
                    <label>
                        Startzeit:
                        <input type="time" v-model="editStartTime"/>
                    </label>
                    <label>
                        Endzeit:
                        <input type="time" v-model="editEndTime"/>
                    </label>
                    <label>
                        Beschreibung:
                        <imput type="text" v-model="editDescription"/>
                    </label>
                    <label>
                        Stunden:
                        <input type="number" v-model="editHours" min="0" step="0.5"/>
                    </label>
                </form>
            </template>
        </div>
        <!--------------------------------------------Actions-Area-------------------------------------------------------->
        <div class="time-card-actions">
            <template v-if="!isEditing">
                <button @click="toggleEdit" title="Bearbeiten">✏️</button>
                <button @click="deleteChanges" title="Löschen">🗑️</button>
            </template>
            <template v-else>
                <button type="submit" @click="saveChanges" title="Speichern">💾</button>
                <button @click="cancelEdit" title="Abbrechen">❌</button>
            </template>
        </div>
    </div>
    
    </base-card>
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

    data() {
        return {
            isEditing: false,
            editDate: this.date,
            editStartTime: this.startTime,
            editEndTime: this.endTime,
            editDescription: this.description,
            editHours: this.hours
        };
    },

    computed: {
        formattedDate(){
            return new Date(this.date).toLocaleString("de-DE",{
                weekday: "short",
                year:    "numeric",
                month:   "long",
                day:     "numeric",
            });   
        },
        formattedTime(){
            if(!this.startTime && this.endTime){
                return"-";
            }
            return `${this.startTime} - ${this.endTime}`;
        },

    },
    methods: {

        togglEdit(){
            this.isEditing = true;
        },

        saveChanges(){
            this.$emit('edit', {
                date: this.editDate,
                startTime: this.editStartTime,
                endTime: this.editEndTime,
                description:this.description,
                hours: this.hours,
            });
            this.isEditing = false;
        }, 

        deleteChanges(){
            this.$emit('delete');

        },

        cancelEdit(){
            this.editDate = this.date || "";
            editStartTime = this.startTime || "";
            editEndTime = this.endTime || "";
            editDescription = this.description || "";
            editHours = this.hours || 0;
            this.isEditing = false;

        },
    },
};
</script>