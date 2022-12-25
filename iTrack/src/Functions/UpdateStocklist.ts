import axios from 'axios';
import { User } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { auth, app, db } from '../Config/firebase';
import { APIKEY } from '../Config/Keys';
import { StockType } from '../Types/StockTypes';

export const UpdateStockList = async (User: User, UserPortfolioData: any) => {
	let NewPortfolio: StockType[] = [];

	if (UserPortfolioData.length == 0) {
		console.log('Portfolio is empty. Update Failed.');
	} else {
		Promise.all(
			UserPortfolioData.map(async (Stock: StockType) => {
				let Data = await axios.get(
					`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${Stock['1. symbol']}&apikey=${APIKEY}`
				);
				console.log(Data.data);
			})
		);
		await setDoc(doc(db, `Users/${User.uid}/StockLists/AllLists`), {
			Portfolio: NewPortfolio,
		});

		console.log('Pushed Sorted Portfolio to DB');
	}
};
