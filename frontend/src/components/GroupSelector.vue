<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useGroupStore } from '@/stores/useGroupStore';

const props = defineProps({
  modelValue: Object, // Expecting { id, name }
});

const emit = defineEmits(['update:modelValue']);

const groupStore = useGroupStore();
const selectedGroupId = ref(props.modelValue?.id || '');

// Fetch groups on mount
onMounted(() => {
  groupStore.fetchGroups();
});

// Computed property for dropdown options
const groupOptions = computed(() => groupStore.groups);

// Watch for changes in selected ID & update v-model
watch(selectedGroupId, (newId) => {
  const selectedGroup = groupOptions.value.find((g) => g.id === newId);
  emit('update:modelValue', selectedGroup || { id: '', name: '' });
});
</script>

<template>
  <div>
    <label for="group-selector">Select a Group:</label>
    <select
      id="group-selector"
      v-model="selectedGroupId"
      :disabled="groupStore.loading || groupStore.error"
    >
      <option value="" disabled>Select a group...</option>
      <option v-for="group in groupOptions" :key="group.id" :value="group.id">
        {{ group.name }}
      </option>
    </select>

    <p v-if="groupStore.loading">Loading groups...</p>
    <p v-else-if="groupStore.error" class="error">{{ groupStore.error }}</p>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
