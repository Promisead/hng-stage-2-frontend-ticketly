<template>
	<header
		class="h-16 bg-white shadow-md flex items-center justify-between px-6 shrink-0">
		<div class="flex items-center">
			<span v-if="user" class="hidden sm:inline mr-3 font-medium text-gray-700">
				Welcome, {{ user.name }}
			</span>

			<div
				class="w-10 h-10 bg-ticketly-orange rounded-full flex items-center justify-center text-white font-bold">
				{{ userInitial }}
			</div>
		</div>

		<button
			@click="logout"
			class="flex items-center gap-1 rounded-sm hover:bg-slate-300/30 px-4 py-2">
			<span>
				<v-icon name="hi-logout" />
			</span>
			Logout
		</button>
	</header>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();


const { user, userInitial } = storeToRefs(authStore);
const { logout } = authStore;
</script>
