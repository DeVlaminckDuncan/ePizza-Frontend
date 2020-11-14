import Review from './Review';

export default interface Pizza {
	id: string;
	name: string;
	price: number;
	imgUrl: string;
	toppings: Array<string>;
	reviews: Array<Review>;

	pizzaUrl?: string;
	size?: string;
	amount?: number;
}
