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
        <addCard ref="addCardRef" @cardAdded="reloadCards"/>
        <v-card class="mt-4" style="background: #f7f2f9;">
          <v-row>
            <Label ref="backlogLabelRef" sectionTitle="Backlog" status="backlog" :items="backlogItems" @update:items="backlogItems = $event"  @cardSelected="selectCard" @cardStatusUpdated="updateCardStatus"/>
            <Label ref="workingLabelRef" sectionTitle="Working on" status="working_on" :items="workingItems" @update:items="workingItems = $event"  @cardSelected="selectCard"@cardStatusUpdated="updateCardStatus"/>
            <Label ref="reviewLabelRef" sectionTitle="Review" status="review" :items="reviewItems" @update:items="reviewItems = $event"  @cardSelected="selectCard"@cardStatusUpdated="updateCardStatus"/>
            <Label ref="doneLabelRef" sectionTitle="Done" status="done" :items="doneItems" @update:items="doneItems = $event"  @cardSelected="selectCard"@cardStatusUpdated="updateCardStatus"/>
          </v-row>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import NavDrawer from "@/components/NavDrawer.vue";
import addCard from "@/components/addCard.vue";
import Label from "@/components/Label.vue";
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
    const selectedCard = ref(null);
    const addCardRef = ref(null);
    const backlogLabelRef = ref(null);
    const route = useRoute();

    function showDialog() {
      addCardRef.value.showDialog();
    }

    function reloadCards() {
      backlogLabelRef.value.loadCards();
    }

    async function updateCardStatus(card) {
      const groupId = route.params.groupId;
      const boardId = route.params.boardId;

      const response = await fetch(`${apiUrl}/groups/${groupId}/boards/${boardId}/cards${card.kantask_id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: card.status }),
      });

      if (!response.ok) {
        console.error('Failed to update card status');
      } else {
        console.log('Card status updated successfully');
      }
    }

    function selectCard(card) {
      selectedCard.value = card;
    }

    return {
      backlogItems,
      workingItems,
      reviewItems,
      doneItems,
      boardName,
      selectedCard,
      showDialog,
      reloadCards,
      updateCardStatus,
      selectCard,
      addCardRef,
      backlogLabelRef,
    };
  },
};
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