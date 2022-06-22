import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LinearGradientGeneratorView from '../views/LinearGradientGeneratorView'
import RadialGradientGeneratorView from '../views/RadialGradientGeneratorView'
import WebsiteBuilderView from "../views/WebsiteBuilderView"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/LinearGradientGenerator',
    name: 'lineargradientgenerator',
    component: LinearGradientGeneratorView
  },
  {
    path: '/RadialGradientGenerator',
    name: 'radialgradientgenerator',
    component: RadialGradientGeneratorView
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
