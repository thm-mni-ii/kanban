<script setup>
import { ref, watch, onMounted, onBeforeUnmount, useTemplateRef, toRaw } from "vue";
import Chart from "chart.js/auto";

const props = defineProps(["data", "options"]);
const canvas = useTemplateRef("canvas");

let chartInstance = null;

const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }
  chartInstance = new Chart(canvas.value, {
    type: "bar",
    data: toRaw(props.data),
    options: toRaw(props.options),
  });
};

onMounted(() => {
  renderChart();
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});

watch(
    () => props.data,
    () => {
      renderChart();
    },
    { deep: false } // ← NICHT tief beobachten!
);

watch(
    () => props.options,
    () => {
      renderChart();
    },
    { deep: false } // ← Auch hier kein "deep"
);
</script>

<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>