import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import { auth } from "@/firebase/config";
import store from "./store/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFontAwesome,
  fab,
} from "@fortawesome/free-brands-svg-icons";
import i18n from "./i18n";
library.add(fas, fab, far, faTwitter, faFontAwesome);

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(i18n)
      .use(router)
      .use(store)
      .component("font-awesome-icon", FontAwesomeIcon)
      .mount("#app");
  }
});
