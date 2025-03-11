<script setup>
import { ref } from 'vue';
import { useGroupStore } from '@/store/useGroupStore';
import { defineProps, defineEmits } from 'vue';


const groupStore = useGroupStore();

// Accept v-model binding as `modelValue`
const props = defineProps({
  modelValue: Object, // Expecting an object (the selected group)
});

// register the events that this component emits
const emit = defineEmits(['update:modelValue', 'change']);


// Function to handle selection change
const handleSelection = (event) => {
  // update the seleced group

  const selectedGroup = groupStore.groups.find(g => g.id == event.target.value);

  // emit custom events
  emit('update:modelValue', selectedGroup); // For v-model
  emit('change', selectedGroup); // Custom change event
};
</script>

<template>
  <div>
    <label for="groupSelector">Select a Group:</label>
    <select id="groupSelector" :value="modelValue?.id" @change="handleSelection">
      <option disabled value="">-- Choose a Group --</option>
      <option v-for="group in groupStore.groups" :key="group.id" :value=group.id>
        {{ group.name }}
      </option>
    </select>
  </div>
</template>
