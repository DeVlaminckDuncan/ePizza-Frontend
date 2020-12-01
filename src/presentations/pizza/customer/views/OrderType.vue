<template>
	<NavigationBar :text="$t('HEADER-TITLE-ORDERTYPE')" />

	<main class="px-3 sm:px-6 py-8 flex justify-center">
		<div class="main">
			<h1 class="font-semibold text-2xl">{{ $t('PAGE-INFO-ORDERTYPE') }}</h1>

			<div class="flex justify-center mt-8">
				<router-link to="/delivery" class="button-lg flex justify-center items-center text-white font-semibold text-xl bg-alpha-yellow h-16 rounded-lg shadow-md">{{ $t('ORDERTYPE-DELIVERY') }}</router-link>
			</div>
			<div class="flex justify-center mt-6">
				<router-link to="/takeaway" class="button-lg flex justify-center items-center text-white font-semibold text-xl bg-alpha-orange h-16 rounded-lg shadow-md">{{ $t('ORDERTYPE-TAKEAWAY') }}</router-link>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import NavigationBar from '@/presentations/pizza/shared/components/NavigationBar.vue';

export default defineComponent({
	components: {
		NavigationBar,
	},
});
</script>
