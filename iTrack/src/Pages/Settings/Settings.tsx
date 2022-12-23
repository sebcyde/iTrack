import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import BottomNavbar from '../../Components/BottomNavbar/BottomNavbar';
import { auth } from '../../Config/firebase';

type Props = {};

const Settings = (props: Props) => {
	const [user, loading, error] = useAuthState(auth);
	const LogOut = async () => await signOut(auth);
	const PullData = async () => console.log(user);

	return (
		<div>
			Settings
			<button onClick={PullData}>Pull Data</button>
			<button onClick={LogOut}>Log Out</button>
			<BottomNavbar />
		</div>
	);
};

export default Settings;
