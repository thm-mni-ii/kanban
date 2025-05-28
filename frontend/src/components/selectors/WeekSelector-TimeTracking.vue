<template>
  <div class="week-selector">
    <button @click="previousWeek">«</button>
    <span class="week-range">{{ formattedWeekRange }}</span>
    <button @click="nextWeek">»</button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useTimeTrackingStore } from '@/store/timeTracking' // Pfad ggf. anpassen

const store = useTimeTrackingStore()

// Aktuelles Datum (startet mit dieser Woche)
const currentDate = ref(getStartOfWeek(new Date()))

// 📅 Berechne Wochenbeginn (Montag)
function getStartOfWeek(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Sonntag = 0 => -6
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

// 📅 Hilfsfunktion: Tage addieren
function addDays(date, days) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

// ➡️ Nächste Woche
function nextWeek() {
  currentDate.value = addDays(currentDate.value, 7)
}

// ⬅️ Vorherige Woche
function previousWeek() {
  currentDate.value = addDays(currentDate.value, -7)
}

// 📆 Formatierte Anzeige der Woche
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

// 🧠 Automatisch Store updaten bei Woche-Änderung
watch(currentDate, (newDate) => {
  const start = newDate
  const end = addDays(start, 6)

  // ISO-Format: yyyy-mm-dd
  const formatISO = (date) => date.toISOString().split('T')[0]

  store.fromDate = formatISO(start)
  store.toDate = formatISO(end)

  store.fetchEntries()
}, { immediate: true }) // auch sofort beim Laden einmal ausführen
</script>

<style scoped>
.week-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-family: sans-serif;
  font-size: 1.3rem;
  padding: 0.3rem;
}

.week-selector button {
  background-color: #eeeeee;
  border: none;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.week-selector button:hover {
  background-color: #cccccc;
}

.week-range {
  min-width: 260px;
  text-align: center;
  display: inline-block;
}
</style>
