<template>
	<router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import route from '@/router';

import cookie from '@/utils/cookie';

export default defineComponent({
	setup() {
		const checkTokenCookie = () => {
			if (cookie.get('token') == '') {
				route.replace('/admin/login');
			} else {
				const path = ref(route.currentRoute.value.path).value as string;

				route.replace(path != '/admin' ? path : '/admin/menu');
			}
		};

		checkTokenCookie();
	},
});
</script>
