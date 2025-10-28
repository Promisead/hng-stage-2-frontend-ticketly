<template>
	<div
		:class="[
			'flex-shrink-0 bg-ticketly-green text-white flex flex-col',
			'transition-all duration-300 ease-in-out',
			isSidebarOpen ? 'w-60' : 'w-20',
		]">
		<button
			@click="$emit('toggleSidebar')"
			class="text-gray-300 hover:text-ticketly-orange focus:outline-none m-[1rem_auto] w-fit"
			aria-label="Toggle sidebar">
			<v-icon v-if="isSidebarOpen" name="hi-x" scale="1.75" />
			<v-icon v-else name="hi-menu" scale="1.75" />
		</button>

		<nav class="flex-1 overflow-y-auto p-4 space-y-2">
			<NavLink
				to="/dashboard"
				text="Dashboard"
				:is-sidebar-open="isSidebarOpen"
				@toggle-sidebar="$emit('toggleSidebar')">
				<v-icon name="hi-home" scale="1.5" />
			</NavLink>

			<NavLink
				to="/tickets"
				text="Tickets"
				:is-sidebar-open="isSidebarOpen"
				@toggle-sidebar="$emit('toggleSidebar')">
				<v-icon name="hi-ticket" scale="1.5" />
			</NavLink>
		</nav>
	</div>
</template>

<script setup>
import NavLink from "./NavLink.vue";

defineProps({
	isSidebarOpen: {
		type: Boolean,
		default: false,
	},
});

defineEmits(["toggleSidebar"]);
</script>
