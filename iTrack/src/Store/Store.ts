import { configureStore } from '@reduxjs/toolkit';
import { StockSlice } from './Slices/PortfolioSlice';

const store = configureStore({
	reducer: {
		StockReducer: StockSlice.reducer,
	},
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
