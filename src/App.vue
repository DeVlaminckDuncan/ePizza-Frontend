<template>
	<div class="min-h-full mt-0 -mb-16">
		<div class="mb-16">
			<router-view />
		</div>
	</div>

	<FooterComponent />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import FooterComponent from '@/presentations/pizza/shared/components/FooterComponent.vue';

export default defineComponent({
	components: {
		FooterComponent,
	},
});
</script>

<style lang="scss">
$bp-sm: '480px';

html,
body,
#app {
	@apply h-full;
	@apply m-0;
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

.input {
	&:-webkit-autofill,
	&:-webkit-autofill:hover,
	&:-webkit-autofill:focus,
	&:-webkit-autofill:active {
		box-shadow: 0 0 0 30px white inset;
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
