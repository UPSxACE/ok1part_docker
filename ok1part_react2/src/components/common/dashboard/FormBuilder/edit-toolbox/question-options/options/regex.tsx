import { FormControl, ListItemText } from '@mui/material';
import { IEditToolboxProps } from '../..';
import QuestionOptionWrapper from '../question-option-wrapper';
import { useState } from 'react';
import BootstrapInput from '@/components/common/dashboard/bootstrap-input';

export default function Regex({
  children,
  id,
  focusedElement,
  setFocusedElement,
  actions,
  renderQuestionOptions = true,
  fieldsArray,
  setFieldsArray,
}: IEditToolboxProps) {
  const [state, setState] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setState(value);
  };

  return (
    <QuestionOptionWrapper>
      <ListItemText>Regex</ListItemText>
      <FormControl>
        <BootstrapInput
          disabled
          sx={{
            width: 150,
            '& .MuiInputBase-input': {
              height: '18px',
            },
          }}
          className={'lightGreyDisable'}
          id='regex'
          value={state ? state : ''}
          onChange={handleChange}
        />
      </FormControl>
    </QuestionOptionWrapper>
  );
}
