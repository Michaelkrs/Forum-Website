// import './assets/main.css'

import { createApp } from "vue";
import { createPinia } from "pinia";
import vue3GoogleLogin from "vue3-google-login";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(vue3GoogleLogin, {
  clientId:
    "1093247809100-phlumvh2b66v7f7ul28f4oulvsm3cq66.apps.googleusercontent.com",
});

app.use(createPinia());
app.use(router);

app.mount("#app");
