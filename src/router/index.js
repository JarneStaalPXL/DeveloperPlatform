import { createRouter, createWebHistory } from "vue-router";
import LinearGradientGeneratorView from "../views/LinearGradientGeneratorView";
import RadialGradientGeneratorView from "../views/RadialGradientGeneratorView";
import WebsiteBuilderView from "../views/WebsiteBuilderView";
import HomeView from "../views/HomeView";
import DOMAnalyzerView from "../views/DOMAnalyzerView";
import ColorPalleteGeneratorView from "../views/ColorPalleteGeneratorView";
import ColorLightenerDarkerView from "../views/ColorLightenerDarkerView";
import AdminView from "../views/AdminView";
import ColorGeneratorsToolsPageView from "@/views/ColorGeneratorsToolsPageView";
import GradientGeneratorsToolsPageView from "@/views/GradientGeneratorsToolsPageView";
import HostingProvidersPageView from "@/views/HostingProvidersPageView";
import GlobalFrontendToolsPageView from "@/views/GlobalFrontendToolsPageView";
import FavoriteToolsPageView from "@/views/FavoriteToolsPageView";
import NotFoundView from "@/views/NotFoundView";
import store from "../store";
import RegisterView from "@/views/RegisterView";
import LoginView from "@/views/LoginView";
import ForgotPasswordView from "@/views/ForgotPasswordView";
import ProfileView from "@/views/ProfileView";
import LearningView from "@/views/LearningView";
import FontsView from '@/views/FontsView';
import FileConvertersView from '@/views/FileConvertersView'

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
    path: "/gradientgenerators",
    name: "gradientgenerators",
    component: GradientGeneratorsToolsPageView,
  },
  {
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
    component: FavoriteToolsPageView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/forgotpassword",
    name: "forgotpassword",
    component: ForgotPasswordView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/learningtools",
    name: "learningtools",
    component: LearningView
  },
  {
    path: "/fonts",
    name: "fonts",
    component: FontsView
  },
  {
    path: "/fileconverters",
    name: "fileconverters",
    component: FileConvertersView
  },
  {
    path: "/projects",
    name: "projects",
    component: () => import("../views/UserProjectsView.vue"),
  },
  {
    path: "/apis",
    name: "apis",
    component: () => import("../views/ApiView.vue"),
  },
  {
    path: "/accessDenied/:message",
    name: "accessDenied",
    component: () => import("../views/AccessDeniedView.vue"),
  },
  {
    path: "/processedFeedbacks",
    name: "processedFeedbacks",
    component: () => import("../views/ProcessedFeedbackView.vue"),
  }
];

import {
  createDiscreteApi,
  ConfigProviderProps,
  darkTheme,
  lightTheme,
} from "naive-ui";
import { computed, defineComponent, ref } from 'vue'

//Bugs out when created with new account. Troubles with toLowerCase() function.
//Most likely undefined value is passed to it.
const configProviderPropsRef = computed(() => ({
  theme: store.state.colorMode.toLowerCase() === 'light'? lightTheme : darkTheme
}));

const { loadingBar } = createDiscreteApi(["loadingBar"], {
  configProviderProps: configProviderPropsRef,
});

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    if(to.hash){
      return { el: to.hash, behavior: 'smooth' }
    }
    else {
      return { top: 0 }
    }
  },
  
  //scrollbehavior that sets scrollposition of layoutcontent id to 0
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  store.commit("setShowLoadingAnimation", true);
  loadingBar.start();
  if (to.name === "adminpanel") {
    if (localStorage.getItem("email") === null) {
      next({ path: '/accessDenied/Only administrators have access to this page.'});
      return;
    }
    if (store.dispatch('IS_ADMIN', localStorage.getItem('uid')) === false) {
      next({ path: '/accessDenied/Only administrators have access to this page.'});
      return;
    }
  }
  store.dispatch("ADD_PAGE_VISIT_ROUTE", to.fullPath);
  store.dispatch("GET_PAGE_VISITS");
  next();
});

router.afterEach((to, from) => {
  loadingBar.finish();
  //vue scroll to top
    window.$scrollContent.scrollTo({ top: 0, behavior: "smooth" });
    store.commit("setShowLoadingAnimation", false);
});

export default router;


