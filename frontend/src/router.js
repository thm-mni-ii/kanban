import { createRouter, createWebHistory } from 'vue-router'
import Start from './Start.vue'
import App from './App.vue'
import Boards from './Boards.vue'

const routes = [
  {
    path: '/',
    name: 'Start',
    component: Start,
    children:[{
      path: '',
      component: Boards,
    }]
  },
  {
    path: '/app',
    name: 'App',
    component: App,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router