<template>
    <base-card>
        <!-- Header Slot -->
        
            <div class="time-card-header">
                <h3>{{ formattedDate }}</h3>
                <p>{{ formattedTime }}</p>
            </div>
        

        <!-- Default Slot (Main Content) -->
        <div class="time-card-body">
            <template v-if="!isEditing">
                <p>{{ description || "Optionale Beschreibung" }}</p>
                <p><strong>{{ hours }} Stunden</strong></p>
            </template>

            <template v-else>
                <form @submit.prevent="saveChanges">
                    <label>Datum:
                        <input type="date" v-model="editDate" />
                    </label>
                    <label>Startzeit:
                        <input type="time" v-model="editStartTime" />
                    </label>
                    <label>Endzeit:
                        <input type="time" v-model="editEndTime" />
                    </label>
                    <label>Beschreibung:
                        <input type="text" v-model="editDescription" />
                    </label>
                </form>
            </template>
        </div>

        <!-- Footer Slot -->
        
            <template v-if="!isEditing">
                <button @click="toggleEdit" title="Bearbeiten">✏️</button>
                <button @click="deleteChanges" title="Löschen">🗑️</button>
            </template>
            <template v-else>
                <button @click="saveChanges" title="Speichern">💾</button>
                <button @click="cancelEdit" title="Abbrechen">❌</button>
            </template>
        
    </base-card>
</template>

<script>
export default {
    name: "TimeCard",
    props: {
        date: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        hours: { type: Number, required: true },
        description: { type: String, default: "" },
    },
    data() {
        return {
            isEditing: false,
            editDate: this.date,
            editStartTime: this.startTime,
            editEndTime: this.endTime,
            editDescription: this.description,
        };
    },
    computed: {
        formattedDate() {
            return new Date(this.date).toLocaleString("de-DE", {
                weekday: "short",
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        },
        formattedTime() {
            return this.startTime && this.endTime ? `${this.startTime} - ${this.endTime}` : "-";
        },
        hours() {
            // if times are missing, return 0
            if(!this.startTime || !this.endTime) return 0;

            // split time strings (e.g.,"09:00") into hours and minutes
            const [startHour, startMinute] = this.startTime.split(":").map(Number);
            const [endHour, endMinute] = this.endTime.split(":").map(Number);

            // convert time to total minutes (easier for subtraction)
            const startTotalMinutes = startHour * 60 + startMinute;
            const endTotalMinutes = endHour * 60 + endMinute;

            // calculate the difference in minutes and convert back to hours
            const totalMinutesWorked = endTotalMinutes - startTotalMinutes;
            return (totalMinutesWorked / 60).toFixed(2);   // 2 decimal places
        }
    },
    methods: {
        toggleEdit() {
            this.isEditing = true;
        },
        saveChanges() {
            this.$emit("edit", {
                date: this.editDate,
                startTime: this.editStartTime,
                endTime: this.editEndTime,
                description: this.editDescription,
            });
            this.isEditing = false;
        },
        deleteChanges() {
            this.$emit("delete");
        },
        cancelEdit() {
            this.editDate = this.date;
            this.editStartTime = this.startTime;
            this.editEndTime = this.endTime;
            this.editDescription = this.description;
            this.isEditing = false;
        },
    },
};
</script>