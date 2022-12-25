import axios from 'axios';
import { User } from 'firebase/auth';
import {
	arrayUnion,
	doc,
	getFirestore,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { auth, app, db } from '../Config/firebase';
import { APIKEY } from '../Config/Keys';
import { StockType } from '../Types/StockTypes';

export const UpdateStockList = async (User: User, UserPortfolioData: any) => {
	Promise.all(
		UserPortfolioData.map(async (Stock: StockType) => {
			console.log('Stock from Function:', Stock);

			let Data = await axios.get(
				`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${Stock['1. symbol']}&apikey=${APIKEY}`
			);
			console.log(
				'Update Function Retrieved Stock:',
				Data.data['Global Quote']
			);

			if (
				Object.keys(Data.data['Global Quote']).length === 0 &&
				Data.data['Global Quote'].constructor === Object
			) {
				console.log('Retrieved an empty Stock from API.');
				return;
			}

			await updateDoc(doc(db, `Users/${User.uid}/StockLists/AllLists`), {
				Portfolio: arrayUnion(Data.data['Global Quote']),
			});
		})
	);

	console.log('Pushed Sorted Portfolio to DB');
};
