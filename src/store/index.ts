import { createStore } from 'vuex';

export enum MutationTypes {
	SET_ORDER_TYPE = 'setOrderType',
	SET_LANGUAGE = 'setLanguage',
}

const state = {
	orderType: localStorage.orderType ? JSON.parse(localStorage.orderType) : {},
	language: localStorage.language ? JSON.parse(localStorage.language) : '',
};

export default createStore({
	state: state,

	getters: {
		getOrderType: (state) => () => {
			return state.orderType ? state.orderType : null;
		},

		getLanguage: (state) => () => {
			return state.language ? state.language : null;
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

		[MutationTypes.SET_LANGUAGE](state, language) {
			const data = language;
			localStorage.setItem('language', JSON.stringify(data));
		},
	},
});
