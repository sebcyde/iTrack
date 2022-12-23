import React from 'react';
import { FadeLoader } from 'react-spinners';

const LoadingScreenStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

const Loading = () => {
	return (
		<div style={LoadingScreenStyle} className="LoadingPage">
			<FadeLoader
				color={'#14213d'}
				aria-label="Loading Spinner"
				data-testid="loader"
				speedMultiplier={1.2}
			/>
		</div>
	);
};

export default Loading;
