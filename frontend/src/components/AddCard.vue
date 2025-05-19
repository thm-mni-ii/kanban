<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{isEdit ? "Edit" : "Add"}} Card</span>
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

<script lang="ts">
import { ref } from 'vue';
import {BoardService} from "@/lib/board.service";
import {Card} from "@/lib/types";

export interface AddCardProps {
  groupId: number;
  boardId: number;
  card?: Card;
}

export default {
  props: ["card", "groupId", "boardId"],
  setup(props: AddCardProps, { emit }) {
    const dialog = ref(false);
    const cardName = ref(props.card?.name ?? '');
    const cardDescription = ref(props.card?.description ?? '');
    const cardDueDate = ref(props.card?.dueDate ?? new Date().toISOString().split('T')[0]);
    const cardStatus = ref(props.card?.status ?? 'backlog');
    const isEdit = Boolean(props.card?.kantask_id)

    const addCard = async () => {
      const card = {
        kantask_id: props.card?.kantask_id,
        name: cardName.value,
        description: cardDescription.value,
        due_date: cardDueDate.value,
        created_at: cardDueDate.value,
        status: cardStatus.value,
      };
      try {
        await (isEdit ? BoardService.updateCard : BoardService.createCard)(props.groupId, props.boardId, card);
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
      isEdit,
    };
  },
};
</script>
