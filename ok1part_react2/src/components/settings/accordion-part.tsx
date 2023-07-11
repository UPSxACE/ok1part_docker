import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import React from 'react';

export default function Part({
  title,
  id,
  switchState,
  grey,
  children,
}: {
  title: String;
  id: Number;
  switchState?: {
    currentAccordion: any;
    setAccordion: React.Dispatch<any> | (() => {});
  };
  grey?: Boolean;
  children?: React.ReactNode;
}) {
  const { currentAccordion = null, setAccordion = () => {} } =
    switchState || {};
  const handleChange = (panel: Number) => {
    return (_: any, isExpanded: Boolean) => {
      setAccordion(isExpanded ? panel : false);
    };
  };

  return (
    <Accordion
      expanded={currentAccordion === id}
      onChange={handleChange(id)}
      sx={{
        color: 'black',
        backgroundColor: grey ? '#f2f2f2' : 'transparent',
        borderTop: 0,
        //borderBottom: 0,
        margin: '0!important',
        boxShadow: 'none',
        borderBottom: '1px solid #0000001f',
        '&:before': {
          display: 'none',
          opacity: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={id + 'bh-content'}
        id={id + 'bh-header'}
        sx={{
          backgroundColor: 'white',
          '&.Mui-expanded': {
            boxShadow: '0px 1px 2px #00000040',
          },
        }}
      >
        <Typography
          variant='h6'
          component={'h2'}
          sx={{ fontWeight: 400 }}
          color='text.primary'
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ borderTop: 1, borderColor: '#0000001f', p: 0 }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
}
