import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGroupStore = defineStore('groupStore', () => {
  // State: Gruppenliste und ausgewählte Gruppe
  const groups = ref([]);
  const selectedGroup = ref(null); // Speichert die aktuell ausgewählte Gruppe
  const loading = ref(false);
  const error = ref(null);

  // Bearer Token (Replace with actual token or get from auth store)
  const bearerToken = localStorage.getItem("token")? localStorage.getItem("token"):import.meta.env.VITE_API_TOKEN; // Replace with actual token
  const userId = localStorage.getItem("userid")? localStorage.getItem("userid"):import.meta.env.VITE_USER_ID

  // Setter: Setzt die ausgewählte Gruppe
  const setSelectedGroup = (group) => {
    selectedGroup.value = group;
  };

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

  // Refresh groups when select input is clicked/tapped
  const refreshGroups = () => {
    fetchGroups();
  };

  // Automatically fetch groups when store is initialized
  fetchGroups();

  return { groups, selectedGroup, setSelectedGroup, fetchGroups };
});
