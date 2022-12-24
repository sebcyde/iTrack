import { Alert } from '@mui/material';
import { doc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { app, auth } from '../../Config/firebase';

type Props = {};

const EmptyPortfolioBanner = (props: Props) => {
	const [Loading, setLoading] = useState(true);
	const [user, loading, error] = useAuthState(auth);
	const [UserPortfolio, loading2, error2] = useDocument(
		doc(getFirestore(app), `Users/${user?.uid}/StockLists/AllLists`),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	useEffect(() => {
		if (!loading && !loading2 && UserPortfolio?.data()?.Portfolio.length < 1) {
			setLoading(false);
		} else {
			console.log('Portfolio Has Data');
		}
	}, [UserPortfolio]);

	return (
		<>
			{Loading ? (
				<></>
			) : (
				<div
					style={{ width: '95%', margin: '15px auto', marginBottom: '-5px' }}
				>
					<Alert severity="info">
						There are currently no Tickers in your portfolio.
					</Alert>
				</div>
			)}
		</>
	);
};

export default EmptyPortfolioBanner;
