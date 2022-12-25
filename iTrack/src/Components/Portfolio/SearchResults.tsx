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

type Stock = {
	'1. symbol': string;
	'2. name': string;
	'3. type': string;
	'4. region': string;
	'5. marketOpen': string;
	'6. marketClose': string;
	'7. timezone': string;
	'8. currency': string;
	'9. matchScore': '1.0000';
};

type Props = { Results: [] | undefined };

const SearchResults = (props: Props) => {
	const [expanded, setExpanded] = React.useState<string | false>('panel1');

	const handleChange =
		(panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
			setExpanded(newExpanded ? panel : false);
		};

	const AddToPortfolio = async (Stock: any) => {
		console.log(
			'this will add it to the portfolio. We need another function for the watchlist'
		);
		console.log('Stock to be added:', Stock);
	};

  const AddToWatchlist = async (Stock: any) => {
    
  };

	return (
		<div className="SearchResults">
			{props.Results != undefined ? (
				<>
					<List component="nav" aria-label="mailbox folders">
						{props.Results?.map((Result, index) => {
							return (
								<>
									<ListItemButton>
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
