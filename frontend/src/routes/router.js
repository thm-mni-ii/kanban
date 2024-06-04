import { createRouter, createWebHistory } from 'vue-router';
import Boards from '../Boards.vue';
import App from '../App.vue';

const routes = [
    {
        path: '/boards',
        name: 'boards',
        component: Boards
    },
    {
        path: '/kanban-board/:title',
        name: 'kanban-board',
        component: App,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;