<template>
    <div class="d-flex justify-content-center">
      <v-text-field class="small-textbox"v-model="newTaskName" label="New task name" dense></v-text-field>
      <v-btn class="btn-style" variant="tonal" color="primary" @click="addTask">Add Task</v-btn>
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

<style>
.small-textbox {
  max-width: 200px !important; 
  padding-left: 20px;
}
.btn-style{
    padding-left: 12px;
    margin-top: 10px;
}
</style>