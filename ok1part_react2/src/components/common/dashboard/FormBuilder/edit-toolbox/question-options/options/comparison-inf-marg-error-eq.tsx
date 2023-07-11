import { FormControl, IconButton, ListItemText } from '@mui/material';
import { IEditToolboxProps } from '../..';
import QuestionOptionWrapper from '../question-option-wrapper';
import BootstrapInput from '@/components/common/dashboard/bootstrap-input';
import { Close } from '@mui/icons-material';
import useChangeComparisonFuncs from './use-change-comparison-funcs';

export default function ComparisonInfMarginErrorEq({
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
      <ListItemText>Inferior % Margin Of Error ( &le; )</ListItemText>
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
          id='comparison-inf-marg-error-eq-value'
          value={current_comparison_value ? current_comparison_value : ''}
          placeholder='Insert a value'
          onChange={handleChange}
        />
      </FormControl>
    </QuestionOptionWrapper>
  );
}
