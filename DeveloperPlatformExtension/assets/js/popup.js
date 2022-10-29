import { createApp } from "vue";

import Popup from "./views/Popup.vue";
import router from "./router";
import store from "./store";
const app = createApp(Popup);

app.use(router);

app.use(store);

app.mount("#app");
