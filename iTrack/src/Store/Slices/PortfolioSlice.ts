import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialStockState = {
	StockTicker: '',
};

export const StockSlice = createSlice({
	name: 'StockSlice',
	initialState: initialStockState,
	reducers: {
		UpdateStock: (state, action: PayloadAction<string>) => {
			state.StockTicker = action.payload;
		},
	},
});

export const { UpdateStock } = StockSlice.actions;
export default StockSlice.reducer;
