import { HiMenu, HiOutlineHome, HiOutlineTicket, HiX } from "react-icons/hi";
import NavLink from "./NavLink";

export default function Sidebar({ onToggleSidebar, isSidebarOpen }) {
	return (
		<div
			className={`
shrink-0 bg-[#0f172a] text-white flex flex-col
        transition-all duration-300 ease-in-out
        ${isSidebarOpen ? "w-60" : "w-20"}
      `}>
			<button
				onClick={onToggleSidebar}
				className="text-gray-600 hover:text-rose-500 focus:outline-none m-[1rem_auto] w-fit"
				aria-label="Toggle sidebar ">
				{isSidebarOpen ? <HiX size={28} /> : <HiMenu size={28} />}
			</button>

			<nav className="flex-1 overflow-y-auto p-4 space-y-2">
				<NavLink
					icon={<HiOutlineHome size={24} />}
					text="Dashboard"
					to="/dashboard"
					isSidebarOpen={isSidebarOpen}
					onToggleSidebar={onToggleSidebar}
				/>
				<NavLink
					icon={<HiOutlineTicket size={24} />}
					text="Tickets"
					to="/tickets"
					isSidebarOpen={isSidebarOpen}
					onToggleSidebar={onToggleSidebar}
				/>
			</nav>
		</div>
	);
}
