<script setup>
import { onMounted, useTemplateRef } from "vue";
import Chart from "chart.js/auto";

const { data, options } = defineProps(["data", "options"]);

const canvas = useTemplateRef("canvas");
onMounted(() => {
  new Chart(canvas.value, {
    type: "line",
    data, 
    options, 
  });
});
</script>

<template>
  <div>
    <canvas ref="canvas"> </canvas>
  </div>
</template>
