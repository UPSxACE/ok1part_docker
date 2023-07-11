import { FormControl, IconButton, ListItemText } from '@mui/material';
import { IEditToolboxProps } from '../..';
import QuestionOptionWrapper from '../question-option-wrapper';
import BootstrapInput from '@/components/common/dashboard/bootstrap-input';
import { useState } from 'react';
import { Close } from '@mui/icons-material';
import useChangeComparisonFuncs from './use-change-comparison-funcs';

export default function ComparisonSupMarginError({
  children,
  id,
  focusedElement,
  setFocusedElement,
  actions,
  renderQuestionOptions = true,
  fieldsArray,
  setFieldsArray,
  comparisonIndex,
}: IEditToolboxProps & { comparisonIndex: number }) {
  const {
    current_config,
    current_comparison_value,
    current_base_value,
    handleChange,
    handleChangeBase,
    deleteComparison,
  } = useChangeComparisonFuncs({
    fieldsArray,
    setFieldsArray,
    id,
    comparisonIndex,
  });
  return (
    <QuestionOptionWrapper>
      <ListItemText>Superior % Margin Of Error ( &gt; )</ListItemText>
      <IconButton sx={{ mr: 0.5 }} onClick={deleteComparison}>
        <Close color='error' />
      </IconButton>
      <FormControl>
        <BootstrapInput
          type='decimal'
          sx={{
            width: 150,
            '& .MuiInputBase-input': {
              height: '18px',
            },
          }}
          className={'lightGreyDisable'}
          id='comparison-sup-marg-error-value'
          value={current_comparison_value ? current_comparison_value : ''}
          placeholder='Insert a valuert a value'
          onChange={handleChange}
        />
      </FormControl>
    </QuestionOptionWrapper>
  );
}
