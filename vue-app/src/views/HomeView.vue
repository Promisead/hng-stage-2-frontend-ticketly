<template>
	<!-- <div
		class="w-full bg-gray-900 text-white py-2 px-4 sm:px-6 lg:px-8 text-sm flex justify-center space-x-6">
		<span class="text-gray-400">Current: VUE</span>
		<a
			href="https://stage-2-frontend-track-hng-devyalch.vercel.app/"
			class="text-blue-400 hover:text-blue-300 transition-colors"
			>Switch to React</a
		>
		<a
			href="https://stage-2-frontend-track-hng-devyalch-gamma.vercel.app/"
			class="text-yellow-400 hover:text-yellow-300 transition-colors"
			>Switch to Twig</a
		>
	</div> -->
	<AppContainer>
		<main class="w-full">
			<Hero />
			<AboutApp />
		</main>
	</AppContainer>
</template>

<script setup>
import AppContainer from "../components/AppContainer.vue";
import Hero from "../components/Hero.vue";
import AboutApp from "../components/AboutApp.vue";
</script>
