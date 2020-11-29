export const makePricePrettier = (price: any): string => `€ ${(price ? price : 0).toFixed(2)}`;

export const sizeMultiplier = (price: number, size: string = 'medium'): number => {
	enum sizes {
		small = 0.8,
		medium = 1,
		large = 1.2,
	}

	// @ts-ignore
	return price * sizes[size.toLowerCase()];
};
