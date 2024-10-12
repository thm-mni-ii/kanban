<template>
    <v-app>
        <v-container v-if="isStart">
            <v-card v-for="(item, index) in items" :key="index"  class="mb-4"
                :style="{ backgroundColor: getColorFromId(item.group) }" @click="onGroupCardClick(item.group)">
                <v-card-title>
                    GruppeID: {{ item.group }}
                </v-card-title>
            </v-card>
            <div v-if="groupSelected">
                Ausgewählte Gruppe: {{ groupSelected }}
                <ul>
                    <li v-for="member in selectedGroupMembers" :key="member.id">
                        {{ member.first_name }} {{ member.last_name }}
                    </li>
                </ul>
            </div>
        </v-container>
        <router-view v-if="!isStart"></router-view>
    </v-app>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {getColorFromId} from "@/colorHelper.js";

export default {
  setup() {
    const items = ref([]);
    const mockData = ref([]);
    const groupSelected = ref(null);
    const selectedGroupMembers = ref([]);

    const router = useRouter();
    const route = useRoute();

    const isStart = computed(() => {
      return route.path === '/';
    });

    onMounted(() => {
      fetch('/groups.json')
          .then(response => response.json())
          .then(data => {
            items.value = data;
          });

      fetch('/MOCK_DATA.json')
          .then(response => response.json())
          .then(data => {
            mockData.value = data;
          });
    });

    function selectGroup(groupId) {
      groupSelected.value = groupId;
      const group = items.value.find(item => item.group === groupId);
      selectedGroupMembers.value = mockData.value.filter(member => group.members.includes(member.id));
    }

    function onGroupCardClick(groupId) {
      router.push({ name: 'Boards', params: { groupId: groupId } });
    }

    return {
      items,
      mockData,
      groupSelected,
      selectedGroupMembers,
      isStart,
      selectGroup,
      getColorFromId,
      onGroupCardClick
    };
  }
};

</script>

<style scoped></style>