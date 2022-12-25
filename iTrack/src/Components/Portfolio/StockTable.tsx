import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StockDetailsType } from '../../Types/StockTypes';

type props = {
	StockProps: StockDetailsType;
};

export default function StockTable({ StockProps }: props) {
	const Stock = StockProps;

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>{Stock['01. symbol']}</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow
						key={'Price'}
						sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
					>
						<TableCell align="left">Price</TableCell>
						<TableCell align="right">{Stock['05. price']}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}
