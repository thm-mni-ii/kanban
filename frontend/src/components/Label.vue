<template>
  <v-col cols="3">
    <div class="style-box ml-2 mt-2 mb-2 mr-2">
      <h2 class="text-center mb-3">{{ sectionTitle }}</h2>
      <draggable :list="cards" group="tasks" @start="drag = true" @end="drag = false" @change="onCardMoved">
        <template #item="{ element, index }">
          <div :key="index">
            <v-card class="mb-3" style="background: #f7f2f9;" @click="selectCard(element)">
              <v-card-text>
                <v-row align="center"> <!-- Align items vertically in the center -->
                  <v-col cols="10">
                    <h2>{{ element.name }}</h2> <!-- Name of the card -->
                  </v-col>
                  <v-col cols="2" class="d-flex justify-end"> <!-- Flexbox for right alignment -->
                    <span><h2>--:--:--</h2></span> <!-- Right aligned text -->
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="d-flex justify-end">
                    <v-btn icon="mdi-pencil" small density="compact">
                    </v-btn>
                    <v-btn icon small density="compact" @click.stop="deleteCard(index)" class="ml-2">
                      <v-icon color="red">mdi-delete-outline</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </div>
        </template>
      </draggable>
    </div>
  </v-col>
</template>



<script>
import { ref, onMounted, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { apiUrl } from '@/lib/getApi.js';
import draggable from 'vuedraggable';

export default defineComponent({
  components: {
    draggable,
  },
  props: {
    sectionTitle: String,
    items: Array,
    status: String,
  },
  setup(props, { emit }) {
    const route = useRoute();
    const cards = ref([]);

    async function loadCards() {
      try {
        const groupId = route.params.groupId;
        const boardId = route.params.boardId;
        const response = await fetch(
            `${apiUrl}/groups/${groupId}/boards/${boardId}/cards/`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        cards.value = data;
        cards.value = cards.value.filter(
            (card) => card.status === props.status
        );
      } catch (error) {
        console.error('There was an error!', error);
      }
    }

    async function deleteCard(index) {
      const card = cards.value[index];
      const id = card.kantask_id;

      const groupId = route.params.groupId;
      const boardId = route.params.boardId;

      const response = await fetch(
          `${apiUrl}/groups/${groupId}/boards/${boardId}/cards${id}`,
          {
            method: 'DELETE',
          }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok' + response.status);
      } else {
        cards.value.splice(index, 1);
      }
    }

    async function updateCardStatus(cardId, newStatus) {
      try {
        const groupId = route.params.groupId;
        const boardId = route.params.boardId;
        const url = `${apiUrl}/groups/${groupId}/boards/${boardId}/cards${cardId}/status`;

        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('There was an error updating the card status!', error);
      }
    }

    function onCardMoved(event) {
      if (event.added) {
        const movedCard = event.added.element;
        const cardId = movedCard ? movedCard.kantask_id : null;
        const newStatus = props.status;

        if (cardId && newStatus) {
          updateCardStatus(cardId, newStatus);
        }

        emit('cardMoved', {
          card: movedCard,
          cardId: cardId,
          oldStatus: event.removed ? props.status : null,
          newStatus: newStatus,
        });
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
    };
  },
});
</script>

<style scoped>
.style-box {
  background-color: white;
  border: 1px solid black;
  padding: 20px 10px;
  border-radius: 5px;
  min-height: 300px;
}
</style>