<template>
	<RouterLink
		:to="to"
		@click="handleClick"
		:class="[
			'flex items-center p-3 rounded-lg text-gray-300',
			'hover:bg-green-800 hover:text-white',
			isSidebarOpen ? 'justify-start' : 'justify-center',
		]">
		<slot />

		<span
			:class="[
				'ml-4 font-medium transition-opacity',
				isSidebarOpen ? 'opacity-100' : 'opacity-0 absolute',
			]">
			{{ text }}
		</span>
	</RouterLink>
</template>

<script setup>
import { RouterLink } from "vue-router";

const props = defineProps({
	to: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	isSidebarOpen: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(["toggleSidebar"]);

function handleClick() {
	if (props.isSidebarOpen) {
		emit("toggleSidebar");
	}
}
</script>
