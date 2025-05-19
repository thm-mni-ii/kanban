<template>
  <v-navigation-drawer expand-on-hover rail style="background-color: #405E9A;">

    
    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-arrow-left" @click="goBack" title="Zurück" value=".."></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {useRoute, useRouter} from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    function goBack() {
      const split = route.path.split("/");
      if (split.length === 4) {
        router.push({ path: '/' });
      } else {
        router.push({path: split.slice(0, -1).join("/")});
      }
    }

    return {
      goBack
    };
  },
};
</script>
