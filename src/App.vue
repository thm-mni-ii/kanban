<template>
  <v-app>
    <NavDrawer />
    <v-container class="d-flex justify-center my-container" style="background-color:  #80BA27;" w-auto><h1>{{ boardName }}</h1></v-container>
    <v-main>
      <v-container fluid class="flex mt-4">
        <v-row>
          <Label sectionTitle="Backlog" :items="backlogItems" @update:items="backlogItems = $event" />
          <Label sectionTitle="Working on" :items="workingItems" @update:items="workingItems = $event" />
          <Label sectionTitle="Review" :items="reviewItems" @update:items="reviewItems = $event" />
          <Label sectionTitle="Done" :items="doneItems" @update:items="doneItems = $event" />
        </v-row>
      </v-container>
      <AddButton @add-task="addTaskToBacklog" />
      <TestApi />
    </v-main>
  </v-app>
</template>

<script>
import NavDrawer from "@/components/NavDrawer.vue";
import AddButton from "@/components/AddTaskButton.vue"
import TestApi from "./components/TestApi.vue";
import Label from "@/components/Label.vue";
import { ref } from 'vue';


export default {
  components: {
    Label,
    TestApi,
    NavDrawer,
    AddButton,
  },
  setup() {
    const backlogItems = ref([
     
  
    ]);
    const workingItems = ref([
      
    ]);
    const reviewItems = ref([
      
    ]);
    const doneItems = ref([
      
    ]);
    const Task = {
      id: Number,
      title: String
    };
    const boardName = ref("Kanban Board");
    const onMounted = () => {
      document.title = boardName.value;
    }

    const addTaskToBacklog = (taskName) => {
      backlogItems.value.push({ id: backlogItems.value.length + 1, title: taskName });
    }
    const deleteTask = (list, index) => {
      list.splice(index, 1);
    }
    const getAllUsers = () => {
      fetch('http://localhost:3002/')
      .then(response => response.json)
      .then(data => {
        this.user = data;
      })
      .catch(error => {
        console.error(error);
      });
    }     

    return {
      getAllUsers,
      backlogItems,
      workingItems,
      reviewItems,
      doneItems,
      addTaskToBacklog,
      deleteTask,
      boardName
    }
  }
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
