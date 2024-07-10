<template>
  <v-app>
    <NavDrawer />
    <v-container class="d-flex justify-center my-container" style="background-color:  #80BA27;" w-auto>
      <h1>{{ boardName }}</h1>
    </v-container>
    <v-main>
      <v-container fluid class="flex mt-4">
        <v-btn color="primary" style="margin-left: auto;" dark @click="showDialog">
          <v-icon>mdi-plus</v-icon>
          Add Card
        </v-btn>
        <addCard ref="addCard" @addedBacklog="() => reloadCardsByStatus('backlog')" 
                                @addedWorking_on="() => reloadCardsByStatus('working_on')" 
                                @addedReview="() => reloadCardsByStatus('review')" 
                                @addedDone="() => reloadCardsByStatus('done')" />
        <v-card class="mt-4" style="background: #f7f2f9;">
          <v-row>
          <Label ref="backlogLabel" sectionTitle="Backlog" status="backlog"  :items="backlogItems" @update:items="backlogItems = $event" @cardMoved="handleCardMoved"/>
          <Label ref="workingLabel" sectionTitle="Working on" status="working_on" :items="workingItems"
            @update:items="workingItems = $event" @cardMoved="handleCardMoved"  />
          <Label ref="reviewLabel" sectionTitle="Review" status="review" :items="reviewItems" @update:items="reviewItems = $event" @cardMoved="handleCardMoved"  />
          <Label ref="doneLabel" sectionTitle="Done" status="done" :items="doneItems" @update:items="doneItems = $event" @cardMoved="handleCardMoved"  />
        </v-row>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavDrawer from "@/components/NavDrawer.vue";
import addCard from "@/components/addCard.vue";
import Label from "@/components/Label.vue";
import { ref, onMounted } from 'vue';
import { apiUrl } from '@/lib/getApi.js';


export default {
  components: {
    Label,
    NavDrawer,
    addCard,
  },
  setup() {
    const backlogItems = ref([]);
    const workingItems = ref([]);
    const reviewItems = ref([]);
    const doneItems = ref([]);

    const boardName = ref("Kanban Board");

    

    return {
      backlogItems,
      workingItems,
      reviewItems,
      doneItems,
      boardName,
    }
  },
  methods: {
  //   async fetchCards() {
  //   try {
  //     const groupId = this.$route.params.groupId;
  //     const boardId = this.$route.params.boardId;
  //     const response = await fetch(`${apiUrl}/groups/${groupId}/boards/${boardId}/cards/`);
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const cards = await response.json();
  //     // Assign new arrays to ensure reactivity
  //     this.backlogItems.value = cards.filter(card => card.status === 'backlog');
  //     this.workingItems.value = cards.filter(card => card.status === 'working_on');
  //     this.reviewItems.value = cards.filter(card => card.status === 'review');
  //     this.doneItems.value = cards.filter(card => card.status === 'done');
  //   } catch (error) {
  //     console.error('Failed to fetch cards:', error);
  //   }
  // },
    showDialog() {
      this.$refs.addCard.showDialog();
    },
    reloadCardsByStatus(status) {
      switch (status) {
        case 'backlog':
          this.$refs.backlogLabel.loadCards();
          break;
        case 'working_on':
        this.$refs.workingLabel.loadCards();
          break;
        case 'review':
        this.$refs.reviewLabel.loadCards();
          break;
        case 'done':
        this.$refs.doneLabel.loadCards();
          break;
        default:
          console.error('Invalid status');
      }
    },
  },
  onMounted() {
    //this.fetchCards();
  }
}
</script>


<style>
.my-container {
  border: 1px solid rgba(92, 92, 92, 0.881);
  border-radius: 5px;
  width: auto;
}

.title-padding {
  margin-bottom: 10px;
}

.flex-column {
  display: flex;
  flex-direction: column;
}
</style>
