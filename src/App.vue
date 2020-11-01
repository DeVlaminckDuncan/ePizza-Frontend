<template>
	<router-view />
</template>

<style lang="scss">
#app {
	font-family: Lato, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #101010;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #101010;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
