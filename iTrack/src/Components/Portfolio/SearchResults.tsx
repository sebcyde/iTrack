import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
	AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AddIcon from '@mui/icons-material/Add';

const Accordion = styled((props: AccordionProps) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	'&:not(:last-child)': {
		borderBottom: 0,
	},
	'&:before': {
		display: 'none',
	},
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
		{...props}
	/>
))(({ theme }) => ({
	backgroundColor: 'rgba(0, 0, 0, .03)',
	flexDirection: 'row-reverse',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

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
	return (
		<div className="SearchResults">
			{props.Results != undefined ? (
				<>
					{props.Results?.map((Result, index) => {
						return (
							<Accordion
								expanded={expanded === `Panel${index}`}
								onChange={handleChange(`Panel${index}`)}
							>
								<AccordionSummary
									aria-controls={`panel${index}d-content`}
									id={`panel${index}d-header`}
								>
									<Typography>
										{Result['1. symbol']} - {Result['2. name']}
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<List
										sx={{
											width: '100%',
											bgcolor: 'background.paper',
										}}
										component="nav"
										aria-labelledby="nested-list-subheader"
									>
										<ListItemButton
											onClick={() => {
												AddToPortfolio(Result);
											}}
										>
											<ListItemIcon>
												<AddIcon />
											</ListItemIcon>
											<ListItemText primary="Add to Portfolio" />
										</ListItemButton>
										<ListItemButton>
											<ListItemIcon>
												<PlaylistAddIcon />
											</ListItemIcon>
											<ListItemText primary="Add to Watchlist" />
										</ListItemButton>
									</List>
								</AccordionDetails>
							</Accordion>
						);
					})}
				</>
			) : (
				''
			)}
		</div>
	);
};

export default SearchResults;
