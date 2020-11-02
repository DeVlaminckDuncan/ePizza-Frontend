<template>
	<router-view />
</template>

<style lang="scss">
#app {
	font-family: Lato, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	@apply text-dark;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		@apply text-dark;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
