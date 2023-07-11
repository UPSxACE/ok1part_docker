import { Box } from '@mui/material';
import React, { Children, cloneElement, isValidElement, useState } from 'react';
import Part from './accordion-part';

function Form({
  category,
  children,
}: {
  category?: String;
  children: React.ReactNode;
}) {
  const [currentAccordion, setAccordion] = useState(false);
  return (
    <Box>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            switchState: { currentAccordion, setAccordion },
          } as any); // NOTE - Careful with this any
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
