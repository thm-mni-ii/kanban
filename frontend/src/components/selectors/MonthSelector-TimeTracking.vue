<template>
  <div class="month-selector">
    <button @click="previousMonth" aria-label="Vorheriger Monat">«</button>
    <span class="month-label">{{ formattedMonth }}</span>
    <button @click="nextMonth" aria-label="Nächster Monat">»</button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useTimeTrackingStore } from '@/store/timeTracking' // Pfad ggf. anpassen

const store = useTimeTrackingStore()

// Aktueller Monat (startet mit diesem Monat, 1. Tag UTC 00:00)
const currentMonth = ref(getStartOfMonth(new Date()))

// Monatsbeginn (UTC, wie beim Week-Selector)
function getStartOfMonth(date) {
  const d = new Date(date)
  d.setUTCDate(1)
  d.setUTCHours(0, 0, 0, 0)
  return d
}

// Hilfsfunktion: Monate addieren
function addMonths(date, months) {
  const d = new Date(date)
  // auf UTC-Basis rechnen
  const y = d.getUTCFullYear()
  const m = d.getUTCMonth()
  d.setUTCFullYear(y, m + months, 1)
  d.setUTCHours(0, 0, 0, 0)
  return d
}

function previousMonth() {
  currentMonth.value = addMonths(currentMonth.value, -1)
}

function nextMonth() {
  currentMonth.value = addMonths(currentMonth.value, 1)
}

const formattedMonth = computed(() =>
  currentMonth.value.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
)

// 🧠 Store automatisch aktualisieren bei Monatswechsel
watch(
  currentMonth,
  (newDate) => {
    const start = new Date(newDate) // 1. Tag 00:00 UTC
    const end = new Date(Date.UTC(newDate.getUTCFullYear(), newDate.getUTCMonth() + 1, 0, 23, 59, 59, 999)) // letzter Tag

    // Wenn vorhanden, den komfortablen Store-Helfer verwenden
    if (typeof store.setMonthRange === 'function') {
      const year = newDate.getUTCFullYear()
      const month = newDate.getUTCMonth() + 1 // 1-12
      store.setMonthRange(year, month)
    }

    store.fetchEntries()
  },
  { immediate: true }
)
</script>

<style scoped>
.month-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-family: sans-serif;
  font-size: 1.3rem;
  padding: 0.3rem;
}

.month-selector button {
  background-color: #eeeeee;
  border: none;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.month-selector button:hover {
  background-color: #cccccc;
}

.month-label {
  min-width: 260px;
  text-transform: capitalize; /* 'september' → 'September' bei manchen Locales */
  text-align: center;
  display: inline-block;
}
</style>
