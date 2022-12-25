import {
	FormControl,
	List,
	ListItem,
	ListItemButton,
	MenuItem,
	NativeSelect,
	SelectChangeEvent,
} from '@mui/material';
import axios from 'axios';
import { doc, getFirestore } from 'firebase/firestore';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { auth, app } from '../../Config/firebase';
import { FHKEY } from '../../Config/Keys';
import {
	NamedAZSort,
	NamedZASort,
	PercentDown,
	PercentUp,
} from '../../Functions/SortFunctions';
import LoadingComponent from '../../Pages/Loading/LoadingComponent';
import LoadingPage from '../../Pages/Loading/LoadingPage';
import { NamedStockChangeType, StockDetailsType } from '../../Types/StockTypes';

type Props = {};

const TopStocks = (props: Props) => {
	const [RetrievedStocks, setRetrievedStocks] =
		useState<NamedStockChangeType[]>();
	const [user, loading, error] = useAuthState(auth);
	const [UserPortfolio, loading2, error2] = useDocument(
		doc(getFirestore(app), `Users/${user?.uid}/StockLists/AllLists`),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);
	const [SortingList, setSortingList] = useState(false);
	const [Loading, setLoading] = useState(true);
	let NewStocks: any[] = [];

	const PullData = async () => {
		await Promise.all(
			UserPortfolio?.data()?.Portfolio.map(async (Stock: StockDetailsType) => {
				const Data = await axios.get(
					`https://finnhub.io/api/v1/quote?symbol=${Stock['01. symbol']}&token=${FHKEY}`
				);
				NewStocks.push({ ...Data.data, ticker: Stock['01. symbol'] });
			})
		);
		setRetrievedStocks(NamedAZSort(NewStocks));
		setLoading(false);
	};

	useEffect(() => {
		PullData();
	}, [UserPortfolio]);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		let SortType = event.target.value.toString();

		setSortingList(true);

		if (SortType == 'A-Z') {
			setRetrievedStocks((num) => [...NamedAZSort(RetrievedStocks!)]);
		} else if (SortType == 'Z-A') {
			setRetrievedStocks((num) => [...NamedZASort(RetrievedStocks!)]);
		} else if (SortType == 'PercentUp') {
			setRetrievedStocks((num) => [...PercentUp(RetrievedStocks!)]);
		} else if (SortType == 'PercentDown') {
			setRetrievedStocks((num) => [...PercentDown(RetrievedStocks!)]);
		} else {
			console.log('Sorting Failed.');
		}

		setSortingList(false);
	};

	return (
		<div className="DashboardComponent TopStocksContainer">
			{Loading ? (
				<LoadingPage />
			) : (
				<>
					<span className="TopStockTitleSpan">
						<h2 className="DashboardComponentTitle">Portfolio Snapshot</h2>

						<FormControl fullWidth>
							<NativeSelect defaultValue={'A-Z'} onChange={handleChange}>
								<MenuItem value="">
									<em>Sort</em>
								</MenuItem>
								<option value={'A-Z'}>Sort by A-Z</option>
								<option value={'Z-A'}>Sort by Z-A</option>
								<option value={'PercentUp'}>Sort by % Down</option>
								<option value={'PercentDown'}>Sort by % Up</option>
							</NativeSelect>
						</FormControl>
					</span>
					{SortingList ? (
						<LoadingComponent />
					) : (
						<>
							<List>
								{RetrievedStocks?.map((Stock) => {
									return (
										<ListItem disablePadding className="TopStockContainer">
											<ListItemButton>
												<p className="TopStocksTicker">{Stock.ticker}</p>
												<span>
													<p className="TopStocksPrice">
														${Stock.c.toFixed(2)}
													</p>
													<p
														className={`TopStocksPC ${
															Stock.dp.toString().includes('-')
																? 'red'
																: 'green'
														}`}
													>
														{Stock.dp.toFixed(2)}%
													</p>
												</span>
											</ListItemButton>
										</ListItem>
									);
								})}
							</List>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default TopStocks;
