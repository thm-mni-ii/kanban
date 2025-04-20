import { createRouter, createWebHistory } from 'vue-router'
import Start from './Start.vue'
import App from './App.vue'
import Boards from './Boards.vue'
import TimeTracking from './TimeTracking.vue'

const routes = [
  { 
    path: '/',
    name: 'Start',
    component: Start,
  },
  {
    path: '/groups/:groupId/boards/:boardId',
    name: 'App',
    component: App,
  },
  {
    path: '/groups/:groupId/boards',
    name: 'Boards',
    component: Boards,
    props: true,
  },
  {
    path: '/time',
    name: 'Time Tracking',
    component: TimeTracking
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router