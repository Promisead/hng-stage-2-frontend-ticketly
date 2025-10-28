<template>
	<div
		:class="[
			'bg-white rounded-lg shadow-md flex flex-col',
			'border-l-4',
			currentStatusStyles.border,
		]">
		<div class="p-5 grow">
			<div class="flex justify-between items-start mb-2">
				<h3 class="text-xl font-bold text-ticketly-green pr-2">
					{{ ticket.title }}
				</h3>
				<span
					:class="[
						'px-3 py-1 rounded-full text-xs font-semibold uppercase shrink-0',
						currentStatusStyles.tag,
					]">
					{{ ticket.status.replace("_", " ") }}
				</span>
			</div>

			<p class="text-gray-700 mt-2 text-sm">
				<template v-if="ticket.description">
					{{ ticket.description }}
				</template>
				<span v-else class="italic text-gray-500">
					No description provided.
				</span>
			</p>
		</div>

		<div
			class="p-5 bg-gray-50 rounded-b-lg border-t border-gray-100 flex justify-between items-center">
			<div class="flex items-center space-x-4">
				<span
					v-if="ticket.priority"
					:class="[
						'flex items-center px-3 py-1 rounded-full text-xs font-semibold',
						currentPriorityStyles,
					]">
					<v-icon name="hi-exclamation-circle" class="w-4 h-4 mr-1" />
					{{ ticket.priority }}
				</span>

				<div class="flex items-center text-sm text-gray-600">
					<v-icon name="hi-calendar" class="w-4 h-4 mr-1.5" />
					<span>{{ formattedDate }}</span>
				</div>
			</div>

			<div class="flex space-x-2">
				<button
					@click="$emit('edit', ticket)"
					class="p-2 text-gray-500 rounded-full hover:bg-gray-200 hover:text-ticketly-orange transition-colors"
					aria-label="Edit ticket">
					<v-icon name="hi-pencil" class="w-5 h-5" />
				</button>
				<button
					@click="$emit('delete', ticket.id)"
					class="p-2 text-gray-500 rounded-full hover:bg-gray-200 hover:text-red-600 transition-colors"
					aria-label="Delete ticket">
					<v-icon name="hi-trash" class="w-5 h-5" />
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	ticket: {
		type: Object,
		required: true,
	},
});
const emit = defineEmits(["edit", "delete"]);

const statusStyles = {
	open: { tag: "bg-green-100 text-green-800", border: "border-green-500" },
	in_progress: {
		tag: "bg-yellow-100 text-yellow-800",
		border: "border-yellow-500",
	},
	closed: { tag: "bg-gray-100 text-gray-800", border: "border-gray-500" },
};
const priorityStyles = {
	high: "bg-red-100 text-red-800",
	medium: "bg-blue-100 text-blue-800",
	low: "bg-gray-100 text-gray-800",
};

const currentStatusStyles = computed(() => {
	return statusStyles[props.ticket.status] || statusStyles.closed;
});

const currentPriorityStyles = computed(() => {
	return priorityStyles[props.ticket.priority] || priorityStyles.low;
});

const formattedDate = computed(() => {
	try {
		return new Date(props.ticket.createdAt).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	} catch (e) {
		console.error(
			"Invalid date format for ticket:",
			props.ticket.id,
			props.ticket.createdAt
		);
		return "Invalid Date";
	}
});
</script>
