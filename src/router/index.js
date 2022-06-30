import { createRouter, createWebHistory } from 'vue-router'
import LinearGradientGeneratorView from '../views/LinearGradientGeneratorView'
import RadialGradientGeneratorView from '../views/RadialGradientGeneratorView'
import WebsiteBuilderView from "../views/WebsiteBuilderView"
import HomeView from "../views/HomeView"
import DOMAnalyzerView from "../views/DOMAnalyzerView"

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
  },
  {
    path: '/DOMAnalyzer',
    name: 'domanalyzer',
    component: DOMAnalyzerView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
