export const makePricePrettier = (price: any): string => `€ ${(price ? price : 0).toFixed(2)}`;
