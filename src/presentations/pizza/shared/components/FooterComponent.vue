<template>
	<div class="flex justify-center">
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
