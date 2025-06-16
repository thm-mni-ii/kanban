<template>
    <base-card>
        <!-- Header Slot -->
        
        <div class="time-card-header">
            <h3>{{ title }}</h3>
        </div>

        <div class="time-card-body">
            <div v-if="isFinishedOnTheSameDate">
                {{ formattedStartDate }}
                <div v-if="hasDuration">{{ formattedStartTime }} - {{ formattedEndTime }}</div>
                <div v-else>{{ formattedStartTime }}</div>
            </div>
            <div v-if="!isFinishedOnTheSameDate" class="time-row">
                <div class="startColumn">
                    {{ formattedStartDate }}
                    <br>{{ formattedStartTime }}</br>
                </div>
                <div class="endColumn">
                    {{ formattedEndDate }}
                    <br>{{ formattedEndTime }}</br>
                </div>
            </div>
        </div>
        

        <!-- Default Slot (Main Content) -->
        <div class="time-card-body">
            <template v-if="!isEditing">
                <p v-if="description">{{ description }}</p>
                <p><strong>{{ activity_duration.slice(0,5) }}</strong></p>
            </template>

            <template v-else>
                <form @submit.prevent="saveChanges">
                    <div>
                        <label>
                            <input type="datetime-local" v-model="editDate" />
                        </label>
                    </div>
                    <div>
                        <label>Dauer:
                            <input type="time" v-model="editEndTime" />
                        </label>
                    </div>
                    <div>
                        <label>Beschreibung:
                            <textarea type="text" v-model="editDescription"></textarea>
                        </label>
                    </div>
                </form>
            </template>
        </div>

        <!-- Footer Slot -->
        <div class="time-card-footer">
            <template v-if="!isEditing">
                <button @click="toggleEdit" title="Bearbeiten" class="time-card-button"><span>✏️</span></button>
                <button @click="deleteEntry" title="Löschen" class="time-card-button"><span>🗑️</span></button>
            </template>
            <template v-else>
                <button @click="saveChanges" title="Speichern" class="time-card-button"><span>💾</span></button>
                <button @click="cancelEdit" title="Abbrechen" class="time-card-button"><span>❌</span></button>
            </template>
        </div>
        
    </base-card>
</template>

<script>
import { useTimeTrackingStore } from '@/store/timeTracking';
export default {
    name: "TimeCard",
    props: {
        title: {type: String, required: true},
        group_id: {type: Number, required: true},
        activity_start: { type: String, required: true },
        activity_duration: { type: String, required: true },
        description: { type: String, default: "" },
        time_tracking_id: {type: Number, default: -1}
    },
    data() {
        return {
            isEditing: false,
            editDate: this.activity_start,
            editStartTime: this.activity_start,
            editEndTime: this.activity_duration,
            editDescription: this.description,
        };
    },
    computed: {
        editStart() {
            return this.getFormattedDate(this.activity_start);
        },
        formattedStartDate() {
            return new Date(this.activity_start).toLocaleString("de-DE", {
                weekday: "short",
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        },
        formattedEndDate() {
            return new Date(this.endDateTime).toLocaleString("de-DE", {
                weekday: "short",
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        },
        formattedStartTime() {
            return this.getFormattedTime(new Date(this.activity_start));
        },
        formattedEndTime() {
            return this.getFormattedTime(new Date(this.endDateTime));
        },
        endDateTime() {
            // get start time as 
            let localEndDate = new Date(this.activity_start);
            const startTime = localEndDate.getTime()
            localEndDate.setTime(startTime+this.duration.asMillis);
            
            return localEndDate;
        },
        duration() {
            const [hours, minutes] = this.activity_duration.split(":").map(Number);
            const millis = (hours*60+minutes)*60*1000;

            return {hh: hours, mm: minutes, asMillis: millis};
        },
        isFinishedOnTheSameDate() {
            const startDate = new Date(this.activity_start);
            const endDate = this.endDateTime;
            return (
                startDate.getFullYear() === endDate.getFullYear() &&
                startDate.getMonth() === endDate.getMonth() &&
                startDate.getDate() === endDate.getDate()
            )
        },
        hasDuration() {
            return this.duration.asMillis > 60*1000;
        }
    },
    methods: {
        toggleEdit() {
            this.editDate = this.getFormattedDate(this.activity_start);
            this.editEndTime = this.activity_duration;
            this.editDescription = this.description;
            this.isEditing = true;
        },
        saveChanges() {
            const store = useTimeTrackingStore();
            this.$emit("edit", {
                date: this.editDate,
                startTime: this.editStartTime,
                endTime: this.editEndTime,
                description: this.editDescription,
            });
            const activity = {
              time_tracking_id: this.time_tracking_id,
              group_id: this.group_id,
              activity_start: new Date(this.editDate).toUTCString(),
              activity_duration: this.editEndTime.slice(0,5), // in minutes
              title: this.title,
              description: this.editDescription
            }
            console.log(activity);
            store.updateActivityLocally(this.time_tracking_id, activity);
            store.editEntry(activity);

            // leave editing mode
            this.isEditing = false;
        },
        deleteEntry() {
            this.$emit("delete");
            const store = useTimeTrackingStore();
            store.removeEntry(this.time_tracking_id);
        },
        cancelEdit() {
            this.editDate = this.getFormattedDate(this.activity_start);
            this.editEndTime = this.activity_duration;
            this.editDescription = this.description;
            this.isEditing = false;
        },
        getFormattedTime(date) {
            return date.toLocaleTimeString("de-DE").slice(0,5);
        },
        getFormattedDate(date) {
            const now = new Date(date);
            const pad = (n) => String(n).padStart(2, '0');
            const formatted = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
            return formatted;
        }

    },
};
</script>

<style scoped>
.time-row {
    display: flex;
    flex-direction: row;
    gap:  0px 2em;
}

/* Input and Textarea Styling */
input[type="datetime-local"],
input[type="time"],
textarea {
  display: block;
  width: 100%;
  padding: 0.5em;
  margin-top: 0.25em;
  margin-bottom: 1em;
  font-size: 1rem;
  font-family: inherit;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input:focus,
textarea:focus {
  border-color: #007BFF;
  outline: none;
  background-color: #f0f8ff;
}

/* Label for spacing */
label {
  font-weight: 500;
  display: block;
  margin-bottom: 0.25em;
}

.time-card-footer {
    gap: 0.5em;
    display: flex;
}

.time-card-button {
  position: relative;
  overflow: hidden;
  width: 36px;
  height: 36px;
  font-size: 1.1rem;
  border: none;
  border-radius: 50%;
  background-color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.23);
  transition: background-color 0.2s ease;
}

/* 👇 New Ripple for hover */
.time-card-button::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  top: 50%;
  left: 50%;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.4s ease, height 0.4s ease;
  z-index: 0;
}

.time-card-button:hover::before {
  width: 200%;
  height: 200%;
}

/* 👇 Raise the emoji above the ripple */
.time-card-button span {
  position: relative;
  z-index: 1;
}

/* Optional: background darkening */
.time-card-button:hover {
  background-color: #f7f7f7;
}


</style>