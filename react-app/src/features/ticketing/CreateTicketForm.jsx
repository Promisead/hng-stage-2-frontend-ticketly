// src/components/TicketForm.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTickets } from "../../contexts/TicketsProvider";

export default function TicketForm({ onClose, editingTicket }) {
	const { createTicket, updateTicket } = useTickets();

	const isEditMode = Boolean(editingTicket);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: editingTicket?.title || "",
			description: editingTicket?.description || "",
			status: editingTicket?.status || "open",
			priority: editingTicket?.priority || "low",
		},
	});

	useEffect(() => {
		if (isEditMode) {
			reset(editingTicket);
		}
	}, [editingTicket, isEditMode, reset]);

	const onSubmit = (data) => {
		let result;
		if (isEditMode) {
			result = updateTicket(editingTicket.id, data);
			if (result.success) {
				toast.success("Ticket updated successfully!");
			} else {
				toast.error(`Error: ${result.error}`);
			}
		} else {
			result = createTicket(data);
			if (result.success) {
				toast.success("Ticket created successfully!");
			} else {
				toast.error(`Error: ${result.error}`);
			}
		}

		if (result.success) {
			reset();
			onClose();
		}
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md mb-6">
			<h2 className="text-2xl font-bold text-green-950 mb-4">
				{isEditMode ? "Edit Ticket" : "Create New Ticket"}
			</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<label
						htmlFor="title"
						className="block text-sm font-medium text-gray-700">
						Title <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						id="title"
						{...register("title", { required: "Title is mandatory" })}
						className={`w-full mt-1 border rounded-md shadow-sm p-2 
                        focus:outline-none focus:ring-[#0891b2] focus:border-[#0891b2]
                        ${errors.title ? "border-red-500" : "border-gray-300"}`}
					/>
					{errors.title && (
						<p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
					)}
				</div>

				<div>
					<label
						htmlFor="status"
						className="block text-sm font-medium text-gray-700">
						Status <span className="text-red-500">*</span>
					</label>
					<select
						id="status"
						{...register("status", { required: "Status is mandatory" })}
						className={`w-full mt-1 border rounded-md shadow-sm p-2 
                        bg-white focus:outline-none focus:ring-[#0891b2] focus:border-[#0891b2]
                        ${
													errors.status ? "border-red-500" : "border-gray-300"
												}`}>
						<option value="open">Open</option>
						<option value="in_progress">In Progress</option>
						<option value="closed">Closed</option>
					</select>
					{errors.status && (
						<p className="mt-1 text-xs text-red-500">{errors.status.message}</p>
					)}
				</div>

				<div>
					<label
						htmlFor="priority"
						className="block text-sm font-medium text-gray-700">
						Priority
					</label>
					<select
						id="priority"
						{...register("priority")}
						className="w-full mt-1 border rounded-md shadow-sm p-2 
                        bg-white focus:outline-none focus:ring-[#0891b2] focus:border-[#0891b2]">
						<option value="low">Low</option>
						<option value="medium">Medium</option>
						<option value="high">High</option>
					</select>
				</div>

				<div>
					<label
						htmlFor="description"
						className="block text-sm font-medium text-gray-700">
						Description
					</label>
					<textarea
						id="description"
						rows="4"
						{...register("description")}
						className="w-full mt-1 border rounded-md shadow-sm p-2 
                        focus:outline-none focus:ring-[#0891b2] focus:border-[#0891b2]"></textarea>
				</div>

				<div className="flex justify-end space-x-3">
					<button
						type="button"
						onClick={onClose}
						className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 font-medium">
						Cancel
					</button>
					<button
						type="submit"
						className="px-4 py-2 text-white bg-[#0891b2] rounded-md hover:bg-[#0f172a] font-medium">
						{isEditMode ? "Update" : "Create"}
					</button>
				</div>
			</form>
		</div>
	);
}
