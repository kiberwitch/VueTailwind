import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Favorites from '../pages/Favorites.vue';

const routes = [
  { 
    path: '/', 
    name: 'Home',
    component: Home 
  },
  { 
    path: '/favorites',
    name: 'Favorites',
    component: Favorites 
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // КРИТИЧЕСКИ ВАЖНО!
  routes,
});

export default router;