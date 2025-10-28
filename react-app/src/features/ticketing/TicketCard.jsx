import React from "react";
import {
	HiPencil,
	HiTrash,
	HiCalendar,
	HiExclamationCircle,
} from "react-icons/hi";

const statusStyles = {
	open: {
		tag: "bg-green-100 text-green-800",
		border: "border-green-500",
	},
	in_progress: {
		tag: "bg-yellow-100 text-yellow-800",
		border: "border-yellow-500",
	},
	closed: {
		tag: "bg-gray-100 text-gray-800",
		border: "border-gray-500",
	},
};

const priorityStyles = {
	high: "bg-red-100 text-red-800",
	medium: "bg-blue-100 text-blue-800",
	low: "bg-gray-100 text-gray-800",
};

export default function TicketCard({ ticket, onEdit, onDelete }) {
	const { id, title, status, description, priority, createdAt } = ticket;

	const currentStatusStyles = statusStyles[status] || statusStyles.closed;

	const currentPriorityStyles = priorityStyles[priority] || priorityStyles.low;

	const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	return (
		<div
			className={`
        bg-white rounded-lg shadow-md 
        border-l-4 ${currentStatusStyles.border}
        flex flex-col
      `}>
			<div className="p-5 grow">
				<div className="flex justify-between items-start mb-2">
					<h3 className="text-xl font-bold text-green-950 pr-2">{title}</h3>
					<span
						className={`
              px-3 py-1 rounded-full text-xs font-semibold
              uppercase shrink-0 ${currentStatusStyles.tag}
            `}>
						{status.replace("_", " ")}
					</span>
				</div>

				<p className="text-gray-700 mt-2 text-sm">
					{description || (
						<span className="italic text-gray-500">
							No description provided.
						</span>
					)}
				</p>
			</div>

			<div className="p-5 bg-gray-50 rounded-b-lg border-t border-gray-100 flex justify-between items-center">
				<div className="flex items-center space-x-4">
					{priority && (
						<span
							className={`
                flex items-center px-3 py-1 rounded-full 
                text-xs font-semibold ${currentPriorityStyles}
              `}>
							<HiExclamationCircle className="w-4 h-4 mr-1" />
							{priority}
						</span>
					)}

					<div className="flex items-center text-sm text-gray-600">
						<HiCalendar className="w-4 h-4 mr-1.5" />
						<span>{formattedDate}</span>
					</div>
				</div>

				<div className="flex space-x-2">
					<button
						onClick={() => onEdit(ticket)}
						className="p-2 text-gray-500 rounded-full hover:bg-gray-200 hover:text-rose-600 transition-colors"
						aria-label="Edit ticket">
						<HiPencil className="w-5 h-5" />
					</button>
					<button
						onClick={() => onDelete(id)}
						className="p-2 text-gray-500 rounded-full hover:bg-gray-200 hover:text-red-600 transition-colors"
						aria-label="Delete ticket">
						<HiTrash className="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	);
}
