import React, { PureComponent, useEffect } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

type Props = { Portfolio: any | undefined; RTPortfolio: any | undefined };

function compare(a: any, b: any) {
	if (a.ticker < b.ticker) {
		return -1;
	}
	if (a.ticker > b.ticker) {
		return 1;
	}
	return 0;
}

const PortfolioPie = (props: Props) => {
	useEffect(() => {
		console.log('Portfolio:', props.Portfolio);
		console.log('RT Portfolio:', props.RTPortfolio);
	}, []);

	// let SoretedLivePortfolio = props.RTPortfolio?.sort

	// let Port = props.Portfolio?.map((Stock: any, index:number) => {{StockTicker: Stock.ShareCount *  }});

	return (
		<ResponsiveContainer width="100%" height="100%">
			<PieChart>
				{/* <Pie
					data={Portfolio}
					dataKey={Portfolio.data['Global Quote']}
					cx="50%"
					cy="50%"
					outerRadius={100}
					fill="#000"
					label
				/> */}
			</PieChart>
		</ResponsiveContainer>
	);
};

export default PortfolioPie;
