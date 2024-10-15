<template>
  <v-card class="mb-3" style="background: #f7f2f9;" @click="selectCard(element)">
    <v-card-text>
      <v-row align="center"> <!-- Align items vertically in the center -->
        <v-col cols="10">
          <h2>{{ element?.name }}</h2> <!-- Name of the card -->
        </v-col>
        <v-col cols="2" class="d-flex justify-end"> <!-- Flexbox for right alignment -->
          <span><h2>--:--:--</h2></span> <!-- Right aligned text -->
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <AddCard :group-id="groupId" :board-id="boardId" :card="element" ref="addCardRef" @cardAdded="$emit('cardChanged')" />
          <v-btn icon="mdi-pencil" small density="compact" @click="editCard">
          </v-btn>
          <v-btn icon small density="compact" @click="deleteCard" class="ml-2">
            <v-icon color="red">mdi-delete-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import AddCard from "@/components/AddCard.vue";
import {Card} from "@/lib/types";
import {ref} from "vue";
import {BoardService} from "@/lib/board.service";

export type CardProps = {
  content: Card,
  groupId: string,
  boardId: string,
}

export default {
  props: ['content', "groupId", "boardId"],
  components: {AddCard},
  setup(props: CardProps, {emit}) {
    const addCardRef = ref(null);
    function selectCard(card) {
      emit('selected', card);
    }
    function editCard() {
      addCardRef.value.showDialog();
    }
    async function deleteCard() {
      await BoardService.deleteCard(props.groupId, props.boardId, props.content);
      emit("cardChanged");
    }
    return {element: props.content, selectCard, editCard, deleteCard, addCardRef, groupId: props.groupId, boardId: props.boardId}
  }
};
</script>
