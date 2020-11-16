import { createStore } from 'vuex';

export enum MutationTypes {
	ADD_PIZZA = 'addPizza',
	EDIT_PIZZA = 'editPizza',
	REMOVE_PIZZA = 'removePizza',
	SET_ORDER_TYPE = 'setOrderType',
}

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

		getPizzaByIndex: (state) => (index: number) => {
			return state.pizzas ? state.pizzas[index] : null;
		},
	},

	mutations: {
		[MutationTypes.ADD_PIZZA](state, pizza) {
			state.pizzas.push(pizza);
			localStorage.setItem('pizzas', JSON.stringify(state.pizzas));
		},

		[MutationTypes.EDIT_PIZZA](state, { pizzaIndex, pizza }) {
			state.pizzas[pizzaIndex] = pizza;
			localStorage.setItem('pizzas', JSON.stringify(state.pizzas));
		},

		[MutationTypes.REMOVE_PIZZA](state, pizzaIndex) {
			state.pizzas.some((index: number) => index == pizzaIndex);
			localStorage.setItem('pizzas', JSON.stringify(state.pizzas));
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
