import Customer from './Customer';
import Pizza from './Pizza';

export default interface Order {
	id: string;
	date: Date;
	orderType: string;
	location: string;
	pizzas: Array<Pizza>;
	customer: Customer;
	total: number;
}
