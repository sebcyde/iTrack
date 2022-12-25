import React, { useEffect, useState } from 'react';
import { RootState } from '../../Store/Store';
import { useSelector } from 'react-redux';
import TopNavbar from '../../Components/TopNavbars/TopNavbar';
import BottomNavbar from '../../Components/BottomNavbar/BottomNavbar';
import LoadingPage from '../Loading/LoadingPage';
import axios from 'axios';
import { APIKEY } from '../../Config/Keys';
import StockTable from '../../Components/Portfolio/StockTable';
import { StockDetailsType } from '../../Types/StockTypes';

type Props = {};

const StockDetails = (props: Props) => {
	const [Loading, setLoading] = useState(true);
	const [StockDeets, setStockDeets] = useState<StockDetailsType>();
	const CurrentStock = useSelector(
		(state: RootState) => state.StockReducer.StockTicker
	);

	const PullData = async () => {
		const Data = await axios.get(
			`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${CurrentStock}&apikey=${APIKEY}`
		);

		console.log('Return Stock Details:', Data.data['Global Quote']);
		setStockDeets(Data.data['Global Quote']);
		setLoading(false);
	};

	useEffect(() => console.log(CurrentStock), [CurrentStock]);

	useEffect(() => {
		PullData();
	}, []);

	return (
		<div>
			{Loading ? (
				<LoadingPage />
			) : (
				<>
					<TopNavbar />
					{StockDeets && <StockTable StockProps={StockDeets} />}
					<BottomNavbar />
				</>
			)}
		</div>
	);
};

export default StockDetails;
