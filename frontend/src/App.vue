<template>
    <div id="app">
      <!-- Single BaseCard for Title and Content -->
       <div class="topic-container">
      <base-card>
          <h1>Arbeitszeiterfassung</h1>
        </base-card>
    </div>
    
        <!-- Content (Default Slot) -->
        <TimeTracking />
      
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
  