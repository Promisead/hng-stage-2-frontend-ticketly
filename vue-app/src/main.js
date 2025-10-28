import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
	HiMenu,
	HiHome,
	HiTicket,
	HiX,
	HiLogout,
	HiArrowLeft,
	HiFire,
	HiSparkles,
	HiCheckCircle,
	HiPlus,
	HiMinus,
	HiPencil,
	HiTrash,
	HiExclamationCircle,
	HiCalendar,
} from "oh-vue-icons/icons/hi";

addIcons(
	HiMenu,
	HiX,
	HiHome,
	HiFire,
	HiSparkles,
	HiCheckCircle,
	HiPlus,
	HiTicket,
	HiPencil,
	HiTrash,
	HiExclamationCircle,
	HiCalendar,
	HiLogout,
	HiMinus,
	HiArrowLeft
);

import App from "./App.vue";
import "./assets/main.css";
import { useAuthStore } from "./stores/authStore";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast);

app.component("v-icon", OhVueIcon);
const authStore = useAuthStore();
authStore.checkAuthOnLoad();

app.mount("#app");
