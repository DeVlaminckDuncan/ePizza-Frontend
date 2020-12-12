<template>
	<router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import route from '@/router';

import cookie from '@/utils/cookie';

export default defineComponent({
	setup() {
		const checkTokenCookie = () => {
			if (cookie.get('token') == '') {
				route.replace('/admin/login');
			} else {
				route.replace('/admin/menu');
			}
		};

		checkTokenCookie();
	},
});
</script>
