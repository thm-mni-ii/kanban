<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Add Time</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <!-- Date picker -->
               <v-date-input v-model="date" label="Date" required></v-date-input>
               <!--  start and end time-->
              <v-text-field
                  v-model="start"
                  label="Start"
                  required
                  :rules="[validateTime]"
                  placeholder="HH:mm"
              ></v-text-field>
              <v-text-field
                  v-model="end"
                  label="End"
                  required
                  :rules="[validateTime]"
                   placeholder="HH:mm">
              </v-text-field>
              <!-- shows calculated time -->
              <v-text-field
                  v-model="calculatedTime"
                  label="Time"
                  readonly
                  :rules="[v => v > 0 && v <= 10|| 'Time must be greater than 0 and less than 10']"></v-text-field>
            </v-col>
            <!--Optional description-->
            <v-col cols="12">
              <v-textarea
                  v-model="cardDescription"
                  label="Description"
                  placeholder="Optional description"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="addCard">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { apiUrl } from '@/lib/getApi.js';
export default {
  data() {
    return {
      dialog: false,
      date: null,
      //start = end - 90 min
      start:new Date(new Date().getTime() - 90 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      //end = current time
      end: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      calculatedTime: 1.5,
      cardDescription: '',
    }
  },
  watch: {
    start: 'updateCalculatedTime',
    end: 'updateCalculatedTime',
  },
  methods: {
    async addCard() {
      const userId = this.$route.params.userId;
      const boardId = this.$route.params.boardId;

      const card = {
        date: this.date,
        start: this.start,
        end: this.end,
        time: this.calculatedTime,
        description: this.cardDescription,
      };

      try {
        const response = await fetch(`${apiUrl}/users/${userId}/boards/${boardId}/cards/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(card),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.resetForm();
        this.$emit('addedMonth',this.date.getMonth+1);
        this.dialog = false;
      } catch (error) {
        console.error('There was an error!', error);
      }

    },
    validateTime(value) {
      const timeRegex = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;
      return timeRegex.test(value) || 'Please enter a valid time in the format HH:mm';
    },
    parseTime(time) {
      const [hours, minutes] = time.split(':').map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0); // Setzt Stunden und Minuten
      return date;
    },
    updateCalculatedTime() {
      const startTime = this.parseTime(this.start);
      const endTime = this.parseTime(this.end);
      const calculatedTime = (endTime - startTime) / (1000 * 60 * 60); // Berechnung in Stunden

      if (calculatedTime > 0) {
        this.calculatedTime = calculatedTime.toFixed(2); // Zeit auf zwei Dezimalstellen
      } else {
        this.calculatedTime = '0.00'; // Setze auf 0, wenn ungültig
      }
    },
    resetForm() {
      this.start = new Date(new Date().getTime() - 90 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.end = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.calculatedTime = 1.5; // Zeit zurücksetzen
      this.cardDescription = '';
      this.date = null; // Setze das Datum zurück
    },
    showDialog() {
      this.dialog = true;
    },
  },
}
</script>