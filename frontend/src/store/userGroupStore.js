import { defineStore } from 'pinia';
import { ref } from 'vue';
import { GroupService } from '@/lib/group.service';
import { UserService } from '@/lib/user.service';

export const userGroupStore = defineStore('groupStore', () => {
  // State: Gruppenliste und ausgewählte Gruppe
  const groups = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const currentUser = ref(null);

  const fetchCurrentUser = async () => {
    try {
      currentUser.value = await UserService.getCurrentUser();
      return currentUser.value;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  // Fetch groups from API
  const fetchGroups = async () => {
    loading.value = true;
    error.value = null;

    try {
      if (!currentUser.value) {
        await fetchCurrentUser();
      }
      
      const data = await GroupService.getMyGroups();
      groups.value = data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };


  // Automatically fetch groups when store is initialized
  fetchGroups();

  // Add a method to find a group by id
  const findGroupById = (id) => {
    return groups.value.find(group => group.id === id);
  }

  return { groups, fetchGroups, loading, error, findGroupById, currentUser, fetchCurrentUser};
});
