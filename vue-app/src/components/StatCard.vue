<template>
	<div
		:class="['p-5 bg-white rounded-lg shadow-md border-l-4', borderColorClass]">
		<div class="flex items-center justify-between">
			<div>
				<p class="text-sm font-medium text-gray-500 uppercase tracking-wider">
					{{ title }}
				</p>
				<p class="text-3xl font-bold text-ticketly-green">{{ value }}</p>
			</div>
			<div class="flex-shrink-0">
				<slot />
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	title: { type: String, required: true },
	value: { type: [String, Number], required: true },
	color: { type: String, default: "gray" },
});

const borderColorClass = computed(() => {
	const colorMap = {
		blue: "border-blue-500",
		green: "border-green-500",
		yellow: "border-yellow-500", 
		gray: "border-gray-500",
	};
	return colorMap[props.color] || colorMap.gray;
});
</script>
