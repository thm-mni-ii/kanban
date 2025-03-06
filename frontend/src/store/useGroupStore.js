import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGroupStore = defineStore('groupStore', () => {
  // State: Groups array
  const groups = ref([
    { groupId: 1, groupName: 'Developers' },
    { groupId: 2, groupName: 'Designers' },
  ]);

  // Action: Add a new group
  const addGroup = (groupId, groupName) => {
    groups.value.push({ groupId, groupName });
  };

  // Action: Get a group by ID
  const getGroupById = (id) => {
    return groups.value.find(group => group.groupId === id);
  };

  return { groups, addGroup, getGroupById };
});
