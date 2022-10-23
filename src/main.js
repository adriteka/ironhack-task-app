import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faRotate,
  faHourglassStart,
  faDownLong,
  faUpLong,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

import {
  faSquare,
  faSquareCheck,
} from "@fortawesome/free-regular-svg-icons";

library.add(faPenToSquare);
library.add(faTrashCan);
library.add(faRotate);
library.add(faHourglassStart);
library.add(faDownLong);
library.add(faUpLong);
library.add(faCircleCheck);
library.add(faCircleXmark);
library.add(faSquare);
library.add(faSquareCheck);

const pinia = createPinia();

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(pinia)
  .mount("#app");
