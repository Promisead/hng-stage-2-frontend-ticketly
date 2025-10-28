import { HiLogout, HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../contexts/AuthProvider";

export default function Header() {
	const { logout, user } = useAuth();

	const { name } = user;
	console.log("Hey", name);
	return (
		<header className="h-16 bg-white shadow-md flex items-center justify-between px-6 shrink-0">
			<div className="flex items-center">
				<span className="hidden sm:inline mr-3 font-medium text-gray-700">
					Welcome, {name}
				</span>
				<div className="w-10 h-10 bg-[#0891b2] rounded-full flex items-center justify-center text-white font-bold">
					U
				</div>
			</div>
			<button
				onClick={logout}
				className="flex items-center gap-1 rounded-sm hover:bg-slate-300/30 px-4 py-2">
				<span>
					<HiLogout />
				</span>
				Logout
			</button>
		</header>
	);
}
