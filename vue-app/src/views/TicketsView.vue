<template>
	<div v-if="isLoading" class="p-6 text-center text-gray-500">
		Loading tickets...
	</div>

	<div v-else class="space-y-6">
		<div class="flex justify-between items-center">
			<h1 class="text-3xl font-bold text-ticketly-green">Manage Tickets</h1>
			<button
				@click="isFormVisible ? closeForm() : showCreateForm()"
				:class="[
					'flex items-center px-4 py-2 rounded-md text-white font-medium',
					'shadow-md transition-colors',
					isFormVisible
						? 'bg-gray-700 hover:bg-gray-800'
						: 'bg-ticketly-orange hover:bg-opacity-80',
				]">
				<template v-if="isFormVisible">
					<v-icon name="hi-minus" class="w-5 h-5 mr-1" />
					<span>Hide Form</span>
				</template>
				<template v-else>
					<v-icon name="hi-plus" class="w-5 h-5 mr-1" />
					<span>Create Ticket</span>
				</template>
			</button>
		</div>

		<TicketForm
			v-if="isFormVisible"
			:editing-ticket="editingTicket"
			@close="closeForm" />

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<template v-if="tickets && tickets.length > 0">
				<TicketCard
					v-for="ticket in tickets"
					:key="ticket.id"
					:ticket="ticket"
					@edit="handleEdit"
					@delete="handleDelete" />
			</template>
			<div
				v-else-if="!isLoading && !isFormVisible"
				class="col-span-1 md:col-span-2 lg:col-span-3 p-10 text-center bg-white rounded-lg shadow-md">
				<p class="text-gray-500">
					You have no tickets. Click "Create Ticket" to add one!
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useTicketsStore } from "@/stores/ticketsStore";
import { useToast } from "vue-toastification";
import TicketForm from "@/components/TicketForm.vue";
import TicketCard from "@/components/TicketCard.vue";

const ticketsStore = useTicketsStore();
const { tickets, isLoading } = storeToRefs(ticketsStore);
const toast = useToast();
const isFormVisible = ref(false);
const editingTicket = ref(null);

function handleEdit(ticket) {
	editingTicket.value = ticket;
	isFormVisible.value = true;
}

function handleDelete(ticketId) {
	if (window.confirm("Are you sure you want to delete this ticket?")) {
		const result = ticketsStore.deleteTicket(ticketId);
		if (result.success) {
			toast.success("Ticket deleted");
		} else {
			toast.error(result.error || "Failed to delete ticket");
		}
	}
}

function showCreateForm() {
	editingTicket.value = null;
	isFormVisible.value = true;
}

function closeForm() {
	isFormVisible.value = false;
	editingTicket.value = null;
}
</script>
