import { createStore } from 'vuex';

export enum MutationTypes {
	SET_ORDER_TYPE = 'setOrderType',
}

const state = {
	orderType: localStorage.orderType ? JSON.parse(localStorage.orderType) : {},
};

export default createStore({
	state: state,

	getters: {
		getOrderType: (state) => () => {
			return state.orderType ? state.orderType : null;
		},
	},

	mutations: {
		[MutationTypes.SET_ORDER_TYPE](state, { orderType, orderTypeData }) {
			const data = {
				orderType: orderType,
				data: orderTypeData,
			};
			localStorage.setItem('orderType', JSON.stringify(data));
		},
	},
});
