import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { useAuthStore } from "./authStore";

const DB_KEY = "ticketapp_tickets";

function getTickets() {
	const dbString = localStorage.getItem(DB_KEY);
	if (!dbString) {
		return null;
	}
	try {
		const parsed = JSON.parse(dbString);
		if (Array.isArray(parsed)) {
			return parsed;
		} else {
			return [];
		}
	} catch (e) {
		console.error(`Error parsing ${DB_KEY}. Returning empty array.`, e);
		return [];
	}
}

function saveTickets(data) {
	if (!Array.isArray(data)) {
		console.error(
			"Attempted to save non-array to tickets localStorage. Aborting.",
			data
		);
		return;
	}
	try {
		localStorage.setItem(DB_KEY, JSON.stringify(data));
	} catch (e) {
		console.error(`Error saving ${DB_KEY}:`, e);
	}
}

export const useTicketsStore = defineStore("tickets", () => {
	const tickets = ref([]);
	const isLoading = ref(true);
	const authStore = useAuthStore();

	function loadAndSetUserTickets() {
		isLoading.value = true;
		try {
			if (authStore.isAuthenticated && authStore.user) {
				const allTickets = getTickets();
				const userTickets = (allTickets || [])
					.filter((t) => t && t.userId === authStore.user.id)
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
				tickets.value = userTickets;
			} else {
				tickets.value = [];
			}
		} catch (error) {
			console.error("Error during loadAndSetUserTickets:", error);
			tickets.value = [];
		} finally {
			isLoading.value = false;
		}
	}

	watch(
		() => authStore.isAuthenticated,
		(isAuth) => {
			loadAndSetUserTickets();
		},
		{ immediate: true }
	);

	function validateTicket(ticketData) {
		if (!ticketData.title || ticketData.title.trim() === "")
			return "Title is mandatory.";
		const validStatus = ["open", "in_progress", "closed"];
		if (!ticketData.status || !validStatus.includes(ticketData.status))
			return "Status must be open, in_progress, or closed.";
		return null;
	}

	function createTicket(ticketData) {
		const error = validateTicket(ticketData);
		if (error) return { success: false, error };
		if (!authStore.isAuthenticated || !authStore.user)
			return { success: false, error: "User not logged in" };

		const newTicket = {
			id: `t-${Date.now()}`,
			userId: authStore.user.id,
			title: ticketData.title.trim(),
			description: ticketData.description?.trim() || "",
			status: ticketData.status,
			priority: ticketData.priority || "low",
			createdAt: new Date().toISOString(),
		};

		const currentStateTickets = tickets.value || [];
		const newStateTickets = [newTicket, ...currentStateTickets];
		saveTickets(newStateTickets);
		tickets.value = newStateTickets;

		return { success: true, data: newTicket };
	}

	function updateTicket(ticketId, updatedData) {
		const error = validateTicket(updatedData);
		if (error) return { success: false, error };
		if (!authStore.isAuthenticated || !authStore.user)
			return { success: false, error: "User not logged in" };

		const ticketIndex = tickets.value.findIndex(
			(t) => t.id === ticketId && t.userId === authStore.user.id
		);
		if (ticketIndex === -1) {
			return { success: false, error: "Ticket not found or unauthorized" };
		}

		const ticketToUpdate = tickets.value[ticketIndex];
		const updatedTicket = {
			...ticketToUpdate,
			...updatedData,
			title: updatedData.title.trim(),
			description:
				updatedData.description?.trim() ?? ticketToUpdate.description,
		};

		const newStateTickets = tickets.value.map((t) =>
			t.id === ticketId ? updatedTicket : t
		);
		saveTickets(newStateTickets);
		tickets.value = newStateTickets;

		return { success: true, data: updatedTicket };
	}

	function deleteTicket(ticketId) {
		if (!authStore.isAuthenticated || !authStore.user)
			return { success: false, error: "User not logged in" };

		const ticketIndex = tickets.value.findIndex(
			(t) => t.id === ticketId && t.userId === authStore.user.id
		);
		if (ticketIndex === -1) {
			return { success: false, error: "Ticket not found or unauthorized" };
		}

		const ticketToDelete = tickets.value[ticketIndex];
		const newStateTickets = tickets.value.filter((t) => t.id !== ticketId);
		saveTickets(newStateTickets);
		tickets.value = newStateTickets;

		return { success: true, data: ticketToDelete };
	}

	return {
		tickets,
		isLoading,
		getTickets,
		loadAndSetUserTickets,
		createTicket,
		updateTicket,
		deleteTicket,
	};
});
