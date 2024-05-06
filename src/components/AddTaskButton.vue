<template>
    <div class="d-flex">
      <v-text-field v-model="newTaskName" label="New task name" rounded class="shrink"></v-text-field>
      <v-btn variant="tonal" color="primary" @click="addTask">Add Task</v-btn>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup(props, context) {
      const newTaskName = ref('');
  
      const addTask = () => {
        if (newTaskName.value) {
          // Emit the new task name to the parent component
          context.emit('add-task', newTaskName.value);
          newTaskName.value = '';
        }
      };
  
      return {
        newTaskName,
        addTask
      };
    }
  };
  </script> 

  <style scoped>
    .v-text-field{
        width: 40px !important;
    }
</style>