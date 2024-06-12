<template>
    <router-link to="/app">
            <button>Go to /app</button>
        </router-link>
    <router-link to="/">
            <button>Go to /boards</button>
    </router-link>
    <div>
        <h1 v-if="$route.meta.showHeader">asdasdasdasd</h1>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>