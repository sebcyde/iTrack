import React from 'react';
import BottomNavbar from '../../Components/BottomNavbar/BottomNavbar';
import PortfolioNews from '../../Components/News/PortfolioNews';
import TopNavbar from '../../Components/TopNavbars/TopNavbar';

type Props = {};

const News = (props: Props) => {
	return (
		<div>
			<TopNavbar />
			<PortfolioNews />
			<BottomNavbar />
		</div>
	);
};

export default News;
