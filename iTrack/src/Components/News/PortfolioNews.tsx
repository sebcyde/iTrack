import axios from 'axios';
import { doc, getFirestore } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { app, auth } from '../../Config/firebase';
import { FHKEY } from '../../Config/Keys';

type Props = {};

const PortfolioNews = (props: Props) => {
	const [user, loading, error] = useAuthState(auth);
	const [UserPortfolio, loading2, error2] = useDocument(
		doc(getFirestore(app), `Users/${user?.uid}/StockLists/AllLists`),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const PullData = async () => {
		const Data = await axios.get(
			`https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2021-10-11&to=2022-10-11&token=${FHKEY}`
		);
		console.log('Return News Details:', Data.data);
		// setStockDeets(Data.data['Global Quote']);
		// setLoading(false);
	};

	useEffect(() => {
		if (UserPortfolio?.data()?.Portfolio.length > 0) {
			console.log('testing port data pull');
			PullData();
		}
		console.log('testing port data pull');
		PullData();
	}, [UserPortfolio]);

	return <div>PortfolioNews</div>;
};

export default PortfolioNews;
