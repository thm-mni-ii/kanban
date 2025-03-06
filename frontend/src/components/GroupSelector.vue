<script setup>
import { ref } from 'vue';
import { useGroupStore } from '@/store/useGroupStore';

console.log("Setup Group Selector");
const groupStore = useGroupStore();
console.log('Groups in store:', groupStore.groups);
const selectedGroup = ref(null);


// Function to handle selection change
const handleSelection = () => {
  console.log('Selected Group:', selectedGroup.value);
};
</script>

<template>
  <div>
    <label for="groupSelector">Select a Group:</label>
    <select id="groupSelector" v-model="selectedGroup" @change="handleSelection">
      <option disabled value="">-- Choose a Group --</option>
      <option v-for="group in groupStore.groups" :key="group.groupId" :value="group.groupId">
        {{ group.groupName }}
      </option>
    </select>

    <p v-if="selectedGroup">
      Selected Group: {{ groupStore.getGroupById(selectedGroup)?.groupName }}
    </p>
  </div>
</template>

<style scoped>
label {
  font-weight: bold;
  margin-right: 10px;
}

select {
  padding: 5px;
  font-size: 1rem;
}
</style>