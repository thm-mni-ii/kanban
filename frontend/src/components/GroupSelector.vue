<template>
    <select v-model="groupId" @change="emitModelValue" :disabled="userHasNoGroups">
      <option v-if="!userHasNoGroups" disabled value=-1>-- wähle eine Gruppe aus --</option>
      <option v-else disabled value=-1>-- Sie sind in keiner Gruppe --</option>
      <option v-for="group in groupStore.groups" :value="group.id">
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
      groupId: -1,
    }
  },
  computed: {
    userHasNoGroups() {
      return this.groupStore.groups.length == 0;
    }
  },
  methods: {
    emitModelValue() {
      this.$emit('update:modelValue', this.groupId);
    }
  }
}

</script>