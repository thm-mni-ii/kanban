import { createRouter, createWebHistory } from 'vue-router'
import Start from './Start.vue'
import App from './App.vue'
import Boards from './Boards.vue'
import TimeTrackingBoard from "@/TimeTrackingBoard.vue";

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
    path: '/users/:userId/boards',
    name: 'Start-Time-Tracking',
    component: Boards,
    //props: true
  },
  {
    path: '/users/:userId/boards/board:id',
    name: 'Board-Time-Tracking',
    component:TimeTrackingBoard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router