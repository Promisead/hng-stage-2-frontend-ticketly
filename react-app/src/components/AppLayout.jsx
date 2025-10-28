import { useState } from "react";
import Header from "./Header"; // We will create this
import Sidebar from "./Sidebar"; // We will create this
import AppContainer from "./AppContainer";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<AppContainer>
			<div className="flex h-screen overflow-hidden bg-gray-100">
				<Sidebar
					onToggleSidebar={toggleSidebar}
					isSidebarOpen={isSidebarOpen}
				/>

				<div className="flex-1 flex flex-col overflow-hidden">
					<Header
						onToggleSidebar={toggleSidebar}
						isSidebarOpen={isSidebarOpen}
					/>

					<main className="flex-1 overflow-auto p-6 md:p-8">
						<div className="block sm:hidden">
							{!isSidebarOpen && <Outlet />}
						</div>
						<div className="sm:block hidden">
							<Outlet />
						</div>
					</main>
				</div>
			</div>
		</AppContainer>
	);
}
