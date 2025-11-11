<template>
  <v-col cols="3">
    <div class="style-box ml-2 mt-2 mb-2 mr-2">
      <h2 class="text-center mb-3">{{ sectionTitle }}</h2>
      <draggable :key="i" :list="cards" group="tasks" @start="drag = true" @end="drag = false" @change="onCardMoved" class="drag-zone" itemKey="kantask_id">
        <template #item="{ element, index }">
          <Card :group-id="groupId" :board-id="boardId" :content="element" @seleced="selectCard" @cardChanged="$emit('labelChanged'); loadCards()"></Card>
        </template>
      </draggable>
    </div>
  </v-col>
</template>



<script lang="ts">
import { ref, onMounted } from 'vue';
import { apiUrl } from '@/lib/getApi.js';
import draggable from 'vuedraggable';
import Card from "@/components/Card.vue";
import {BoardService} from "@/lib/board.service.ts";

export default {
  components: {
    Card,
    draggable,
  },
  props: {
    sectionTitle: String,
    items: Array,
    status: String,
    groupId: String,
    boardId: String,
  },
  setup(props, { emit }) {
    const cards = ref([]);
    const i = ref(0);

    async function loadCards() {
      try {
        const data = await BoardService.getCards(props.groupId, props.boardId);
        cards.value = data;
        cards.value = cards.value.filter(
            (card) => card.status === props.status
        );
        // Sort by position
        cards.value.sort((a, b) => (a.position || 0) - (b.position || 0));
        i.value++
      } catch (error) {
        console.error('There was an error!', error);
      }
    }

    async function deleteCard(index) {
      const card = cards.value[index];

      try {
        await BoardService.deleteCard(props.groupId, props.boardId, card)
        cards.value.splice(index, 1);
      } catch (e) {
        console.error('There was an error deleting the card!', e);
      }
    }

    async function updateCardStatus(cardId, newStatus) {
      try {
        await BoardService.updateCardStatus(props.groupId, props.boardId, cardId, newStatus)
      } catch (error) {
        console.error('There was an error updating the card status!', error);
      }
    }

    async function onCardMoved(event) {
      if (event.added) {
        const movedCard = event.added.element;
        const cardId = movedCard ? movedCard.kantask_id : null;
        const newStatus = props.status as any;
        const newIndex = event.added.newIndex;

        if (cardId && newStatus) {
          // Update the card's position and status
          await BoardService.updateCardPosition(props.groupId, props.boardId, cardId, newIndex, newStatus);
          
          // Update positions of all other cards in this column
          for (let i = 0; i < cards.value.length; i++) {
            const card = cards.value[i];
            if (card.kantask_id !== cardId && card.position !== i) {
              await BoardService.updateCardPosition(props.groupId, props.boardId, card.kantask_id, i, newStatus);
            }
          }
        }

        emit('cardMoved', {
          card: movedCard,
          cardId: cardId,
          oldStatus: event.removed ? props.status : null,
          newStatus: newStatus,
        });
      } else if (event.moved) {
        // Card was reordered within the same column
        const movedCard = event.moved.element;
        const cardId = movedCard ? movedCard.kantask_id : null;
        const newIndex = event.moved.newIndex;

        if (cardId) {
          // Update positions of all cards in this column
          for (let i = 0; i < cards.value.length; i++) {
            const card = cards.value[i];
            if (card.position !== i) {
              await BoardService.updateCardPosition(props.groupId, props.boardId, card.kantask_id, i, props.status as any);
            }
          }
        }
      }
    }

    function selectCard(card) {
      emit('cardSelected', card);
    }

    onMounted(() => {
      loadCards();
    });

    return {
      cards,
      loadCards,
      deleteCard,
      updateCardStatus,
      onCardMoved,
      selectCard,
      groupId: props.groupId,
      boardId: props.boardId,
      i,
    };
  },
};
</script>

<style scoped>
.style-box {
  background-color: white;
  border: 1px solid black;
  padding: 20px 10px;
  border-radius: 5px;
  min-height: 300px;
}
.drag-zone {
  min-height: 200px;
  padding-bottom: 20px;
}
</style>
