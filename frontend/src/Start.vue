<template>
  <v-app>
    <v-container v-if="isStart">
      <v-container class="d-flex justify-center my-container mb-4" style="background-color:  #80BA27;" w-auto>
        <h1>Meine Gruppen</h1>
      </v-container>
      <v-card
          v-for="(item, index) in items"
          :key="index"
          class="mb-4"
          :style="{ backgroundColor: getColorFromId(item.id) }"
          @click="onGroupCardClick(item.id)"
      >
        <v-card-title> {{ item.name }} </v-card-title>
      </v-card>
      <div v-if="groupSelected">
        Ausgewählte Gruppe: {{ groupSelected }}
        <ul>
          <li v-for="member in selectedGroupMembers" :key="member.id">
            {{ member.first_name }} {{ member.last_name }}
          </li>
        </ul>
      </div>
      <!--Beispieldatensatz für den BarChart-->
      <!--BarChart :data="chartData" :options="options" /-->
    </v-container>
    <router-view v-if="!isStart"></router-view>
  </v-app>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import BarChart from './components/BarChart.vue';
import { getColorFromId } from '@/colorHelper.js';
import {GroupService} from "@/lib/group.service";

export default {
  components: { BarChart },
  setup() {
    // Reactive references
    const items = ref([]);
    const mockData = ref([]);
    const groupSelected = ref(null);
    const selectedGroupMembers = ref([]);

    // Router and route
    const router = useRouter();
    const route = useRoute();

    // Set Token
    const token = new URLSearchParams(location.search).get("token");
    if (token) {
      sessionStorage.setItem("token", token);
    }

    // Computed property
    const isStart = computed(() => {
      return route.path === '/';
    });

    // Chart data and options
    const chartData = ref({
      labels: [
        'Red',
        'Blue',
        'Yellow',
        'Green',
        'Purple',
        'Orange',
        'FakeFarbe',
        'FakeFarbe',
      ],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3, 100, 1],
          borderWidth: 1,
        },
      ],
    });

    const options = ref({
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    });

    // Lifecycle hook
    onMounted(() => {
      GroupService.getMyGroups()
          .then((data) => {
            items.value = data;
          });
    });

    // Methods
    function selectGroup(groupId) {
      groupSelected.value = groupId;
      const group = items.value.find((item) => item.group === groupId);
      selectedGroupMembers.value = mockData.value.filter((member) =>
          group.members.includes(member.id)
      );
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
      chartData,
      options,
      selectGroup,
      getColorFromId,
      onGroupCardClick,
    };
  },
};
</script>

<style scoped></style>
