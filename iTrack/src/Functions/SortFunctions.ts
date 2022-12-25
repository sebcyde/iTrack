import { NewsType } from '../Types/NewsTypes';
import { NamedStockChangeType } from '../Types/StockTypes';

// Dashboard Sort Functions

export const NamedAZSort = (Array: NamedStockChangeType[]) => {
	let NewArray = Array.sort((a, b) => a.ticker.localeCompare(b.ticker));

	return NewArray;
};

export const NamedZASort = (Array: NamedStockChangeType[]) => {
	let NewArray = Array.sort((a, b) => b.ticker.localeCompare(a.ticker));

	return NewArray;
};

export const PercentUp = (
	Array: NamedStockChangeType[]
): NamedStockChangeType[] => {
	return Array.sort(
		(a: NamedStockChangeType, b: NamedStockChangeType) => a.dp - b.dp
	);
};

export const PercentDown = (
	Array: NamedStockChangeType[]
): NamedStockChangeType[] => {
	return Array.sort(
		(a: NamedStockChangeType, b: NamedStockChangeType) => b.dp - a.dp
	);
};

// News Sort Functions
export const RecentNewsSort = (Array: NewsType[]): NewsType[] => {
	return Array.sort(
		(a: NewsType, b: NewsType) => b.datetime.valueOf() - a.datetime.valueOf()
	);
};
