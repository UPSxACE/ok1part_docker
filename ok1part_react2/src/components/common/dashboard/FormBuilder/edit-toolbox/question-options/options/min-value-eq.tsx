import { FormControl, IconButton, ListItemText } from '@mui/material';
import { IEditToolboxProps } from '../..';
import QuestionOptionWrapper from '../question-option-wrapper';
import { useState } from 'react';
import BootstrapInput from '@/components/common/dashboard/bootstrap-input';
import { Close } from '@mui/icons-material';
import useChangeRuleFuncs from './use-change-rule-funcs';

export default function MinValueEq({
  children,
  id,
  focusedElement,
  setFocusedElement,
  actions,
  renderQuestionOptions = true,
  fieldsArray,
  setFieldsArray,
  ruleIndex,
}: IEditToolboxProps & { ruleIndex: number }) {
  const { current, handleChange, deleteDependency } = useChangeRuleFuncs({
    fieldsArray,
    setFieldsArray,
    id,
    ruleIndex,
  });

  return (
    <QuestionOptionWrapper>
      <ListItemText>Minimum Value ( &ge; )</ListItemText>
      <IconButton sx={{ mr: 0.5 }} onClick={deleteDependency}>
        <Close color='error' />
      </IconButton>
      <FormControl>
        <BootstrapInput
          sx={{
            width: 150,
            '& .MuiInputBase-input': {
              height: '18px',
            },
          }}
          className={'lightGreyDisable'}
          id='min-value-eq'
          value={current ? current : ''}
          placeholder='Insert a value'
          onChange={handleChange}
          type='numeric'
        />
      </FormControl>
    </QuestionOptionWrapper>
  );
}
