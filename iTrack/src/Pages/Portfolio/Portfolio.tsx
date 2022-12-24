import axios, { AxiosResponse } from 'axios';
import { doc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import BottomNavbar from '../../Components/BottomNavbar/BottomNavbar';
import PortfolioPie from '../../Components/Portfolio/PortfolioPie';
import SearchNavbar from '../../Components/TopNavbars/SearchNavbar';
import { app, auth } from '../../Config/firebase';
import { PullPortfolio } from '../../Functions/PullPortfolio';
import LoadingComponent from '../Loading/LoadingComponent';

const Portfolio = () => {
	const [PortData, setPortData] = useState<AxiosResponse<any, any>[]>();
	const [Loading, setLoading] = useState(false);
	const [user, loading, error] = useAuthState(auth);
	const [UserPortfolio, loading2, error2] = useDocument(
		doc(getFirestore(app), `Users/${user?.uid}/StockLists/AllLists`),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const PopulateData = async () => {
		const PortfolioData = await PullPortfolio(UserPortfolio?.data());
		console.log('Portfolio Data:', PortfolioData);
		setPortData(PortfolioData);
	};

	useEffect(() => {
		if (UserPortfolio?.data()) PopulateData().then(() => setLoading(false));
	}, [UserPortfolio]);

	return (
		<div>
			<SearchNavbar />
			{Loading || loading || loading2 ? (
				<LoadingComponent />
			) : (
				<div style={{ height: '300px', width: '100vw' }}>
					<PortfolioPie
						Portfolio={UserPortfolio?.data()?.Portfolio}
						RTPortfolio={PortData}
					/>
				</div>
			)}
			<button onClick={PopulateData}>Pull Data</button>
			<BottomNavbar />
		</div>
	);
};

export default Portfolio;
