<template>
  <v-app>
    <NavDrawer />
    <v-container class="d-flex justify-center my-container" style="background-color:  #80BA27;" w-auto>
      <h1>{{ boardName }}</h1>
    </v-container>
    <v-main>
      <v-container fluid class="flex mt-4">
        <v-row>
          <Label sectionTitle="Backlog" status="backlog" :items="backlogItems" @update:items="backlogItems = $event" />
          <Label sectionTitle="Working on" status="working_on" :items="workingItems"
            @update:items="workingItems = $event" />
          <Label sectionTitle="Review" status="review" :items="reviewItems" @update:items="reviewItems = $event" />
          <Label sectionTitle="Done" status="done" :items="doneItems" @update:items="doneItems = $event" />
        </v-row>
      </v-container>
      <v-btn color="primary" dark @click="showDialog">Add Card</v-btn>
      <addCard ref="addCard" @addedCard="reloadCards" />
    </v-main>
  </v-app>
</template>

<script>
import NavDrawer from "@/components/NavDrawer.vue";
import addCard from "@/components/addCard.vue";
import Label from "@/components/Label.vue";
import { ref, onMounted } from 'vue';


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
    showDialog() {
      this.$refs.addCard.showDialog();
    },
  },
}
</script>


<style>
.my-container {
  border: 1px solid black;
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
