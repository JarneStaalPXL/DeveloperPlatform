import { createRouter, createWebHistory } from 'vue-router'
import LinearGradientExampleView from '../views/LinearGradientExampleView.vue'
import LinearGradientGeneratorView from '../views/LinearGradientGeneratorView'
import RadialGradientGeneratorView from '../views/RadialGradientGeneratorView'
import WebsiteBuilderView from "../views/WebsiteBuilderView"

const routes = [
  {
    path: '/',
    name: 'home',
    component: LinearGradientGeneratorView
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
    path: '/LinearGradientExample/',
    name: 'lineargradientexample',
    component: LinearGradientExampleView,
    props: true,
    params: true,
    query: true,

  },
  {
    path: '/WebsiteBuilder',
    name: 'websitebuilder',
    component: WebsiteBuilderView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
