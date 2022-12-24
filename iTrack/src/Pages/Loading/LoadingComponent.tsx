import React from 'react';
import { FadeLoader } from 'react-spinners';

const LoadingComponentStyle = {
	height: '100%',
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

const LoadingComponent = () => {
	return (
		<div style={LoadingComponentStyle} className="">
			<FadeLoader
				color={'#14213d'}
				aria-label="Loading Spinner"
				data-testid="loader"
				speedMultiplier={1.2}
			/>
		</div>
	);
};

export default LoadingComponent;
