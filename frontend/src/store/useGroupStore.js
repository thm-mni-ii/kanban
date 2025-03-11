import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGroupStore = defineStore('groupStore', () => {
  // State: Gruppenliste und ausgewählte Gruppe
  const groups = ref([
    { groupId: 1, groupName: 'Entwicklung' },
    { groupId: 2, groupName: 'Design' },
    { groupId: 3, groupName: 'Marketing' },
    { groupId: 4, groupName: 'Support' },
  ]);
  const selectedGroup = ref(null); // Speichert die aktuell ausgewählte Gruppe


  // Setter: Setzt die ausgewählte Gruppe
  const setSelectedGroup = (group) => {
    selectedGroup.value = group;
  };

  return { groups, selectedGroup, setSelectedGroup };
});
