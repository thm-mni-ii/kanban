import { defineStore } from 'pinia';
import { ref } from 'vue';

export const userGroupStore = defineStore('groupStore', () => {
  // State: Gruppenliste und ausgewählte Gruppe
  const groups = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Bearer Token (Replace with actual token or get from auth store)
  const bearerToken = localStorage.getItem("token")? localStorage.getItem("token"):import.meta.env.VITE_API_TOKEN; // Replace with actual token
  const userId = localStorage.getItem("userid")? localStorage.getItem("userid"):import.meta.env.VITE_USER_ID

  // Fetch groups from API
  const fetchGroups = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`https://feedback.mni.thm.de/api/v1/users/${userId}/groups`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${bearerToken}`, // Send token in Authorization header
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch groups');
      }

      const data = await response.json();
      groups.value = data; // Assuming the API returns { "groups": [...] }

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

  return { groups, fetchGroups, loading, error, findGroupById};
});
