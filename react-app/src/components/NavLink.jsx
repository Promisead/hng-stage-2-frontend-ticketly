import { Link } from "react-router-dom";

export default function NavLink({
	icon,
	text,
	to,
	isSidebarOpen,
	onToggleSidebar,
}) {
	return (
		<Link
			to={to}
			onClick={isSidebarOpen && onToggleSidebar}
			className={`
        flex items-center p-3 rounded-lg text-gray-300
        hover:bg-green-800 hover:text-white
        ${isSidebarOpen ? "justify-start" : "justify-center"}
      `}>
			{icon}
			<span
				className={`
          ml-4 font-medium transition-opacity
          ${isSidebarOpen ? "opacity-100" : "opacity-0 absolute"}
        `}>
				{text}
			</span>
		</Link>
	);
}
