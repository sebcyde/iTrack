import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		Portfolio: PortFolioReducer,
	},
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
