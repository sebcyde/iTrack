import axios from 'axios';
import { doc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import BottomNavbar from '../../Components/BottomNavbar/BottomNavbar';
import PortfolioPie from '../../Components/Portfolio/PortfolioPie';
import SearchNavbar from '../../Components/TopNavbars/SearchNavbar';
import { app, auth } from '../../Config/firebase';
import LoadingPage from '../Loading/LoadingPage';
import Loading from '../Loading/LoadingPage';

const Portfolio = () => {
	const [Loading, setLoading] = useState(true);
	const APIKey = 'E8FAQ4X1Q5P2WHPN';
	const [user, loading, error] = useAuthState(auth);
	const [UserPortfolio, loading2, error2] = useDocument(
		doc(getFirestore(app), `Users/${user?.uid}/StockLists/Portfolio`),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const PullData = async () => {
		console.log('User:', user);
		console.log('User Portfolio:', UserPortfolio?.data());
	};

	const PopulateData = async () => {
		const Data = await axios.get(
			`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=${APIKey}`
		);
		console.log(Data);
	};

	useEffect(() => {
		PopulateData();
	}, []);

	return (
		<div>
			<SearchNavbar />
			<button onClick={PullData}>Pull Data</button>
			{Loading ? <LoadingPage /> : <PortfolioPie />}
			<BottomNavbar />
		</div>
	);
};

export default Portfolio;
