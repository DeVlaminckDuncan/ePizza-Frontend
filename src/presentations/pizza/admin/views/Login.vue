<template>
	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Log in to your account</h1>

			<form class="w-full mt-8">
				<InputField :label="'Username'" />

				<InputField :label="'Password'" :type="'password'" />

				<ButtonWide :text="'Log in'" :color="'red'" />
			</form>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import InputField from '@/presentations/pizza/shared/components/InputField.vue';
import ButtonWide from '@/presentations/pizza/shared/components/ButtonWide.vue';

export default defineComponent({
	components: {
		InputField: InputField,
		ButtonWide: ButtonWide,
	},
});
</script>
