<template>
    <div class="time-grid-view">
    <!-- Header: Dynamic Columns (Days, Weeks, or Months) -->
    <div class="grid-header">
      <div
        class="grid-column"
        v-for="header in headers"
        :key="header"
      >
        <h3>{{ header }}</h3>
      </div>
    </div>
</div>
</template>


<script>
import TimeCard from './TimeCard.vue';

export default {
    name:"TimeGridView",

};

</script>