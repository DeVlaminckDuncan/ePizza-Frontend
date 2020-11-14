import { createStore } from 'vuex';

import Pizza from '@/models/Pizza';

export type State = {
	[pizzas: string]: Array<Pizza>;
};

export enum MutationTypes {
	ADD_PIZZA = 'addPizza',
}

export type Mutations<S = State> = {
	[MutationTypes.ADD_PIZZA](state: S, payload: Pizza): void;
};

const state: State = {
	pizzas: localStorage.pizzas ? JSON.parse(localStorage.pizzas) : [],
};

export default createStore({
	state: state,

	getters: {
		getPizzas: (state) => () => {
			return state.pizzas;
		},
	},

	mutations: {
		[MutationTypes.ADD_PIZZA](state, pizza) {
			const pizzas = state.pizzas;
			pizzas.push(pizza);
			localStorage.setItem('pizzas', JSON.stringify(pizzas));
		},
	},
});
