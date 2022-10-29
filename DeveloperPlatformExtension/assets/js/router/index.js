import { createRouter, createWebHistory } from "vue-router";
import Popup from "../views/Popup.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Popup,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;


