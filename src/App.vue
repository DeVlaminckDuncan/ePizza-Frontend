<template>
	<div class="custom-container flex flex-col items-center">
		<div class="min-h-full w-full -mb-16">
			<router-view />
		</div>
		<footer class="flex justify-between items-center bg-alpha-red h-16 px-6">
			<span class="text-white">&copy; {{ new Date().getFullYear() }} ePizza</span>
			<div class="relative">
				<select @change="changeLocale" v-model="selectedLocale" class="select h-8 block border border-dark border-opacity-10 rounded shadow-md px-3 py-1 focus:outline-none w-full">
					<option v-for="l of locales" :key="l" :value="l">{{ languages[l] }}</option>
				</select>
			</div>
		</footer>
	</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

import i18n, { locales, languages, loadMessages } from '@/plugins/i18n';

export default defineComponent({
	setup() {
		const selectedLocale: Ref<string> = ref('en');

		const changeLocale = async () => {
			await loadMessages(selectedLocale.value);
			i18n.global.locale = selectedLocale.value;
		};

		return {
			locales,
			languages,
			selectedLocale,
			changeLocale,
		};
	},
});
</script>

<style lang="scss">
$bp-sm: '480px';

html,
body,
#app,
.custom-container {
	@apply h-full;
}

#app {
	font-family: Lato, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	@apply text-dark;
}

.main,
.nav,
.button-lg,
footer {
	@apply w-full;

	@screen sm {
		width: #{$bp-sm};
	}
}

.button {
	&-md {
		width: 140px;
	}

	&-lg {
		max-width: #{$bp-sm};
	}
}

.price {
	font-size: 22px;
}

.label {
	left: 4px;
	top: 6px;
	transition: 0.2s ease all;
	-moz-transition: 0.2s ease all;
	-webkit-transition: 0.2s ease all;

	.input:focus ~ &,
	.input:valid ~ & {
		padding: 2px 12px;
		top: -16px;
		font-size: 14px;
	}
}

.select {
	min-width: 8rem;
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAh0lEQVQ4T93TMQrCUAzG8V9x8QziiYSuXdzFC7h4AcELOPQAdXYovZCHEATlgQV5GFTe1ozJlz/kS1IpjKqw3wQBVyy++JI0y1GTe7DCBbMAckeNIQKk/BanALBB+16LtnDELoMcsM/BESDlz2heDR3WePwKSLo5eoxz3z6NNcFD+vu3ij14Aqz/DxGbKB7CAAAAAElFTkSuQmCC) no-repeat right white;
	background-position-x: 95%;
	-webkit-appearance: none;

	&-md {
		width: 140px;
	}

	&:focus ~ .label,
	&:valid ~ .label {
		padding: 2px 12px;
		top: -16px;
		font-size: 14px;
	}
}

hr {
	@apply w-full;
	@apply border-dark;
	@apply border-opacity-25;
}
</style>
