<template>
  <div class="week-selector">
    <button @click="previousWeek">«</button>
    <span class="week-range">{{ formattedWeekRange }}</span>
    <button @click="nextWeek">»</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Aktuelles Datum (startet mit dieser Woche)
const currentDate = ref(getStartOfWeek(new Date()))

// Hilfsfunktion: Finde den Montag einer Woche
function getStartOfWeek(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Wenn Sonntag (0), dann -6
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

// Hilfsfunktion: Füge Tage hinzu
function addDays(date, days) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

// Nächste Woche
function nextWeek() {
  currentDate.value = addDays(currentDate.value, 7)
}

// Vorherige Woche
function previousWeek() {
  currentDate.value = addDays(currentDate.value, -7)
}

// Formatierter Bereich: z.B. 06.05.2024 – 12.05.2024
const formattedWeekRange = computed(() => {
  const start = currentDate.value
  const end = addDays(start, 6)

  const formatDate = (date) =>
    date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

  return `${formatDate(start)} – ${formatDate(end)}`
})
</script>

<style scoped>
.week-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: sans-serif;
  font-size: 1.1rem;
}

.week-selector button {
  background-color: #eeeeee;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1.2rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.week-selector button:hover {
  background-color: #d0d0d0;
}

.week-range {
  min-width: 220px;
  text-align: center;
  display: inline-block;
}
</style>
