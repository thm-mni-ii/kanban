<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Add Card</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="cardName" label="Name" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="cardDescription" label="Description" required></v-textarea>
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
      cardName: '',
      cardDescription: '',
      cardDueDate: new Date().toISOString().split('T')[0],
      cardStatus: 'backlog', // Default status set to 'backlog'
    }
  },
  methods: {
    async addCard() {
      const groupId = this.$route.params.groupId;
      const boardId = this.$route.params.boardId; 
      const card = {
        name: this.cardName,
        description: this.cardDescription,
        due_date: this.cardDueDate,
        created_at: new Date(),
        status: 'backlog', // Ensure status is always 'backlog'
      };
      try {
        const response = await fetch(`${apiUrl}/groups/${groupId}/boards/${boardId}/cards/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(card),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.cardName = "";
        this.cardDescription = "";
        this.$emit('cardAdded');
        this.dialog = false;
      } catch (error) {
        console.error('There was an error!', error);
      }
    },
    showDialog() {
      this.dialog = true;
    },
  },
}
</script>