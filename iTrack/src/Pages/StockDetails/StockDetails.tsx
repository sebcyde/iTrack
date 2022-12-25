import React, { useEffect, useState } from 'react';
import { RootState } from '../../Store/Store';
import { useSelector } from 'react-redux';
import TopNavbar from '../../Components/TopNavbars/TopNavbar';
import BottomNavbar from '../../Components/BottomNavbar/BottomNavbar';
import LoadingPage from '../Loading/LoadingPage';
import axios from 'axios';
import { APIKEY } from '../../Config/Keys';
import StockTable from '../../Components/Portfolio/StockTable';
import { StockDetailsType } from '../../Types/StockTypes';
import { Box, Button, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { setDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '../../Config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

type Props = {};

const StockDetails = (props: Props) => {
	const [user, loading, error] = useAuthState(auth);
	const [Loading, setLoading] = useState(true);
	const [StockDeets, setStockDeets] = useState<StockDetailsType>();
	const CurrentStock = useSelector(
		(state: RootState) => state.StockReducer.StockTicker
	);
	const [open, setopen] = useState(false);

	const handleOpen = () => setopen(true);
	const handleClose = () => setopen(false);

	const AddToPortfolio = async () => {
		if (user && !Loading) {
			await updateDoc(doc(db, `Users/${user.uid}/StockLists/AllLists`), {
				Portfolio: arrayUnion(StockDeets),
			});
		}
	};

	const PullData = async () => {
		const Data = await axios.get(
			`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${CurrentStock}&apikey=${APIKEY}`
		);
		console.log('Return Stock Details:', Data.data['Global Quote']);
		setStockDeets(Data.data['Global Quote']);
		setLoading(false);
	};

	useEffect(() => console.log(CurrentStock), [CurrentStock]);

	useEffect(() => {
		PullData();
	}, []);

	return (
		<div>
			{Loading ? (
				<LoadingPage />
			) : (
				<>
					<TopNavbar />
					<Button onClick={handleOpen}>Open modal</Button>
					<Modal
						hideBackdrop
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box>
							<Typography id="modal-modal-title" variant="h6" component="h2">
								Text in a modal
							</Typography>
							<Typography id="modal-modal-description" sx={{ mt: 2 }}>
								Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
							</Typography>
							<div>
								<Button variant="contained" color="error" onClick={handleClose}>
									Cancel
								</Button>
								<Button
									variant="contained"
									color="primary"
									onClick={AddToPortfolio}
								>
									Add To Portfolio
								</Button>
							</div>
						</Box>
					</Modal>
					{/* {StockDeets && <StockTable StockProps={StockDeets} />} */}
					<BottomNavbar />
				</>
			)}
		</div>
	);
};

export default StockDetails;
