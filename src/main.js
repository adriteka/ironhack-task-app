import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import "./dark.css";
import "./style.css";
import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faEnvelope,
  faLock,
  faCircleHalfStroke,
  faRightFromBracket,
  faPenToSquare,
  faTrashCan,
  faRotate,
  faHourglassStart,
  faAnglesUp,
  faCircleCheck,
  faCircleXmark,
  faArrowRightToBracket,
  faArrowUpFromBracket,
  // ↑/↓ icons for handling priorities - currently not in use
  // faDownLong,
  // faUpLong,
} from "@fortawesome/free-solid-svg-icons";

import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";

import {
  faHtml5,
  faCss3,
  faSquareJs,
  faVuejs,
  faGit,
  faGithub,
  faYarn,
  faChrome,
  faFontAwesome,
} from "@fortawesome/free-brands-svg-icons";

library.add(faEnvelope);
library.add(faLock);
library.add(faCircleHalfStroke);
library.add(faRightFromBracket);
library.add(faPenToSquare);
library.add(faTrashCan);
library.add(faRotate);
library.add(faHourglassStart);
library.add(faAnglesUp);
library.add(faCircleCheck);
library.add(faCircleXmark);
library.add(faSquare);
library.add(faSquareCheck);
library.add(faArrowRightToBracket);
library.add(faArrowUpFromBracket);
library.add(faHtml5);
library.add(faCss3);
library.add(faSquareJs);
library.add(faVuejs);
library.add(faGit);
library.add(faGithub);
library.add(faYarn);
library.add(faChrome);
library.add(faFontAwesome);

const pinia = createPinia();
pinia.use(piniaPersist);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(pinia)
  .mount("#app");
