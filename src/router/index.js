import { createRouter, createWebHistory } from 'vue-router'
import LinearGradientGeneratorView from '../views/LinearGradientGeneratorView'
import RadialGradientGeneratorView from '../views/RadialGradientGeneratorView'
import WebsiteBuilderView from "../views/WebsiteBuilderView"
import HomeView from "../views/HomeView"
import DOMAnalyzerView from "../views/DOMAnalyzerView"
import ResponsivityCheckerView from "../views/ResponsivityCheckerView"
import ColorPalleteGeneratorView from '../views/ColorPalleteGeneratorView'
import ColorLightenerDarkerView from '../views/ColorLightenerDarkerView'

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
  },
  {
    path: '/ResponsivityChecker',
    name: 'responsivitychecker',
    component: ResponsivityCheckerView
  },
  {
    path: '/colorPalleteGenerator',
    name: 'colorpalletegenerator',
    component: ColorPalleteGeneratorView
  },
  {
    path: '/colorlightenerdarker',
    name: 'colorlightenerdarker',
    component: ColorLightenerDarkerView
  }
]

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      if (savedPosition) {
        return savedPosition
      } else {
        setTimeout(() => {
          resolve({ top: 0 })
        }, 200)
      }

    })
  },
  history: createWebHistory(),
  routes
})

export default router
