import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

const BottomNavbar = (props: Props) => {
	const [value, setvalue] = useState();
	const navigate = useNavigate();

	return (
		<div>
			<Paper
				sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
				elevation={3}
			>
				<BottomNavigation
					showLabels
					value={value}
					onChange={(event, newValue) => {
						setvalue(newValue);
						switch (newValue) {
							case 0:
								navigate('/');
								break;
							case 1:
								navigate('/portfolio');
								break;
							case 2:
								navigate('/settings');
								break;
							default:
								break;
						}
					}}
				>
					<BottomNavigationAction label="Home" icon={<HomeIcon />} />
					<BottomNavigationAction label="Portfolio" icon={<TrendingUpIcon />} />
					<BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
				</BottomNavigation>
			</Paper>
		</div>
	);
};

export default BottomNavbar;
