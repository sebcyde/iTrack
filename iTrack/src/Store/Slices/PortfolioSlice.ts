import { createSlice } from '@reduxjs/toolkit';

interface StockStateType {
	Stock: {
		'01. symbol': string;
		'02. open': string;
		'03. high': string;
		'04. low': string;
		'05. price': string;
		'06. volume': string;
		'07. latest trading day': string;
		'08. previous close': string;
		'09. change': string;
		'10. change percent': string;
	};
}

const initialStockState: StockStateType[] | [] = [];

export const StockSlice = createSlice({
	name: 'StockSlice',
	initialState: initialStockState,
	reducers: {
		UpdateStock: (state) => {
			console.log('State From Store:', state);
			state = state;
		},
		ResetStock: (state) => {
			state = {};
			console.log('Store State Reset:', state);
		},
	},
});

export const { UpdateStock, ResetStock } = StockSlice.actions;
export default StockSlice.reducer;
