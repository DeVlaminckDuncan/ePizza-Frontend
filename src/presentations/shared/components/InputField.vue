<template>
	<div class="relative mb-6">
		<input class="input block border border-dark border-opacity-25 rounded shadow-md px-3 py-2 focus:outline-none w-full" :type="type ? type : 'text'" required />
		<label class="label absolute text-opacity-75 bg-white px-3 py-1 pointer-events-none">{{ label }}</label>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		label: String,
		type: String,
	},
});
</script>
