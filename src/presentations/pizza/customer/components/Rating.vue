<template>
	<div class="flex">
		<input class="sr-only custom-rating-input" @change="checkRatingValue($event)" name="rating" id="rating-1" :class="{ 'is-active': ratings.rating1 }" value="1" type="radio" />
		<label class="custom-rating-label text-gray-300 opacity-50" for="rating-1">
			<svg class="custom-rating-symbol" fill="#F7C738" width="32" height="32" viewBox="0 0 24 24">
				<path d="M0 0h24v24H0z" fill="none" />
				<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
			</svg>
		</label>
		<input class="sr-only custom-rating-input" @change="checkRatingValue($event)" name="rating" id="rating-2" :class="{ 'is-active': ratings.rating2 }" value="2" type="radio" />
		<label class="custom-rating-label text-gray-300 opacity-50" for="rating-2">
			<svg class="custom-rating-symbol" fill="#F7C738" width="32" height="32" viewBox="0 0 24 24">
				<path d="M0 0h24v24H0z" fill="none" />
				<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
			</svg>
		</label>
		<input class="sr-only custom-rating-input" @change="checkRatingValue($event)" name="rating" id="rating-3" :class="{ 'is-active': ratings.rating3 }" value="3" type="radio" />
		<label class="custom-rating-label text-gray-300 opacity-50" for="rating-3">
			<svg class="custom-rating-symbol" fill="#F7C738" width="32" height="32" viewBox="0 0 24 24">
				<path d="M0 0h24v24H0z" fill="none" />
				<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
			</svg>
		</label>
		<input class="sr-only custom-rating-input" @change="checkRatingValue($event)" name="rating" id="rating-4" :class="{ 'is-active': ratings.rating4 }" value="4" type="radio" />
		<label class="custom-rating-label text-gray-300 opacity-50" for="rating-4">
			<svg class="custom-rating-symbol" fill="#F7C738" width="32" height="32" viewBox="0 0 24 24">
				<path d="M0 0h24v24H0z" fill="none" />
				<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
			</svg>
		</label>
		<input class="sr-only custom-rating-input" @change="checkRatingValue($event)" name="rating" id="rating-5" :class="{ 'is-active': ratings.rating5 }" value="5" type="radio" />
		<label class="custom-rating-label text-gray-300 opacity-50" for="rating-5">
			<svg class="custom-rating-symbol" fill="#F7C738" width="32" height="32" viewBox="0 0 24 24">
				<path d="M0 0h24v24H0z" fill="none" />
				<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
			</svg>
		</label>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		showSmall: {
			type: Boolean,
			default: false,
		},

		modelValue: {
			type: String,
		},
	},

	setup(props, { emit }) {
		const rating1: boolean = false,
			rating2: boolean = false,
			rating3: boolean = false,
			rating4: boolean = false,
			rating5: boolean = false;

		const ratings: any = {
			rating1,
			rating2,
			rating3,
			rating4,
			rating5,
		};

		const setRatingValue = (rating: number) => {
			for (let i = 0; i < Object.keys(ratings).length; i++) {
				if (rating > i) {
					ratings[`rating${i + 1}`] = true;
				} else {
					ratings[`rating${i + 1}`] = false;
				}
			}
		};

		if (props.modelValue) {
			setRatingValue(+props.modelValue);
		}

		const checkRatingValue = (event: Event) => {
			if (event.target instanceof HTMLInputElement) {
				setRatingValue(+event.target.value);
				emit('update:modelValue', event.target.value);
			}
		};

		return {
			ratings,
			checkRatingValue,
		};
	},
});
</script>

<style lang="scss">
.custom-rating-input {
	&:checked,
	&.is-active {
		& + .custom-rating-label {
			@apply opacity-100;
		}
	}
}
</style>
