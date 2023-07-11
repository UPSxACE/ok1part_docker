import { FormControl, ListItemText } from '@mui/material';
import { IEditToolboxProps } from '../..';
import QuestionOptionWrapper from '../question-option-wrapper';
import { useState } from 'react';
import BootstrapInput from '@/components/common/dashboard/bootstrap-input';

export default function DependencyComparisonValue({
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
  const [state, setState] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setState(value);
  };

  return (
    <QuestionOptionWrapper>
      <ListItemText>Dependency Comparison Value</ListItemText>
      <FormControl>
        <BootstrapInput
          sx={{
            width: 150,
            '& .MuiInputBase-input': {
              height: '18px',
            },
          }}
          className={'lightGreyDisable'}
          id='dependency-comparison-value'
          value={state ? state : ''}
          placeholder='Insert a value'
          onChange={handleChange}
        />
      </FormControl>
    </QuestionOptionWrapper>
  );
}
