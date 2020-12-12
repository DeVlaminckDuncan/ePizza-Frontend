<template>
	<form class="w-full mt-8">
		<InputField @change="changeInputValue($event, 'usernameValue')" label="Username" />

		<InputField @change="changeInputValue($event, 'passwordValue')" label="Password" type="password" />

		<ButtonWide @click="submit" text="Log in" color="red" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import InputField from '@/presentations/pizza/shared/components/InputField.vue';
import ButtonWide from '@/presentations/pizza/shared/components/ButtonWide.vue';

export default defineComponent({
	props: {
		usernameValue: String,
		passwordValue: String,
	},

	components: {
		InputField,
		ButtonWide,
	},

	setup(props, { emit }) {
		const changeInputValue = (event: any, prop: string) => {
			console.log(event.target.value, prop);
			//TODO: the value can't be passed to the parent for some reason
			emit(`update:${prop}`, event.target.value);
		};

		const submit = (event: Event) => {
			event.preventDefault();

			emit('submit');
		};

		return {
			changeInputValue,
			submit,
		};
	},
});
</script>
