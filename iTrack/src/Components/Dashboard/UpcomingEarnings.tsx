import axios from 'axios';
import { doc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { auth, app } from '../../Config/firebase';
import { FHKEY } from '../../Config/Keys';
import { NamedAZSort } from '../../Functions/SortFunctions';
import { NamedStockChangeType, StockDetailsType } from '../../Types/StockTypes';

type Props = {};

const UpcomingEarnings = (props: Props) => {
	const [RetrievedStocks, setRetrievedStocks] =
		useState<NamedStockChangeType[]>();
	const [user, loading, error] = useAuthState(auth);
	const [UserPortfolio, loading2, error2] = useDocument(
		doc(getFirestore(app), `Users/${user?.uid}/StockLists/AllLists`),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);
	const [SortingList, setSortingList] = useState(false);
	const [Loading, setLoading] = useState(true);
	let NewStocks: any[] = [];

	const PullData = async () => {
		await Promise.all(
			UserPortfolio?.data()?.Portfolio.map(async (Stock: StockDetailsType) => {
				const Data = await axios.get(
					`https://finnhub.io/api/v1/calendar/earnings?from=2022-10-10&to=2023-10-10&symbol=${Stock['01. symbol']}&token=${FHKEY}`
				);
				NewStocks.push({ ...Data.data, ticker: Stock['01. symbol'] });
			})
		);
		setRetrievedStocks(NamedAZSort(NewStocks));
		setLoading(false);
	};

	useEffect(() => {
		PullData();
	}, [UserPortfolio]);

	return (
		<div className="DashboardComponent">
			<h2 className="DashboardComponentTitle">Portfolio Snapshot</h2>
		</div>
	);
};

export default UpcomingEarnings;

// https://finnhub.io/api/v1/calendar/earnings?from=2022-10-10&to=2023-10-10&symbol=AAPL&token=ce8c86iad3i1ljtnrrggce8c86iad3i1ljtnrrh0
