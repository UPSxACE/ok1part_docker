import { ArrowForwardIosSharp } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';

const accordionStyle = {
  '&:before': {
    display: 'none',
  },
  border: '1px solid rgba(0, 0, 0, 0.12)',
  '&:not(:last-of-type)': { borderBottom: 'none' },
  boxShadow: 'none',
};

const accordionSummaryStyle = {
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: 'black',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
};

const accordionDetailsStyle = {
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  padding: 2,
};

export default function SidebarAccordion({
  id,
  title,
  children,
  panelState,
  detailsStyle = {},
}: {
  id: number;
  title: string;
  children: React.ReactNode;
  panelState: {
    state: number | false;
    handleChange: Function;
  };
  detailsStyle?: any;
}) {
  return (
    <Accordion
      disableGutters
      expanded={panelState.state === id}
      onChange={panelState.handleChange(id)}
      sx={accordionStyle}
    >
      <AccordionSummary
        expandIcon={
          <ArrowForwardIosSharp
            sx={{ fontSize: '0.9rem', stroke: 'black', strokeWidth: '0.25px' }}
          />
        }
        id={'panel' + id + '-header'}
        sx={accordionSummaryStyle}
      >
        <Typography
          variant='body1'
          component='h1'
          sx={{ fontWeight: 500, fontSize: '1.05rem' }}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ ...accordionDetailsStyle, ...detailsStyle }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
}
