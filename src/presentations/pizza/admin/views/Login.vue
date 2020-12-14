<template>
	<NavigationBar text="Login" :backIcon="true" previousPage="/" />

	<main class="px-3 sm:px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Log in to your account</h1>

			<form class="w-full mt-8">
				<InputField v-model="loginData.username" label="Username" />

				<InputField v-model="loginData.password" label="Password" type="password" />

				<InputField v-model="loginData.cardNumber" label="Card Number" />

				<Button @click="submit" text="Log in" color="red" :classes="['w-full', 'px-12', 'py-2', 'text-lg', 'rounded-lg']" />
			</form>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import route from '@/router';

import { post } from '@/utils/api';
import cookie from '@/utils/cookie';
import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';
import InputField from '@/presentations/pizza/shared/components/InputField.vue';
import Button from '@/presentations/pizza/shared/components/Button.vue';

export default defineComponent({
	components: {
		NavigationBar,
		// LoginForm,
		InputField,
		Button,
	},

	setup() {
		const loginData = {
			username: '',
			password: '',
			cardNumber: '',
		};

		const submit = async (event: Event) => {
			event.preventDefault();

			if (loginData.username != '' && loginData.password != '' && loginData.cardNumber != '') {
				const data = {
					UserName: loginData.username,
					Password: loginData.password,
					CardNumber: loginData.cardNumber,
				};

				const tokenData = await post('auth/login', data);
				cookie.save('token', tokenData.token, tokenData.expiration);

				route.push('/admin/menu');
			}
		};

		return {
			loginData,
			submit,
		};
	},
});
</script>
