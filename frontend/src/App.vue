<template>
    <div id="app">
      <!-- Single BaseCard for Title and Content -->
       
    
        <!-- Content (Default Slot) -->
        <v-app>
          <router-view></router-view>
        </v-app>
        <!-- <TimeTracking /> -->
      
    </div>
  </template>
  
  <script>
  import BaseCard from "./components/BaseCard.vue";
  import TimeTracking from "./TimeTracking.vue";
  
  export default {
    components: {
      BaseCard,
      TimeTracking,
    },
  };
  </script>
  
  <style scoped>
  #app {
    margin: 0;
    padding: 0;
  }
  .topic-container h1 {
    text-align:center;
  }
  </style>
  