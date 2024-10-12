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
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup(props, { emit }) {
    const dialog = ref(false);
    const cardName = ref('');
    const cardDescription = ref('');
    const cardDueDate = ref(new Date().toISOString().split('T')[0]);
    const cardStatus = ref('backlog'); // Default status set to 'backlog'

    const route = useRoute();

    const addCard = async () => {
      const groupId = route.params.groupId;
      const boardId = route.params.boardId;
      const card = {
        name: cardName.value,
        description: cardDescription.value,
        due_date: cardDueDate.value,
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
        cardName.value = "";
        cardDescription.value = "";
        emit('cardAdded');
        dialog.value = false;
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    const showDialog = () => {
      dialog.value = true;
    };

    return {
      dialog,
      cardName,
      cardDescription,
      cardDueDate,
      cardStatus,
      addCard,
      showDialog,
    };
  },
};
</script>