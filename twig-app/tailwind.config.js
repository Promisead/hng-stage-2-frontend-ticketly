/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./views/**/*.twig", // Scan all Twig files
	],
	theme: {
		extend: {
			colors: {
				"ticketly-orange": "#06b6d4", // Add your custom colors
				"ticketly-green": "#0f172a",
			},
		},
	},
	safelist: [
		// List specific classes or patterns
		"bg-green-100",
		"text-green-800",
		"border-green-500",
		"bg-yellow-100",
		"text-yellow-800",
		"border-yellow-500",
		"bg-gray-100",
		"text-gray-800",
		"border-gray-500",
		"bg-red-100", // For priority
		"text-red-800",
		"bg-blue-100", // For priority
		"text-blue-800",
		// You can also use patterns (regex) if needed
		// { pattern: /bg-(red|green|blue)-(100|500)/ }
	],

	plugins: [],
};
