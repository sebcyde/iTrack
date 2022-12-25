import React from 'react';
import EmptyPortfolioBanner from '../../Components/Banners/EmptyPortfolioBanner';
import BottomNavbar from '../../Components/BottomNavbar/BottomNavbar';
import TopStocks from '../../Components/Dashboard/TopStocks';
import TopNavbar from '../../Components/TopNavbars/TopNavbar';

type Props = {};

const Dashboard = (props: Props) => {
	return (
		<div>
			<TopNavbar />
			<EmptyPortfolioBanner />
			<TopStocks />
			<BottomNavbar />
		</div>
	);
};

export default Dashboard;
