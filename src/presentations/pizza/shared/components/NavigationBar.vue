<template>
	<header class="sticky top-0 z-10 flex justify-center">
		<div class="nav flex justify-between items-center px-6 py-4 shadow-md bg-alpha-red text-xl text-white">
			<div class="pr-6">
				<div v-if="backIcon && previousPage && previousPage != ''">
					<router-link :to="previousPage">
						<svg fill="#fff" height="24" viewBox="0 0 24 24" width="24">
							<path d="M0 0h24v24H0z" fill="none" />
							<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
						</svg>
					</router-link>
				</div>
				<button v-else-if="backIcon" @click="$router.back()" class="flex">
					<svg fill="#fff" height="24" viewBox="0 0 24 24" width="24">
						<path d="M0 0h24v24H0z" fill="none" />
						<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
					</svg>
				</button>

				<svg v-if="menuIcon" fill="#fff" height="24" viewBox="0 0 24 24" width="24">
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
				</svg>
			</div>

			{{ text }}

			<div class="pl-6">
				<router-link to="/cart">
					<svg v-if="cartIcon" fill="#fff" height="24" viewBox="0 0 24 24" width="24">
						<path d="M0 0h24v24H0z" fill="none" />
						<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
					</svg>
				</router-link>
			</div>
		</div>
	</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		text: String,
		previousPage: String,
		backIcon: Boolean,
		menuIcon: Boolean,
		cartIcon: Boolean,
	},
});
</script>
