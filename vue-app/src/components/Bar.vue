<template>
	<div class="flex-1 flex flex-col items-center">
		<div class="text-lg font-bold text-gray-700">{{ value }}</div>
		<div
			:class="['w-3/4 rounded-t-md transition-all duration-500', color]"
			:style="{ height: `${height}%` }"
			:title="`${label}: ${value}`"></div>
		<div class="mt-1 text-sm font-medium text-gray-600">{{ label }}</div>
	</div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	value: { type: Number, required: true },
	total: { type: Number, required: true },
	label: { type: String, required: true },
	color: { type: String, required: true }, 
});

const height = computed(() => {
	return props.total > 0 ? (props.value / props.total) * 100 : 0;
});
</script>
