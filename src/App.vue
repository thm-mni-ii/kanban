<template>
  <v-app>
    <!-- Navigation Drawer -->
    <NavDrawer @open-dialog="dialog = true" />

    <!-- App Bar -->
    <v-app-bar app color="purple" dark>
      <v-toolbar-title>Kanban Board</v-toolbar-title>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <h1 class="headline mb-4">KANBAN BOARD</h1>
        </v-row>
        <v-row>
          <v-col v-for="(lane, index) in lanes" :key="index" cols="3">
            <v-card class="mx-auto lane" outlined>
              <v-card-title :class="lane.color">{{ lane.title }}</v-card-title>
              <v-card-text>
                <draggable v-model="lane.items" group="tasks">
                  <template #item="{ element, index }">
                    <v-card class="mb-2" :key="index">
                      <v-card-text>{{ element.title }}</v-card-text>
                      <v-card-actions>
                        <v-btn icon @click.stop="deleteTask(lane.items, index)">
                          <v-icon color="error">mdi-delete</v-icon>
                        </v-btn>
                        <v-btn icon @click.stop="editTask(lane.items, index)">
                          <v-icon color="primary">mdi-pencil</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                    
                  </template>
                </draggable>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Floating Action Button -->
    <AddTaskButton @add-task="addTask" />

    <!-- Dialog for Adding New Group -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Neue Gruppe</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Gruppenname" v-model="newGroup.name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Mitglieder (Komma-getrennt)" v-model="newGroup.members"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="addGroup">Hinzufügen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog for Editing Task -->
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Aufgabe bearbeiten</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Aufgabentitel" v-model="currentTask.title"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="saveTask">Speichern</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import NavDrawer from '@/components/NavDrawer.vue';
import AddTaskButton from '@/components/AddTaskButton.vue';
import { ref, onMounted } from 'vue';
import draggable from 'vuedraggable';

export default {
  components: {
    NavDrawer,
    AddTaskButton,
    draggable
  },
  setup() {
    const lanes = ref([
      { title: 'TO DO', items: [], color: 'blue lighten-1' },
      { title: 'ON GOING', items: [], color: 'orange lighten-1' },
      { title: 'REVISION', items: [], color: 'red lighten-1' },
      { title: 'DONE', items: [], color: 'green lighten-1' }
    ]);
    const newGroup = ref({ name: '', members: '' });
    const dialog = ref(false);
    const editDialog = ref(false);
    const currentTask = ref({ title: '' });
    const currentTaskList = ref(null);
    const currentTaskIndex = ref(-1);
    const boardName = ref("Kanban Board");

    onMounted(() => {
      document.title = boardName.value;
    });

    const deleteTask = (list, index) => {
      list.splice(index, 1);
    };

    const editTask = (list, index) => {
      currentTask.value = { ...list[index] };
      currentTaskList.value = list;
      currentTaskIndex.value = index;
      editDialog.value = true;
    };

    const saveTask = () => {
      if (currentTaskList.value && currentTaskIndex.value >= 0) {
        currentTaskList.value[currentTaskIndex.value].title = currentTask.value.title;
        editDialog.value = false;
      }
    };

    const addGroup = () => {
      if (newGroup.value.name && newGroup.value.members) {
        const membersArray = newGroup.value.members.split(',').map(member => member.trim());
        console.log({ name: newGroup.value.name, members: membersArray });
        newGroup.value.name = '';
        newGroup.value.members = '';
        dialog.value = false;
      } else {
        alert('Bitte fülle alle Felder aus');
      }
    };

    const addTask = () => {
      const taskTitle = prompt('Task Title');
      if (taskTitle) {
        lanes.value[0].items.push({ title: taskTitle });
      }
    };

    return {
      lanes,
      newGroup,
      dialog,
      editDialog,
      currentTask,
      deleteTask,
      editTask,
      saveTask,
      addGroup,
      addTask,
      boardName
    };
  }
};
</script>


<style>
.my-container {
  background-color: #5f27ba;
  color: white;
}

.v-list-item-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.v-list-item {
  cursor: pointer;
}

.lane {
  background-color: #f5f5f5;
  height: 600px;
  overflow-y: auto;
}

.lane .v-card-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: white;
  border-radius: 10px 10px 0 0;
}

.headline {
  font-weight: bold;
}

.lane .v-card {
  border-radius: 10px;
}
</style>
