<template>
  <v-app>
    <NavDrawer />
    <v-container class="d-flex justify-center my-container" style="background-color:  #80BA27;" w-auto>
      <h1>{{ boardName }}</h1>
    </v-container>
    <v-main>
      <v-container fluid class="flex mt-4">
        <v-btn color="primary" style="margin-left: auto;" dark @click="showDialog">
          <v-icon>mdi-plus</v-icon>
          Add Card
        </v-btn>
        <addTimeCard ref="addTimeCard"
                     @added="(month) => reloadCardsByMonth(month)" />
        <!-- Expansion Panels for each Quarter -->
        <v-expansion-panels style="padding-top: 20px;">
          <v-expansion-panel v-for="(months, index) in quarters" :key="index"  class="mb-4" >
            <v-expansion-panel-title>
              Q{{ index + 1 }} ({{ months.join(' - ') }})
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-card class="mt-4" style="background: #f7f2f9;">
                <v-row justify="center">
                  <Label
                      v-for="month in months"
                      :key="month"
                      ref="month + 'Label'"
                      :sectionTitle="month.charAt(0).toUpperCase() + month.slice(1)"
                      :status="month"
                      :items="monthItems[month]"
                      @update:items="monthItems[month] = $event"
                  />
                </v-row>
              </v-card>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavDrawer from "@/components/NavDrawer.vue";
import addTimeCard from "@/components/addTimeCard.vue";
import Label from "@/components/Label.vue";
import { ref, onMounted } from 'vue';
import { apiUrl } from '@/lib/getApi.js';


export default {
  components: {
    Label,
    NavDrawer,
    addTimeCard,
  },
  setup() {

    const monthNames = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];

    const monthItems = {
      january: [],
      february: [],
      march: [],
      april: [],
      may: [],
      june: [],
      july:[],
      august:[],
      september:[],
      october:[],
      november:[],
      december:[],
    };

    const boardName = ref("Time Tracking");

    const quarters = [
      ['january', 'february', 'march'],
      ['april', 'may', 'june'],
      ['july', 'august', 'september'],
      ['october', 'november', 'december'],
    ];



    return {
      monthNames,
      monthItems,
      boardName,
      quarters
    }
  },
  methods: {
    showDialog() {
      this.$refs.addTimeCard.showDialog();
    },
    reloadCardsByMonth(monthNumber) {
      const monthName = this.monthNames[monthNumber - 1];

      if (this.$refs[`${monthName}Label`]) {
        this.$refs[`${monthName}Label`].loadCards();
      } else {
        console.error('Invalid month reference:', monthName);
      }
    },
  },
}
</script>


<style>
.my-container {
  border: 1px solid rgba(92, 92, 92, 0.881);
  border-radius: 5px;
  width: auto;
}
</style>
