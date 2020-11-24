import Customer from './Customer';

export default interface Review {
	id: string;
	description: string;
	rating: number;
	date: Date;
	customer: Customer;
}
