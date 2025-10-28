import React, { useMemo } from "react";
import {
	HiOutlineTicket,
	HiOutlineFire,
	HiOutlineSparkles,
	HiOutlineCheckCircle,
	HiPlus,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useTickets } from "../contexts/TicketsProvider";

export default function Dashboard() {
	const { tickets, isLoading } = useTickets();
	const { user } = useAuth(); 


	const stats = useMemo(() => {
		const total = tickets?.length;
		const open = tickets?.filter((t) => t.status === "open").length;
		const inProgress = tickets?.filter(
			(t) => t.status === "in_progress"
		).length;
		const closed = tickets?.filter((t) => t.status === "closed").length;
		return { total, open, inProgress, closed };
	}, [tickets]);

	if (isLoading) {
		return <div>Loading dashboard...</div>;
	}

	return (
		<div className="space-y-8">
			{/* Page Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="sm:text-3xl text-[1.2rem] font-bold text-[#0f172a]">
						Welcome, {user?.name || "User"}!
					</h1>
					<p className="mt-1 text-gray-600">
						Here's a summary of your tickets.
					</p>
				</div>
				<Link
					to="/tickets/new" // Assuming you'll have a route for creating new tickets
					to="/tickets" // Assuming you'll have a route for creating new tickets
					className="px-5 py-2 font-medium text-white bg-[#0f172a] rounded-lg shadow-md hover:bg-[#0891b2] transition-colors">
					<span className="sm:inline hidden">Create New Ticket</span>
					<span className="sm:hidden inline">
						<HiPlus />
					</span>
				</Link>
			</div>

			{/* 2. Alternative 1: Stat Cards (Recommended) */}
			{/* This is the cleanest way without libraries. */}
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{/* Total Tickets Card */}
				<StatCard
					title="Total Tickets"
					value={stats.total}
					icon={<HiOutlineTicket className="w-8 h-8 text-blue-500" />}
					color="blue"
				/>

				{/* Open Tickets Card (Green) */}
				<StatCard
					title="Open Tickets"
					value={stats.open}
					icon={<HiOutlineFire className="w-8 h-8 text-green-500" />}
					color="green"
				/>

				{/* In Progress Tickets Card (Amber/Orange) */}
				<StatCard
					title="In Progress"
					value={stats.inProgress}
					icon={<HiOutlineSparkles className="w-8 h-8 text-[#0891b2]" />}
					color="yellow"
				/>

				{/* Closed Tickets Card (Gray) */}
				<StatCard
					title="Tickets Closed"
					value={stats.closed}
					icon={<HiOutlineCheckCircle className="w-8 h-8 text-gray-500" />}
					color="gray"
				/>
			</div>

			{/* 3. Alternative 2: Simple Bar Chart (CSS-only) */}
			<div className="p-6 bg-white rounded-lg shadow">
				<h2 className="text-xl font-semibold text-green-950 mb-4">
					Status Breakdown
				</h2>
				<div className="flex items-end h-40 space-x-4">
					<Bar
						value={stats.open}
						total={stats.total}
						label="Open"
						color="bg-green-500"
					/>
					<Bar
						value={stats.inProgress}
						total={stats.total}
						label="In Progress"
						color="bg-yellow-500"
					/>
					<Bar
						value={stats.closed}
						total={stats.total}
						label="Closed"
						color="bg-gray-500"
					/>
				</div>
			</div>
		</div>
	);
}

// --- Helper Components ---

// Reusable component for the Stat Cards
function StatCard({ title, value, icon, color }) {
	// Define border colors based on prop
	const colorClasses = {
		blue: "border-blue-500",
		green: "border-green-500",
		yellow: "border-yellow-500",
		gray: "border-gray-500",
	};

	return (
		<div
			className={`p-5 bg-white rounded-lg shadow-md border-l-4 ${
				colorClasses[color] || "border-gray-500"
			}`}>
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
						{title}
					</p>
					<p className="text-3xl font-bold text-green-950">{value}</p>
				</div>
				<div className="flex-shrink-0">{icon}</div>
			</div>
		</div>
	);
}

// Reusable component for the CSS bar chart
function Bar({ value, total, label, color }) {
	// Calculate height percentage. Default to 0 if total is 0.
	const height = total > 0 ? (value / total) * 100 : 0;

	return (
		<div className="flex-1 flex flex-col items-center">
			<div className="text-lg font-bold text-gray-700">{value}</div>
			<div
				className={`w-3/4 rounded-t-md ${color} transition-all duration-500`}
				style={{ height: `${height}%` }}
				title={`${label}: ${value}`}></div>
			<div className="mt-1 text-sm font-medium text-gray-600">{label}</div>
		</div>
	);
}
