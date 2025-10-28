<template>
	<div class="max-w-md p-6 mx-auto my-10 bg-white rounded-lg shadow-xl">
		<h2 class="text-2xl font-bold text-Ticketly-green">Hello from Vue!</h2>

		<p class="my-4 text-gray-700">
			This component is styled with Tailwind v4. We are using our custom theme
			colors.
		</p>

		<p class="mb-4 text-lg">
			You have clicked the button <strong>{{ count }}</strong> times.
		</p>

		<button
			@click="increment"
			class="px-5 py-2 font-medium text-white rounded-md shadow-md bg-Ticketly-orange hover:bg-opacity-80 transition-all">
			Click Me
		</button>
	</div>
</template>

<script setup>
import { ref } from "vue";

const count = ref(0);

function increment() {
	count.value++;
}
</script>

<style scoped></style>
