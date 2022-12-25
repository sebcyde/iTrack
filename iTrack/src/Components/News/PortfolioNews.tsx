import { doc, getFirestore } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { app, auth } from '../../Config/firebase';

type Props = {};

const PortfolioNews = (props: Props) => {
	const [user, loading, error] = useAuthState(auth);
	const [UserPortfolio, loading2, error2] = useDocument(
		doc(getFirestore(app), `Users/${user?.uid}/StockLists/AllLists`),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	useEffect(() => {
		// if (UserPortfolio?.data()?.Portfolio.length > 0) {
		// 	console.log('testing port data pull');
		// }
		console.log('testing port data pull');
	}, [UserPortfolio]);

	return <div>PortfolioNews</div>;
};

export default PortfolioNews;
