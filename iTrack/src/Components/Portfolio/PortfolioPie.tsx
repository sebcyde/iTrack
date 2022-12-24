import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

type Props = { Portfolio: any | undefined; RTPortfolio: any | undefined };

function compare(a: any, b: any) {
	if (a.Ticker < b.Ticker) {
		return -1;
	}
	if (a.Ticker > b.Ticker) {
		return 1;
	}
	return 0;
}

function compareLive(a: any, b: any) {
	if (
		a.data['Global Quote']['01. symbol'] < b.data['Global Quote']['01. symbol']
	) {
		return -1;
	}
	if (
		a.data['Global Quote']['01. symbol'] > b.data['Global Quote']['01. symbol']
	) {
		return 1;
	}
	return 0;
}

const PortfolioPie = (props: Props) => {
	const [Portfolio, setPortfolio] = useState<any>();

	useEffect(() => {
		let SortedDBPortfolio = props.Portfolio?.sort(compare);
		let SortedLivePortfolio = props.RTPortfolio.sort(compareLive);

		console.log('Sorted Portfolio:', SortedDBPortfolio);
		console.log('Sorted Live Portfolio:', SortedLivePortfolio);

		let Port = SortedDBPortfolio.map((Stock: any, index: number) => ({
			...SortedLivePortfolio[index].data['Global Quote'],
			TotalPrice:
				Stock.ShareCount *
				+SortedLivePortfolio[index].data['Global Quote']['05. price'],
		}));

		setPortfolio(Port);
	}, []);

	useEffect(() => {
		if (Portfolio) console.log('Final Portfolio:', Portfolio);
	}, [Portfolio]);

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
