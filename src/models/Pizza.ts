import Review from './Review';

export default interface Pizza {
	pizzaId: string;
	name: string;
	price: number;
	imgUrl: string;
	pizzaToppings: Array<string>;
	orderReviews: Array<Review>;

	pizzaUrl: string;
}
