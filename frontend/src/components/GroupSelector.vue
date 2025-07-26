<template>
  <select :value="modelValue" @change="onChange" :disabled="userHasNoGroups">
    <option :disabled="userHasNoGroups" value="-1">
      {{ userHasNoGroups ? '-- Sie sind in keiner Gruppe --' : 'Keine Gruppe' }}
    </option>

    <option v-for="group in groupStore.groups" :value="group.id" :key="group.id">
      {{ group.name }}
    </option>
  </select>
</template>

<script>
import { userGroupStore } from '@/store/userGroupStore';
export default {
  name: 'GroupSelector',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  data() {
    return {
      groupStore: userGroupStore(),
    }
  },
  computed: {
    userHasNoGroups() {
      return this.groupStore.groups.length === 0;
    }
  },
  methods: {
    onChange(event) {
      const value = parseInt(event.target.value, 10);
      this.$emit('update:modelValue', value);
    }
  }
}

</script>