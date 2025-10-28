import { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "./AuthProvider";

const DB_KEY = "ticketapp_tickets";

const initialState = {
	tickets: [],
	isLoading: true,
};

function getTickets() {
	const tickets = JSON.parse(localStorage.getItem(DB_KEY));
	return tickets;
}
function saveTickets(data) {
	localStorage.setItem(DB_KEY, JSON.stringify(data));
}

const ticketsReducer = (state, action) => {
	switch (action.type) {
		case "SET_TICKETS":
			return {
				...state,
				tickets: action.payload,
				isLoading: false,
			};

		case "CREATE_TICKET":
			const newTickets_create = [action.payload, ...state.tickets];
			saveTickets(newTickets_create);
			return {
				...state,
				tickets: newTickets_create,
			};
		case "UPDATE_TICKET":
			const newTickets_update = state.tickets.map((t) =>
				t.id === action.payload.id ? action.payload : t
			);
			saveTickets(newTickets_update);
			return {
				...state,
				tickets: newTickets_update,
			};
		case "DELETE_TICKET":
			const newTickets_delete = state.tickets.filter(
				(t) => t.id !== action.payload
			);
			saveTickets(newTickets_delete);
			return {
				...state,
				tickets: newTickets_delete,
			};
		default:
			return state;
	}
};

const TicketsContext = createContext();

export const TicketsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(ticketsReducer, initialState);
	const { user, isAuthenticated } = useAuth();

	useEffect(() => {
		if (isAuthenticated && user) {
			const allTickets = getTickets();
			const userTickets = allTickets
				?.filter((t) => t.userId === user.id)
				.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

			dispatch({ type: "SET_TICKETS", payload: userTickets });
		} else {
			dispatch({ type: "SET_TICKETS", payload: [] });
		}
	}, [isAuthenticated, user]);

	const createTicket = (ticketData) => {
		const newTicket = {
			...ticketData,
			id: `t-${Date.now()}`,
			userId: user.id,
			createdAt: new Date().toISOString(),
		};

		dispatch({ type: "CREATE_TICKET", payload: newTicket });
		return { success: true, data: newTicket };
	};

	const updateTicket = (ticketId, updatedData) => {
		const ticketToUpdate = state.tickets.find((t) => t.id === ticketId);
		if (!ticketToUpdate || ticketToUpdate.userId !== user.id) {
			return { success: false, error: "Ticket not found" };
		}

		const updatedTicket = { ...ticketToUpdate, ...updatedData };
		dispatch({ type: "UPDATE_TICKET", payload: updatedTicket });
		return { success: true, data: updatedTicket };
	};

	const deleteTicket = (ticketId) => {
		const ticketToDelete = state.tickets.find((t) => t.id === ticketId);
		if (!ticketToDelete || ticketToDelete.userId !== user.id) {
			return { success: false, error: "Ticket not found" };
		}

		dispatch({ type: "DELETE_TICKET", payload: ticketId });
		return { success: true, data: ticketToDelete };
	};

	return (
		<TicketsContext.Provider
			value={{
				...state,
				getTickets,
				createTicket,
				updateTicket,
				deleteTicket,
			}}>
			{children}
		</TicketsContext.Provider>
	);
};

export const useTickets = () => {
	const context = useContext(TicketsContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
