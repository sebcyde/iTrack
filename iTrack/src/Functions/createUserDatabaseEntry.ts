import { SettingsPhoneTwoTone } from '@mui/icons-material';
import { UserCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../Config/firebase';

type StockType = {
	ShareCount: number;
	AverageCost: number;
};

export const createUserDatabaseEntry = async (
	UserName: 'string',
	UserObject: UserCredential | undefined
) => {
	try {
		if (UserObject) {
			console.log('User Object:', UserObject);
			await setDoc(doc(db, `Users/${UserObject.user.uid}`), {
				UserName: UserName,
				UserEmail: UserObject.user.email,
				PhotoURL: UserObject.user.photoURL,
				UID: UserObject.user.uid,
				AccountCreation: UserObject.user.metadata.creationTime,
			});

			await setDoc(
				doc(db, `Users/${UserObject.user.uid}/StockLists/Portfolio`),
				{
					amzn: <StockType>{ ShareCount: 0, AverageCost: 0 },
					msft: <StockType>{ ShareCount: 0, AverageCost: 0 },
					aapl: <StockType>{ ShareCount: 0, AverageCost: 0 },
					nflx: <StockType>{ ShareCount: 0, AverageCost: 0 },
				}
			);

			await setDoc(
				doc(db, `Users/${UserObject.user.uid}/StockLists/WatchList`),
				{
					Watchlist: ['amzn', 'msft', 'aapl', 'nflx'],
				}
			);

			console.log('User Database Entry Creation Successful');
		}
	} catch (e) {
		console.error('Error creating user document: ', e);
	}
};
