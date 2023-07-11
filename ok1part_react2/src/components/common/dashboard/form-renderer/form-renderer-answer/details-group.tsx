import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';

export default function DetailsGroup({
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

        borderRadius: '0!important',
        '&:before': {
          display: 'none',
        },
        '& .MuiButtonBase-root': {
          height: 40,
        },
      }}
      defaultExpanded={true}
      expanded={true}
    >
      <AccordionSummary
        expandIcon={<></>}
        sx={{
          minHeight: 40,
          backgroundColor: '#f8f8f8',
          '&:hover': { backgroundColor: '#0000000a' }, //0000000a
          '&.Mui-expanded': { backgroundColor: '#d8d8d899' }, //0000000a
          '&.Mui-expanded .MuiTypography-root': { fontWeight: '500' },
          '&.Mui-expanded .MuiSvgIcon-root': {
            strokeWidth: 0.5,
            stroke: 'black',
          },
          //'&.Mui-expanded': { backgroundColor: '#e1e1e1' },
          borderTop: '1px solid #e0e2e4',
          cursor: 'default!important',
          padding: 1,
          '& .MuiAccordionSummary-content': {
            my: '0!important',
          },
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
