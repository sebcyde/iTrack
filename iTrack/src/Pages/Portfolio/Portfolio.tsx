import { Input } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { doc, getFirestore } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import BottomNavbar from '../../Components/BottomNavbar/BottomNavbar';
import PortfolioPie from '../../Components/Portfolio/PortfolioPie';
import SearchNavbar from '../../Components/TopNavbars/SearchNavbar';
import TopNavbar from '../../Components/TopNavbars/TopNavbar';
import { app, auth } from '../../Config/firebase';
import { PullPortfolio } from '../../Functions/PullPortfolio';
import LoadingComponent from '../Loading/LoadingComponent';
import { debounce } from 'lodash';

const Portfolio = () => {
	const [PortData, setPortData] = useState<AxiosResponse<any, any>[]>();
	const [Loading, setLoading] = useState(true);
	const [user, loading, error] = useAuthState(auth);
	const [UserPortfolio, loading2, error2] = useDocument(
		doc(getFirestore(app), `Users/${user?.uid}/StockLists/AllLists`),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);
	const [SearchTerm, setSearchTerm] = useState('');

	const PopulateData = async () => {
		const PortfolioData = await PullPortfolio(user, UserPortfolio?.data());
		// setPortData(PortfolioData);
	};

	// useEffect(() => {
	// 	if (UserPortfolio?.data()) PopulateData().then(() => setLoading(false));
	// }, [UserPortfolio]);
	const InputHandler = (event: any) => {
		setSearchTerm(event.target.value);
		console.log(event.target.value);
	};

	const debouncedHandler = useCallback(debounce(InputHandler, 1000), []);

	return (
		<div>
			{/* <SearchNavbar /> */}
			<TopNavbar />
			<input
				type="text"
				defaultValue={SearchTerm}
				placeholder="Search Tickers"
				onChange={debouncedHandler}
			/>
			{/* {Loading || loading || loading2 ? (
				<LoadingComponent />
			) : (
				<div style={{ height: '300px', width: '100vw' }}>
					<PortfolioPie
						Portfolio={UserPortfolio?.data()?.Portfolio}
						RTPortfolio={PortData}
					/>
				</div>
			)} */}
			<button onClick={PopulateData}>Pull Data</button>
			<BottomNavbar />
		</div>
	);
};

export default Portfolio;
