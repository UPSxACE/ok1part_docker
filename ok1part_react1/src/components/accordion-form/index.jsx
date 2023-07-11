import { Accordion, Box } from '@mui/material';
import { Children, cloneElement, isValidElement, useState } from 'react';
import Part from './accordion-part';

function Form({ category, children }) {
  const [currentAccordion, setAccordion] = useState(false);
  return (
    <Box>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            switchState: { currentAccordion, setAccordion },
          });
        }
        return child;
      })}
    </Box>
  );
}

const AccordionForm = {
  Form,
  Part,
};

export default AccordionForm;
