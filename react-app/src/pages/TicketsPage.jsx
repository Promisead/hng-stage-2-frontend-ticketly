import React, { useState } from "react";
import { useTickets } from "../contexts/TicketsProvider";
import { HiMinus, HiPlus } from "react-icons/hi";
import CreateTicketForm from "../features/ticketing/CreateTicketForm";
import TicketCard from "../features/ticketing/TicketCard";
import { toast } from "react-toastify";

export default function TicketsPage() {
	const { tickets, deleteTicket } = useTickets();
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [editingTicket, setEditingTicket] = useState(null);

	const handleEdit = (ticket) => {
		setEditingTicket(ticket);
		setIsFormVisible(true);
	};
	const handleDelete = (ticketId) => {
		if (window.confirm("Are you sure you want to delete this ticket?")) {
			const result = deleteTicket(ticketId);
			if (result.success) {
				toast.success("Ticket deleted");
			} else {
				toast.error(result.error);
			}
		}
	};

	const showCreateForm = () => {
		setEditingTicket(null);
		setIsFormVisible(true);
	};

	const closeForm = () => {
		setIsFormVisible(false);
		setEditingTicket(null);
	};
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold text-green-950">Manage Tickets</h1>
				<button
					onClick={isFormVisible ? closeForm : showCreateForm}
					className={`
            flex items-center px-4 py-2 rounded-md text-white font-medium
            shadow-md transition-colors
            ${
							isFormVisible
								? "bg-gray-700 hover:bg-gray-800"
								: "bg-[#0891b2] hover:bg-[#0f172a]"
						}
          `}>
					{isFormVisible ? (
						<>
							<HiMinus className="w-5 h-5 mr-1" />
							<span>Hide Form</span>
						</>
					) : (
						<>
							<HiPlus className="w-5 h-5 mr-1" />
							<span>Create Ticket</span>
						</>
					)}
				</button>
			</div>

			{isFormVisible && (
				<CreateTicketForm
					editingTicket={editingTicket}
					onClose={() => setIsFormVisible(false)}
				/>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{tickets.length > 0
					? tickets.map((ticket) => (
							<TicketCard
								key={ticket.id}
								ticket={ticket}
								onEdit={handleEdit}
								onDelete={handleDelete}
							/>
					  ))
					: !isFormVisible && (
							<div className="col-span-3 p-10 text-center bg-white rounded-lg shadow-md">
								<p className="text-gray-500">
									You have no tickets. Click "Create Ticket" to add one!
								</p>
							</div>
					  )}
			</div>
		</div>
	);
}
