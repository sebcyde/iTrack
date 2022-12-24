import axios from 'axios';

export const PullPortfolio = async (UserPortfolio: any) => {
	let PulledPortfolio: any[] = [];
	await Promise.all(
		UserPortfolio.Portfolio.map(async (Stock: any, index: number) => {
			let TickerData = await axios.get(
				`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${Stock.Ticker}&apikey=E8FAQ4X1Q5P2WHPN`
			);
			PulledPortfolio.push(TickerData);
		})
	);
	return PulledPortfolio;
};
