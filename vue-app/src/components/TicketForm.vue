<template>
	<div class="bg-white p-6 rounded-lg shadow-md mb-6">
		<h2 class="text-2xl font-bold text-ticketly-green mb-4">
			{{ isEditMode ? "Edit Ticket" : "Create New Ticket" }}
		</h2>
		<form @submit="onSubmit" class="space-y-4">
			<div>
				<label for="title" class="block text-sm font-medium text-gray-700">
					Title <span class="text-red-500">*</span>
				</label>
				<input
					v-model="titleValue"
					@blur="titleBlur"
					id="title"
					type="text"
					:class="[
						'w-full mt-1 border rounded-md shadow-sm p-2',
						'focus:outline-none focus:ring-ticketly-orange focus:border-ticketly-orange',
						titleMeta.touched && titleError
							? 'border-red-500'
							: 'border-gray-300',
					]" />
				<p v-if="titleError" class="mt-1 text-xs text-red-500">
					{{ titleError }}
				</p>
			</div>

			<div>
				<label for="status" class="block text-sm font-medium text-gray-700">
					Status <span class="text-red-500">*</span>
				</label>
				<select
					v-model="statusValue"
					@blur="statusBlur"
					id="status"
					:class="[
						'w-full mt-1 border rounded-md shadow-sm p-2 bg-white',
						'focus:outline-none focus:ring-ticketly-orange focus:border-ticketly-orange',
						statusMeta.touched && statusError
							? 'border-red-500'
							: 'border-gray-300',
					]">
					<option value="open">Open</option>
					<option value="in_progress">In Progress</option>
					<option value="closed">Closed</option>
				</select>
				<p v-if="statusError" class="mt-1 text-xs text-red-500">
					{{ statusError }}
				</p>
			</div>

			<div>
				<label for="priority" class="block text-sm font-medium text-gray-700">
					Priority
				</label>
				<select
					v-model="priorityValue"
					id="priority"
					class="w-full mt-1 border rounded-md shadow-sm p-2 bg-white focus:outline-none focus:ring-ticketly-orange focus:border-ticketly-orange">
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select>
			</div>

			<div>
				<label
					for="description"
					class="block text-sm font-medium text-gray-700">
					Description
				</label>
				<textarea
					v-model="descriptionValue"
					id="description"
					rows="4"
					class="w-full mt-1 border rounded-md shadow-sm p-2 focus:outline-none focus:ring-ticketly-orange focus:border-ticketly-orange"></textarea>
			</div>

			<div class="flex justify-end space-x-3">
				<button
					type="button"
					@click="$emit('close')"
					class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 font-medium">
					Cancel
				</button>
				<button
					type="submit"
					class="px-4 py-2 text-white bg-ticketly-orange rounded-md hover:bg-opacity-80 font-medium">
					{{ isEditMode ? "Update" : "Create" }}
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useTicketsStore } from "@/stores/ticketsStore";
import { useToast } from "vue-toastification";
import { useField, useForm } from "vee-validate";

const props = defineProps({
	editingTicket: { type: Object, default: null },
});
const emit = defineEmits(["close"]);

const ticketsStore = useTicketsStore();
const toast = useToast();

const isEditMode = computed(() => !!props.editingTicket);

const validateTitle = (value) => {
	if (!value || !String(value).trim()) return "Title is mandatory";
	if (String(value).trim().length < 3)
		return "Title must be at least 3 characters";
	return true;
};
const validateStatus = (value) => {
	if (!value) return "Status is mandatory";
	if (!["open", "in_progress", "closed"].includes(value))
		return "Invalid status";
	return true;
};

const { handleSubmit, resetForm, setValues, errors } = useForm({
	initialValues: {
		title: props.editingTicket?.title || "",
		description: props.editingTicket?.description || "",
		status: props.editingTicket?.status || "open",
		priority: props.editingTicket?.priority || "low",
	},
});

const {
	value: titleValue,
	errorMessage: titleError,
	meta: titleMeta,
	handleBlur: titleBlur,
} = useField("title", validateTitle);
const {
	value: statusValue,
	errorMessage: statusError,
	meta: statusMeta,
	handleBlur: statusBlur,
} = useField("status", validateStatus);
const { value: priorityValue } = useField("priority");
const { value: descriptionValue } = useField("description");

watch(
	() => props.editingTicket,
	(newTicket) => {
		const initial = newTicket
			? {
					title: newTicket.title,
					description: newTicket.description || "",
					status: newTicket.status,
					priority: newTicket.priority || "low",
			  }
			: { title: "", description: "", status: "open", priority: "low" };
		resetForm({ values: initial });
	},
	{ immediate: true }
);

const onSubmit = handleSubmit(async (values) => {
	if (titleError.value || statusError.value) {
		console.error("onSubmit blocked by validation errors (manual check):", {
			title: titleError.value,
			status: statusError.value,
		});
		toast.error("Please fix the errors in the form.");
		titleMeta.touched = true;
		statusMeta.touched = true;
		return;
	}

	let result;
	try {
		if (isEditMode.value) {
			result = ticketsStore.updateTicket(props.editingTicket.id, values);
			if (result && result.success) {
				toast.success("Ticket updated successfully!");
			} else {
				toast.error(
					`Error updating ticket: ${result?.error || "Unknown error"}`
				);
			}
		} else {
			result = ticketsStore.createTicket(values);
			if (result && result.success) {
				toast.success("Ticket created successfully!");
			} else {
				toast.error(
					`Error creating ticket: ${result?.error || "Unknown error"}`
				);
			}
		}

		if (result && result.success) {
			resetForm();
			emit("close");
		}
	} catch (err) {
		console.error("Unexpected error during form submission:", err);
		toast.error("An unexpected error occurred.");
	}
});
</script>
