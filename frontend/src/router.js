// router.js

import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Boards from './Boards.vue'

const routes = [
  {
    path: '/app',
    name: 'App',
    component: App
  },
  {
    path: '/',
    name: 'Boards',
    component: Boards
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router