<template>
  <v-app>
    <NavDrawer />
    <v-container class="d-flex justify-center my-container" style="background-color:  #80BA27;" w-auto><h1>{{ boardName }}</h1></v-container>
    <v-main>
      <v-container fluid class="flex mt-4">
        <v-row>
          <v-col cols="3">
            <div class="style-box">
              <h2>Backlog</h2>
              <draggable v-model="backlogItems" group="tasks">
                <template #item="{ element, index }">
                  <div :key="index">
                    <v-card class="mb-3">
                      <v-row class="align-items-center">
                        <v-col cols="10">
                          <v-card-text>{{ element.title }}</v-card-text>
                        </v-col>
                        <v-col cols="2">
                          <v-btn icon="mdi-delete-outline" small  density="compact" @click.stop="deleteTask(backlogItems, index)">
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card>
                  </div>
                </template>
              </draggable>
            </div>
          </v-col>
          <v-col cols="3">
            <div class="style-box">
              <h2>Working on</h2>
              <draggable v-model="workingItems" group="tasks" @start="drag=true" @end="drag=false">
                <template #item="{ element, index }">
                  <div :key="index">
                    <v-card class="mb-3">
                      <v-card-text>{{ element.title }}</v-card-text> 
                      <v-col cols="2">
                          <v-btn icon="mdi-delete-outline" small  density="compact" @click.stop="deleteTask(workingItems, index)">
                          </v-btn>
                        </v-col>
                    </v-card>
                  </div>
                </template>
              </draggable>
            </div>
          </v-col>
          <v-col cols="3">
            <div class="style-box">
              <h2>Review</h2>
              <draggable v-model="reviewItems" group="tasks">
                <template #item="{ element, index }">
                  <div :key="index">
                    <v-card class="mb-3">
                      <v-card-text>{{ element.title }}</v-card-text> <v-btn small color="error" density="compact" @click.stop="deleteTask(reviewItems, index)">
                      </v-btn>
                    </v-card>
                  </div>
                </template>
              </draggable>
            </div>
          </v-col>
          <v-col cols="3">
            <div class="style-box">
              <h2>Done</h2>
              <draggable v-model="doneItems" group="tasks">
                <template #item="{ element, index }">
                  <div :key="index">
                    <v-card class="mb-3">
                      <v-card-text>{{ element.title }}</v-card-text> <v-btn small color="error" density="compact" @click.stop="deleteTask(doneItems, index)">
                      </v-btn>
                    </v-card>
                  </div>
                </template>
              </draggable>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <AddButton @add-task="addTaskToBacklog" />
    </v-main>
  </v-app>
</template>

<script>
import NavDrawer from "@/components/NavDrawer.vue";
import AddButton from "@/components/AddTaskButton.vue";
import { ref } from 'vue';
import draggable from 'vuedraggable';

export default {
  components: {
    NavDrawer,
    AddButton,
    draggable
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
    return {
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

.style-box {
  background-color: grey;

  border: 1px solid black;  
  padding: 20px 10px;
  border-radius: 5px;
  min-height: 300px;

}

.title-padding {
  margin-bottom: 10px;
}

.flex-column {
  display: flex;
  flex-direction: column;
}
 
</style>
