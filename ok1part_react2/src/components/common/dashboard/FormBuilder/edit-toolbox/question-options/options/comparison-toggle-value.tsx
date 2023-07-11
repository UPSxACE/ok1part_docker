import {
  FormControl,
  IconButton,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import { IEditToolboxProps } from '../..';
import QuestionOptionWrapper from '../question-option-wrapper';
import { Close } from '@mui/icons-material';
import useChangeComparisonFuncs from './use-change-comparison-funcs';

export default function ComparisonToggleValue({
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
    handleChangeBase,
    deleteComparison,
    handleChangeSelect,
  } = useChangeComparisonFuncs({
    fieldsArray,
    setFieldsArray,
    id,
    comparisonIndex,
  });

  return (
    <QuestionOptionWrapper>
      <ListItemText>Value Must Be</ListItemText>
      <IconButton sx={{ mr: 0.5 }} onClick={deleteComparison}>
        <Close color='error' />
      </IconButton>
      <FormControl>
        {/*
        <BootstrapInput
          sx={{
            width: 150,
            '& .MuiInputBase-input': {
              height: '18px',
            },
          }}
          className={'lightGreyDisable'}
          id='comparison-value'
          value={current_comparison_value ? current_comparison_value : ''}
          placeholder='Insert a value'
          onChange={handleChange}
        />
        */}
        <Select
          sx={{
            width: 150,
            height: 40,
            '& .MuiInputBase-input': {
              height: '18px',
            },
          }}
          id='comparison-value'
          placeholder='Select a value'
          value={
            current_comparison_value ? String(current_comparison_value) : ''
          }
          onChange={handleChangeSelect}
        >
          <MenuItem value='true'>Toggled</MenuItem>
          <MenuItem value='false'>Not Toggled</MenuItem>
        </Select>
      </FormControl>
    </QuestionOptionWrapper>
  );
}
