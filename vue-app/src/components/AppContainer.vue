<template>
	<div class="m-[0_auto] max-w-[1440px] overflow-hidden">
		<slot />

		<Footer />
	</div>
</template>

<script setup>
import Footer from "./Footer.vue";
</script>
