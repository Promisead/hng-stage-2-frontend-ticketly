import { createRouter, createWebHistory } from "vue-router";

// Import Layouts & Public Pages
import AppLayout from "../components/AppLayout.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";

const authGuard = (to, from, next) => {
	const token = localStorage.getItem("ticketapp_session");

	if (token) {
		next();
	} else {
		next({ name: "login" });
	}
};

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
		meta: { title: "ticketly - Seamless Ticket Management" },
	},
	{
		path: "/auth/login",
		name: "login",
		component: LoginView,
		meta: { title: "ticketly - Sign In" },
	},
	{
		path: "/auth/signup",
		name: "signup",
		component: SignupView,
		meta: { title: "ticketly - Create Account" },
	},

	{
		path: "/",
		component: AppLayout,
		beforeEnter: authGuard,
		children: [
			{
				path: "/dashboard",
				name: "dashboard",
				component: () => import("../views/DashboardView.vue"),
				meta: { title: "ticketly - Dashboard" },
			},
			{
				path: "/tickets",
				name: "tickets",
				component: () => import("../views/TicketsView.vue"),
				meta: { title: "ticketly - Manage Tickets" },
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
