<template>
	<main class="px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">Choose a restaurant</h1>

			<form class="w-full mt-8">
				<DropdownList
					class="mb-6"
					:label="'Choose a restaurant'"
					:options="[
						{
							text: 'Restaurant1',
						},
						{
							text: 'Restaurant2',
						},
						{
							text: 'Restaurant3',
						},
					]"
				/>

				<ButtonWide :text="'Continue'" :color="'red'" />
			</form>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import DropdownList from '@/presentations/shared/components/DropdownList.vue';
import ButtonWide from '@/presentations/shared/components/ButtonWide.vue';

export default defineComponent({
	components: {
		DropdownList: DropdownList,
		ButtonWide: ButtonWide,
	},
});
</script>
