import Review from './Review';
import Topping from './Topping';

export default interface Pizza {
	id: string;
	name: string;
	price: number;
	totalPrice?: number;
	imgUrl: string;
	toppings: Array<Topping>;
	reviews?: Array<Review>;

	pizzaUrl?: any;
	size?: string;
	amount?: number;
}
