<template>
    <v-col cols="3">
      <div class="style-box">
        <h2>{{ sectionTitle }}</h2>
        <draggable :list="items" group="tasks" @start="drag=true" @end="drag=false">
          <template #item="{ element, index }">
            <div :key="index">
              <v-card class="mb-3">
                <v-card-text>{{ element.title }}</v-card-text> 
                <v-col cols="2">
                    <v-btn icon="mdi-delete-outline" small  density="compact" @click.stop="deleteTask(index)">
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
    props: {
      sectionTitle: String,
      items: Array
    },
    setup(props, { emit }) {
      const deleteTask = (index) => {
        props.items.splice(index, 1);
        emit('update:items', props.items);
      }
  
      return {
        deleteTask
      }
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