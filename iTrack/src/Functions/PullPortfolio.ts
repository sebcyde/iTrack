import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../Config/firebase';
import { APIKEY } from '../Config/Keys';

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

export const PullPortfolio = async (UserObject: any, UserPortfolio: any) => {
	let PulledPortfolio: any[] = [];
	await Promise.all(
		UserPortfolio.Portfolio.map(async (Stock: any, index: number) => {
			let TickerData = await axios.get(
				`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${Stock.Ticker}&apikey=${APIKEY}`
			);
			PulledPortfolio.push(TickerData);
		})
	);

	// console.log('Pulled Portfolio Before Sort:', PulledPortfolio);

	// let SortedDBPortfolio = PulledPortfolio.sort(compareLive).map(
	// 	(Stock: any) => Stock.data['Global Quote']
	// );
	// console.log('Sorted Pulled Portfolio:', SortedDBPortfolio);

	// await setDoc(doc(db, `Users/${UserObject.uid}/StockLists/AllLists`), {
	// 	Portfolio: SortedDBPortfolio,
	// });

	// console.log('Pushed Sorted Portfolio to DB');

	return PulledPortfolio;
};
