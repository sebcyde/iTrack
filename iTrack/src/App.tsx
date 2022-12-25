import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Dashboard from './Pages/Dashboard/Dashboard';
import Settings from './Pages/Settings/Settings';
import Portfolio from './Pages/Portfolio/Portfolio';
import LoadingPage from './Pages/Loading/LoadingPage';
import Login from './Pages/AuthPages/Login';
import SignUp from './Pages/AuthPages/SignUp';
import { auth } from './Config/firebase';
import News from './Pages/News/News';

function App() {
	const [user, loading, error] = useAuthState(auth);
	const [Loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, []);

	useEffect(() => {
		if (user) {
			navigate('/');
		} else {
			navigate('/login');
		}
	}, [user]);

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
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
					</Routes>
				</>
			)}
		</div>
	);
}

export default App;
