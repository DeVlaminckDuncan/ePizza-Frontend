import { createStore } from 'vuex';

import Pizza from '@/models/Pizza';

export type PizzasState = {
	[pizzas: string]: Array<Pizza>;
};

export type OrderTypeState = {
	[orderType: string]: string;
};

export enum MutationTypes {
	ADD_PIZZA = 'addPizza',
	SET_ORDER_TYPE = 'setOrderType',
}

export type PizzaMutations<S = PizzasState> = {
	[MutationTypes.ADD_PIZZA](state: S, payload: Pizza): void;
};

export type OrderTypeMutations<S = OrderTypeState> = {
	[MutationTypes.SET_ORDER_TYPE](state: S, payload: string): void;
};

const state = {
	pizzas: localStorage.pizzas ? JSON.parse(localStorage.pizzas) : [],
	orderType: localStorage.orderType ? JSON.parse(localStorage.orderType) : '',
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

		[MutationTypes.SET_ORDER_TYPE](state, { orderType, orderTypeData }) {
			const data = {
				orderType: orderType,
				data: orderTypeData,
			};
			localStorage.setItem('orderType', JSON.stringify(data));
		},
	},
});
