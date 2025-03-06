import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useGroupStore = defineStore('groupStore', () => {
  const groups = ref([]);  // Store group data
  const loading = ref(false);
  const error = ref(null);

  // Fetch groups from API
  const fetchGroups = async () => {
    loading.value = true;
    error.value = null;

    try {
      // TODO: make this api call get group api of the feedback system
      config = {
        headers: {
          // TODO: get Token from local env
           Authorization: "Bearer " + yourJWTToken
        }
     }
      const response = await axios.get('http://localhost:3000/groups/', config); // Replace with your API URL
      groups.value = response.data; // Assuming API returns an array of { id, name }
    } catch (err) {
      error.value = err.message || 'Failed to fetch groups';
    } finally {
      loading.value = false;
    }
  };

  // Computed property to return groups
  const groupList = computed(() => groups.value);

  return {
    groups,
    loading,
    error,
    fetchGroups,
    groupList,
  };
});
