<template>
    <div id="app">
        <base-card>
        <h1>Zeiterfassung</h1>
        </base-card>
        <TimeTracking/>
    </div>
</template>

<script>
import BaseCard from './components/BaseCard.vue';
import TimeTracking from './TimeTracking.vue';

export default {
    components: {
        TimeTracking,
        BaseCard,
    },
};


</script>