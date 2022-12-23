import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import Dashboard from './Pages/Dashboard/Dashboard';
import Settings from './Pages/Settings/Settings';
import Portfolio from './Pages/Portfolio/Portfolio';
import LoadingPage from './Pages/Loading/LoadingPage';

function App() {
	const [Loading, setLoading] = useState(false);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setLoading(false);
	// 	}, 1000);
	// }, []);

	return (
		<div className="App">
			{Loading ? (
				<LoadingPage />
			) : (
				<>
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/portfolio" element={<Portfolio />} />
						<Route path="/settings" element={<Settings />} />
					</Routes>
				</>
			)}
		</div>
	);
}

export default App;
