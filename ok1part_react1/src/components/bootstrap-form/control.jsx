const { FormControl } = require('@mui/material');
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from 'react';

const Control = ({ field, half, label, required, formDataState, children }) => {
  const formData = formDataState.formData;

  return (
    <FormControl
      sx={{ width: half ? '50%' : '100%', marginBottom: 2 }}
      error={formData[field] && formData[field]['error'] ? true : false}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            field,
            formDataState,
            required,
            label,
            half,
          });
        }
        return child;
      })}
    </FormControl>
  );
};

export default Control;
