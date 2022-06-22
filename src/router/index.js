import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GradientGeneratorView from '../views/GradientGeneratorView'
import WebsiteBuilderView from "../views/WebsiteBuilderView"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/GradientGenerator',
    name: 'gradientgenerator',
    component: GradientGeneratorView
  },
  {
    path: '/WebsiteBuilder',
    name: 'websitebuilder',
    component: WebsiteBuilderView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
