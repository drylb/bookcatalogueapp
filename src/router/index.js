import { createRouter, createWebHistory } from 'vue-router'
import Books from '../components/Books';
import BookDetail from '../components/BookDetail.vue';

const routes = [
  { path: '/', component: Books },
  { path: '/book/:id', component: BookDetail },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
