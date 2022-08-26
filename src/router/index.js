import { createRouter, createWebHistory } from "vue-router";
import LinearGradientGeneratorView from "../views/LinearGradientGeneratorView";
import RadialGradientGeneratorView from "../views/RadialGradientGeneratorView";
import WebsiteBuilderView from "../views/WebsiteBuilderView";
import HomeView from "../views/HomeView";
import DOMAnalyzerView from "../views/DOMAnalyzerView";
import ResponsivityCheckerView from "../views/ResponsivityCheckerView";
import ColorPalleteGeneratorView from "../views/ColorPalleteGeneratorView";
import ColorLightenerDarkerView from "../views/ColorLightenerDarkerView";
import AdminView from "../views/AdminView";
import ColorGeneratorsToolsPageView from '@/views/ColorGeneratorsToolsPageView'
import GradientGeneratorsToolsPageView from '@/views/GradientGeneratorsToolsPageView'
import HostingProvidersPageView from '@/views/HostingProvidersPageView'
import GlobalFrontendToolsPageView from '@/views/GlobalFrontendToolsPageView'
import FavoriteToolsPageView from '@/views/FavoriteToolsPageView'
import NotFoundView from '@/views/NotFoundView'
import store from "../store";

const routes = [
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFoundView,
},
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/LinearGradientGenerator",
    name: "lineargradientgenerator",
    component: LinearGradientGeneratorView,
  },
  {
    path: "/RadialGradientGenerator",
    name: "radialgradientgenerator",
    component: RadialGradientGeneratorView,
  },
  {
    path: "/WebsiteBuilder",
    name: "websitebuilder",
    component: WebsiteBuilderView,
  },
  {
    path: "/DOMAnalyzer",
    name: "domanalyzer",
    component: DOMAnalyzerView,
  },
  {
    path: "/ResponsivityChecker",
    name: "responsivitychecker",
    component: ResponsivityCheckerView,
  },
  {
    path: "/colorPalleteGenerator",
    name: "colorpalletegenerator",
    component: ColorPalleteGeneratorView,
  },
  {
    path: "/colorlightenerdarker",
    name: "colorlightenerdarker",
    component: ColorLightenerDarkerView,
  },
  {
    path: "/adminpanel",
    name: "adminpanel",
    component: AdminView,
  },
  {
    path: "/globalfrontendtools",
    name: "globalfrontendtools",
    component: GlobalFrontendToolsPageView,
  },
  {
    path:"/gradientgenerators",
    name:"gradientgenerators",
    component:GradientGeneratorsToolsPageView,
  }, {
    path: "/colorgenerators",
    name: "colorgenerators",
    component: ColorGeneratorsToolsPageView,
  },
  {
    path: "/hostingproviders",
    name: "hostingproviders",
    component: HostingProvidersPageView,
  }, 
  {
    path: "/favorites",
    name: "favorites",
    component: FavoriteToolsPageView
  }
];

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        setTimeout(() => {
          resolve({ top: 0 });
        }, 200);
      }
    });
  },
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "adminpanel") {
    if (localStorage.getItem("email") === null) {
      //TODO: REDIRECT TO ACCES DENIED PAGE
      next("/");
      return;
    }
    
    //TODO: CHECK IF USER IS ADMIN
    if (!localStorage.getItem("email").includes("jarne.staal9@gmail.com")) {
      //TODO: REDIRECT TO ACCES DENIED PAGE
      next("/");
      return;
    }
  }

  store.dispatch("ADD_PAGE_VISIT_ROUTE", to.fullPath);
  store.dispatch("GET_PAGE_VISITS");
  next();
});

export default router;
