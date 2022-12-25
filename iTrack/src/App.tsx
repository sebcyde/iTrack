import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Dashboard from './Pages/Dashboard/Dashboard';
import Settings from './Pages/Settings/Settings';
import Portfolio from './Pages/Portfolio/Portfolio';
import LoadingPage from './Pages/Loading/LoadingPage';
import Login from './Pages/AuthPages/Login';
import SignUp from './Pages/AuthPages/SignUp';
import { app, auth } from './Config/firebase';
import News from './Pages/News/News';
import { UpdateStockList } from './Functions/UpdateStocklist';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc, getFirestore } from 'firebase/firestore';
import StockDetails from './Pages/StockDetails/StockDetails';

function App() {
	const [user, loading, error] = useAuthState(auth);
	const [UserPortfolio, loading2, error2] = useDocument(
		doc(getFirestore(app), `Users/${user?.uid}/StockLists/AllLists`),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);
	const [Loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const StockUpdateTimer = 60000;

	// Initial loading screen
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, []);

	// Ensure user is signed in or redirect to login
	useEffect(() => {
		if (user) {
			navigate('/');
		} else {
			navigate('/login');
		}
	}, [user]);

	// Update Stocklist in Users DB every interval
	useEffect(() => {
		let X = 0;

		const interval = setInterval(() => {
			X++;
			console.log(`Logs every minute. Current Iteration: ${X}`);
			if (UserPortfolio?.data()?.Portfolio.length > 0 && user) {
				UpdateStockList(user, UserPortfolio?.data()?.Portfolio);
				console.log('Updated Portfolio:', UserPortfolio?.data()?.Portfolio);
			} else {
				console.log('Portfolio is empty. cant update.');
			}
		}, StockUpdateTimer);

		return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
	}, []);

	return (
		<div className="App">
			{Loading || loading ? (
				<LoadingPage />
			) : (
				<>
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/portfolio" element={<Portfolio />} />
						<Route path="/settings" element={<Settings />} />
						<Route path="/news" element={<News />} />
						<Route path="/stockdetails" element={<StockDetails />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
					</Routes>
				</>
			)}
		</div>
	);
}

export default App;
