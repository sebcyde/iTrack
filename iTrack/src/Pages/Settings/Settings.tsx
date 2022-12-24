import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import BottomNavbar from '../../Components/BottomNavbar/BottomNavbar';
import { app, auth } from '../../Config/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc, getFirestore } from 'firebase/firestore';

type Props = {};

const Settings = (props: Props) => {
	const [user, loading, error] = useAuthState(auth);
	const [UserDB, loading1, error1] = useDocument(
		doc(getFirestore(app), `Users/${user?.uid}`),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);
	const [UserPortfolio, loading2, error2] = useDocument(
		doc(getFirestore(app), `Users/${user?.uid}/StockLists/AllLists`),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);
	const LogOut = async () => await signOut(auth);
	const PullData = async () => {
		console.log('User:', user);
		console.log('User DB:', UserDB?.data());
		console.log('User Portfolio:', UserPortfolio?.data());
	};

	return (
		<div>
			<button onClick={PullData}>Pull Data</button>
			<button onClick={LogOut}>Log Out</button>
			<BottomNavbar />
		</div>
	);
};

export default Settings;
