<template>
  <v-col cols="3">
    <div class="style-box ml-2 mt-2 mb-2 mr-2">
      <h2>{{ sectionTitle }}</h2>
      <draggable :list="cards" group="tasks" @start="drag = true" @end="drag = false" @change="onCardMoved">
        <template #item="{ element, index }">
          <div :key="index">
            <v-card class="mb-3" style="background: #f7f2f9;">
              <v-card-text>{{ element.name }}</v-card-text>
              <v-col cols="2">
                <v-btn icon="mdi-delete-outline" small density="compact" @click.stop="deleteCard(index)">
                </v-btn>
              </v-col>
            </v-card>
          </div>
        </template>
      </draggable>
    </div>
  </v-col>
</template>

<script>
import { apiUrl } from '@/lib/getApi.js';
import { ref } from 'vue';
import draggable from 'vuedraggable';
export default {
  components: {
    draggable
  },
  data() {
    return {
      cards: [],
    }
  },
  props: {
    sectionTitle: String,
    items: Array,
    status: String
  },
  methods: {
    async loadCards() {
      try {
        const groupId = this.$route.params.groupId;
        const boardId = this.$route.params.boardId;
        const response = await fetch(`${apiUrl}/groups/${groupId}/boards/${boardId}/cards/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.cards = data;
        this.cards = this.cards.filter(card => card.status === this.status);
      } catch (error) {
        console.error('There was an error!', error);
      }
    },
    async deleteCard(index) {
      const card = this.cards[index];
      const id = card.kantask_id;

      const groupId = this.$route.params.groupId;
      const boardId = this.$route.params.boardId;

      const response = await fetch(`${apiUrl}/groups/${groupId}/boards/${boardId}/cards${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok' + response.status);
      } else {
        this.cards.splice(index, 1);
      }
    }, onCardMoved(event) {
      if (event.moved) {
        this.$emit('cardMoved', {
          card: event.moved.element,
          oldStatus: this.status,
          newStatus: null // New status will be determined in App.vue
        });
      }
    },
  },

  created() {
   this.loadCards();
  }
}
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