export default function Footer() {
	return (
		<footer className="w-full bg-[#0f172a] text-gray-50 border-t border-[#1e293b]">
			<div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<p className="text-sm">
						&copy; {new Date().getFullYear()}{" "}
						<span className="text-[#06b6d4] font-semibold">Ticketly</span>. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
