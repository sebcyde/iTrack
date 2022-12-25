import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
	AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AddIcon from '@mui/icons-material/Add';
import { Divider, ListItem } from '@mui/material';
import { StockType } from '../../Types/StockTypes';
import { useDispatch } from 'react-redux';
import { UpdateStock } from '../../Store/Slices/PortfolioSlice';
import { useNavigate } from 'react-router-dom';

type Props = { Results: [] | undefined };

const SearchResults = (props: Props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const ViewStock = async (Stock: string) => {
		console.log('Stock to be added:', Stock);
		dispatch(UpdateStock(Stock));
		navigate('/stockdetails')
	};

	return (
		<div className="SearchResults">
			{props.Results != undefined ? (
				<>
					<List component="nav" aria-label="mailbox folders">
						{props.Results?.map((Result, index) => {
							return (
								<>
									<ListItemButton
										onClick={() => ViewStock(Result['1. symbol'])}
									>
										<ListItemText
											primary={`${Result['1. symbol']} - ${Result['2. name']}`}
										/>
									</ListItemButton>
									<Divider />
								</>
							);
						})}
					</List>
				</>
			) : (
				''
			)}
		</div>
	);
};

export default SearchResults;
