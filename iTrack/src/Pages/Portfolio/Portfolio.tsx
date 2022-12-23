import { doc, getFirestore } from 'firebase/firestore';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import BottomNavbar from '../../Components/BottomNavbar/BottomNavbar';
import SearchNavbar from '../../Components/TopNavbars/SearchNavbar';
import { app, auth } from '../../Config/firebase';

type Props = {};

const Portfolio = (props: Props) => {
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

	return (
		<div>
			<SearchNavbar />
			<button onClick={PullData}>Pull Data</button>
			<BottomNavbar />
		</div>
	);
};

export default Portfolio;
