import {
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { IEditToolboxProps } from '../..';
import QuestionOptionWrapper from '../question-option-wrapper';
import { useState } from 'react';

export default function DependencyComparisonType({
  children,
  id,
  focusedElement,
  setFocusedElement,
  actions,
  renderQuestionOptions = true,
  fieldsArray,
  setFieldsArray,
  depIndex,
}: IEditToolboxProps & { depIndex?: number }) {
  const [state, setState] = useState('exact');
  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setState(value);
  };

  return (
    <QuestionOptionWrapper>
      <ListItemText>Dependency Comparison Type</ListItemText>
      <FormControl>
        <Select
          sx={{ width: 150, height: 40 }}
          id='dependency-comparison-type'
          labelId='dependency-comparison-type-label'
          value={state ? state : ''}
          onChange={handleChange}
        >
          <MenuItem value='exact'>Exact Value</MenuItem>
          <MenuItem value='percentual-margin'>
            Percentual Margin of Error
          </MenuItem>
          <MenuItem value='minmax-number'>Min/Max Number</MenuItem>
        </Select>
      </FormControl>
    </QuestionOptionWrapper>
  );
}
