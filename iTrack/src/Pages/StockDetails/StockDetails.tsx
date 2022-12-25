import React, { useEffect } from 'react';
import { RootState } from '../../Store/Store';
import { useSelector } from 'react-redux';

type Props = {};

const StockDetails = (props: Props) => {
	const CurrentStock = useSelector(
		(state: RootState) => state.StockReducer.StockTicker
	);

	useEffect(() => console.log(CurrentStock), [CurrentStock]);

	return <div>StockDetails</div>;
};

export default StockDetails;
