import { ChevronRight } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';

export default function QuestionGroupWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Accordion
      disableGutters
      sx={{
        boxShadow: 'none',
        marginX: -3,
        paddingX: 1,
        borderRadius: '0!important',
        '&:before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ChevronRight
            sx={{
              transform: 'rotate(270deg)',
              height: '100%',
            }}
          />
        }
        sx={{
          backgroundColor: '#f8f8f8',
          '&:hover': { backgroundColor: '#0000000a' }, //0000000a
          '&.Mui-expanded': { backgroundColor: '#d8d8d899' }, //0000000a
          '&.Mui-expanded .MuiTypography-root': { fontWeight: '500' },
          '&.Mui-expanded .MuiSvgIcon-root': {
            strokeWidth: 0.5,
            stroke: 'black',
          },
          //'&.Mui-expanded': { backgroundColor: '#e1e1e1' },
          marginX: -1,
          paddingX: 3,
          height: 56,
          borderTop: '1px solid #e0e2e4',
        }}
      >
        <Typography variant='body1' component='span'>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ paddingY: 0 }}>{children}</AccordionDetails>
    </Accordion>
  );
}
