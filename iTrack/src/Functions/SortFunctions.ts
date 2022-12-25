import { NamedStockChangeType } from '../Types/StockTypes';

export const NamedAZSort = (Array: NamedStockChangeType[]) => {
	let NewArray = Array.sort((a, b) => a.ticker.localeCompare(b.ticker));

	return NewArray;
};

export const NamedZASort = (Array: NamedStockChangeType[]) => {
	let NewArray = Array.sort((a, b) => b.ticker.localeCompare(a.ticker));

	return NewArray;
};

export const PercentUp = (Array: NamedStockChangeType[]) => {
	function compare(a: NamedStockChangeType, b: NamedStockChangeType) {
		if (a.dp < b.dp) {
			return -1;
		}
		if (a.dp > b.dp) {
			return 1;
		}
		return 0;
	}
	let NewArray = Array.sort(compare);

	return NewArray;
};

export const PercentDown = (Array: NamedStockChangeType[]) => {
	function compare(a: NamedStockChangeType, b: NamedStockChangeType) {
		if (b.dp < a.dp) {
			return -1;
		}
		if (b.dp > a.dp) {
			return 1;
		}
		return 0;
	}
	let NewArray = Array.sort(compare);
	return NewArray;
};
