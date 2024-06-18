<template>
  <v-col cols="3">
    <div class="style-box">
      <h2>{{ sectionTitle }}</h2>
      <draggable :list="cards" group="tasks" @start="drag = true" @end="drag = false">
        <template #item="{ element, index }">
          <div :key="index">
            <v-card class="mb-3">
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
    status : String 
  },
  methods: {
    async loadCards(){
      try {
        const groupId = this.$route.params.groupId;
        const boardId = this.$route.params.boardId;
        const response = await fetch(`http://localhost:3000/groups/${groupId}/boards/${boardId}/cards/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.cards = data;
        this.cards = this.cards.filter(card => card.status === this.status);
        console.log('fetched data' + data + "cards: "+ this.cards);
      } catch (error) {
        console.error('There was an error!', error);
      }
    },
    async deleteCard(index){
      console.log(index);
    }
  },
  
  created(){
    this.loadCards();
  }
}
</script>

<style scoped>
.style-box {
  background-color: grey;
  border: 1px solid black;
  padding: 20px 10px;
  border-radius: 5px;
  min-height: 300px;
}
</style>