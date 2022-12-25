import {
	Chip,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import axios from 'axios';
import { doc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { app, auth } from '../../Config/firebase';
import { FHKEY } from '../../Config/Keys';
import { RecentNewsSort } from '../../Functions/SortFunctions';
import LoadingPage from '../../Pages/Loading/LoadingPage';
import { NewsType } from '../../Types/NewsTypes';
import { StockDetailsType } from '../../Types/StockTypes';

type Props = {};

const PortfolioNews = (props: Props) => {
	const [Loading, setLoading] = useState(true);
	const [user, loading, error] = useAuthState(auth);
	const [UserPortfolio, loading2, error2] = useDocument(
		doc(getFirestore(app), `Users/${user?.uid}/StockLists/AllLists`),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);
	const [AllNewsItems, setAllNewsItems] = useState<NewsType[]>();
	let InitialNewsItems: NewsType[] = [];

	const PullData = async () => {
		let date = new Date();
		let TodaysDate = date.toISOString().slice(0, 10);

		let date2 = new Date();
		date2.setMonth(date2.getMonth() - 3);
		let PrevDate = date2.toISOString().slice(0, 10);

		await Promise.all(
			UserPortfolio?.data()?.Portfolio.map(async (Stock: StockDetailsType) => {
				console.log('News Stock to Search:', Stock);
				const Data = await axios.get(
					`https://finnhub.io/api/v1/company-news?symbol=${Stock['01. symbol']}&from=${PrevDate}&to=${TodaysDate}&token=${FHKEY}`
				);

				let FinalData: NewsType[] = [...RecentNewsSort(Data.data)];

				for (let Item of FinalData.slice(0, 50)) {
					InitialNewsItems.push(Item);
				}

				console.log('InitialNewsItems:', InitialNewsItems);
			})
		);
		setAllNewsItems((Item) => [...RecentNewsSort(InitialNewsItems)]);
		console.log('Initial News Items:', InitialNewsItems);
		// setAllNewsItems(InitialNewsItems);
		// setStockDeets(Data.data['Global Quote']);
		setLoading(false);
	};

	useEffect(() => {
		if (UserPortfolio?.data()?.Portfolio.length > 0) {
			console.log('testing port data pull');
			PullData();
		}
		// console.log('testing port data pull');
		// PullData();
	}, [UserPortfolio]);

	return (
		<div className="NewsComponent">
			{Loading || loading || loading2 ? (
				<LoadingPage />
			) : (
				<>
					<h2 className="NewsComponentTitle">Recent News</h2>
					<List>
						{AllNewsItems?.map((NewsItem) => {
							let date = new Date(NewsItem.datetime);
							return (
								<ListItem disablePadding className="NewsItem">
									<ListItemButton>
										<div>
											<span className="NewsHeadlineContainer">
												<h4 className="NewsComponentTitle">
													{NewsItem.headline}
												</h4>
											</span>
											<p className="NewsSource">
												{date.toISOString().slice(0, 10)} - {NewsItem.source}
											</p>

											{/* <p className="NewsSummary">{NewsItem.summary}</p> */}

											<div className="NewsTickerContainer">
												<Chip label={NewsItem.related} />
											</div>
										</div>
										<div className="NewsImageContainer">
											<img src={NewsItem.image} />
										</div>
									</ListItemButton>
								</ListItem>
							);
						})}
					</List>
				</>
			)}
		</div>
	);
};

export default PortfolioNews;
