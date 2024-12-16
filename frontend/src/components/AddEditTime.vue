<template>
    <div class="add-edit-time">
        <h2> {{ isEditing ? "Eintrag bearbeiten" : "Neuen Eintrag hinzufügen" }}</h2>
        <form @submit.prevent="saveEntry">
        
         <!------------------------------ Date--------------------------------------->
         <div>
            <label for ="date">Datum:</label>
            <input
                type="date"
                id="date"
                v-model="localDate"
                required
            />
         </div>
         <!----------------------------StartTime------------------------------------->
         <div>
            <label for="startTime">Startzeit:</label>
            <input
                type="time"
                id="startTime"
                v-model="startTime"
                required
            />
         </div>
         <!---------------------------EndTime---------------------------------------->
         <div>
            <label for="endTime">Endzeit:</label>
            <input
                type="time"
                id="endTime"
                v-model="endTime"
                required
            />
         </div>
         <!--------------------------Description------------------------------------->
         <div>
            <label for="description">Beschreibung (optional):</label>
            <textarea
                id="description"
                v-model="localDescription"
                placeholder="Beschreibung hinzufügen"
            ></textarea>
         </div>
         <!-----------------------------Buttons-------------------------------------->
         <div class="buttons">
            <button type="submit">Speichern</button>
            <button type="button" @click="cancelEdit">Abbrechen</button>
         </div>

        </form>
    </div>
</template>



<script>

export default {
    name: "AddEditTime",
    props: {
        entry: {
            type: Object,
            default: null
        },
    },
    computed: {
        isEditing(){
            return !!this.entry;
        }
    },
    data(){
        return {
            localDate: this.entry?.date || "",              // initialize date
            localStartTime: this.entry?.startTime || "",    // initialize start-time
            localEndTime: this.entry?.endTime || "",        // initialize end-time
            localDescription: this.entry?.description || "",// initalize description
        }
    },
    methods: {
        saveEntry(){
            const newEntry= {
                date: this.localDate,
                startTime: this.localStartTime,
                endTime: this.localEndTime,
                description: this.localDescription
            };
            this.$emit("save",newEntry);                    // Trigger 'save' event with the new entry
        },

        cancelEdit(){
            this.$emit("cancel");                           // Trigger 'cancel' event

        }
    }
    
};

</script>