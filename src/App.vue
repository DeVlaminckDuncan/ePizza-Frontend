<template>
	<router-view />
</template>

<style lang="scss">
$bp-sm: '480px';

#app {
	font-family: Lato, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	@apply text-dark;
}

.main,
.nav,
.button-lg {
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
</style>
