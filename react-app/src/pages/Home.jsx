import AboutApp from "../components/AboutApp";
import AppContainer from "../components/AppContainer";

import Hero from "../components/Hero";
export default function Home() {
	return (
		<>
			<AppContainer>
				<main className="w-full">
					{/* <div class="w-full bg-gray-900 text-white py-2 px-4 sm:px-6 lg:px-8 text-sm flex justify-center space-x-6">
						<span class="text-gray-400">Current: REACT</span>
						<a
							href="https://stage-2-frontend-track-hng-devyalch-gamma.vercel.app/"
							class="text-blue-400 hover:text-blue-300 transition-colors">
							Switch to Twig
						</a>
						<a
							href="https://stage-2-frontend-track-hng-devyalch-mauve.vercel.app/"
							class="text-green-400 hover:text-green-300 transition-colors">
							Switch to Vue
						</a>
					</div> */}
					<Hero />

					<AboutApp />
				</main>
			</AppContainer>
		</>
	);
}
