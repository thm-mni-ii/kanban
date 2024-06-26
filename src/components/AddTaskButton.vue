<template>
  <v-fab-transition>
    <v-btn
      fab
      bottom
      right
      color="primary"
      @click="$emit('add-task')"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  name: 'AddTaskButton',
};
</script>
<style scoped>
.v-btn {
  position: fixed;
  right: 16px;
  bottom: 16px;
}
</style>