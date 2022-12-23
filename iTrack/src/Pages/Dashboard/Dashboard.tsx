import React from 'react';
import BottomNavbar from '../../Components/BottomNavbar/BottomNavbar';
import TopNavbar from '../../Components/TopNavbars/TopNavbar';

type Props = {};

const Dashboard = (props: Props) => {
	return (
		<div>
			<TopNavbar />
			<h1>Welcome Back Sebastian</h1>
			<BottomNavbar />
		</div>
	);
};

export default Dashboard;
