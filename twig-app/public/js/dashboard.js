document.addEventListener("DOMContentLoaded", () => {
	console.log("Dashboard JS Loaded");

	const userString = localStorage.getItem("ticketapp_user");
	if (!userString) return;
	const user = JSON.parse(userString);

	const welcomeMsg = document.getElementById("welcome-message");
	if (welcomeMsg && user.name) {
		welcomeMsg.textContent = `Welcome, ${user.name}!`;
	}

	const ticketsString = localStorage.getItem("ticketapp_tickets");
	const allTickets = ticketsString ? JSON.parse(ticketsString) : [];
	const userTickets = allTickets.filter((t) => t && t.userId === user.id);

	const total = userTickets.length;
	const open = userTickets.filter((t) => t.status === "open").length;
	const inProgress = userTickets.filter(
		(t) => t.status === "in_progress"
	).length;
	const closed = userTickets.filter((t) => t.status === "closed").length;
	const stats = { total, open, inProgress, closed };
	console.log("Calculated Stats:", stats);

	const statCardsContainer = document.getElementById("stat-cards");
	if (statCardsContainer) {
		statCardsContainer.innerHTML = `
            ${createStatCard("Total Tickets", stats.total, "blue", "🎫")}
            ${createStatCard("Open Tickets", stats.open, "green", "🔥")}
            ${createStatCard("In Progress", stats.inProgress, "yellow", "✨")}
            ${createStatCard("Tickets Closed", stats.closed, "gray", "✔️")}
        `;
	}

	const breakdownContainer = document.getElementById("status-breakdown");
	if (breakdownContainer) {
		const chartContainer = breakdownContainer.querySelector(".flex");
		if (chartContainer) {
			chartContainer.innerHTML = `
                ${createBar(stats.open, stats.total, "Open", "bg-green-500")}
                ${createBar(
									stats.inProgress,
									stats.total,
									"In Progress",
									"bg-yellow-500"
								)}
                ${createBar(stats.closed, stats.total, "Closed", "bg-gray-500")}
            `;
		}
	}

	const logoutButton = document.getElementById("logout-button");
	if (logoutButton) {
		logoutButton.addEventListener("click", () => {
			console.log("Logout clicked");
			localStorage.removeItem("ticketapp_session");
			localStorage.removeItem("ticketapp_user");
			localStorage.removeItem("ticketapp_tickets");
			Toastify({
				text: "Logged out successfully.",
				duration: 2000,
				gravity: "bottom",
				position: "right",
			}).showToast();
			setTimeout(() => window.location.replace("/auth/login"), 1000); 
		});
	}
});

function createStatCard(title, value, color, iconSymbol = " ") {
	const colorClasses = {
		blue: { border: "border-blue-500", text: "text-blue-500" },
		green: { border: "border-green-500", text: "text-green-500" },
		yellow: { border: "border-yellow-500", text: "text-yellow-500" },
		gray: { border: "border-gray-500", text: "text-gray-500" },
	};
	const currentColors = colorClasses[color] || colorClasses.gray;
	const iconHTML = `<span class="w-8 h-8 flex items-center justify-center text-3xl ${currentColors.text}">${iconSymbol}</span>`;

	return `
        <div class="p-5 bg-white rounded-lg shadow-md border-l-4 ${currentColors.border}">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">${title}</p>
                    <p class="text-3xl font-bold text-ticketly-green">${value}</p>
                </div>
                <div class="flex-shrink-0">
                    ${iconHTML}
                </div>
            </div>
        </div>
    `;
}

function createBar(value, total, label, colorClass) {
	const height = total > 0 ? (value / total) * 100 : 0;
	return `
        <div class="flex-1 flex flex-col items-center">
             <div class="text-lg font-bold text-gray-700">${value}</div>
             <div
                 class="w-3/4 rounded-t-md ${colorClass} transition-all duration-500"
                 style="height: ${height}%;"
                 title="${label}: ${value}"></div>
             <div class="mt-1 text-sm font-medium text-gray-600">${label}</div>
         </div>
    `;
}
