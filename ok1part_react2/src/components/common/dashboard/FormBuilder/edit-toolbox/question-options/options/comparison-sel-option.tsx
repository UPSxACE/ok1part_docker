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

export default function ComparisonSelOption({
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

  const fieldRef = fieldsArray[id - 1];

  return (
    <QuestionOptionWrapper>
      <ListItemText>Selected Option Was</ListItemText>
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
            height: 40,
            width: 150,
            '& .MuiInputBase-input': {
              height: '18px',
            },
          }}
          id='comparison-value'
          placeholder='Select an option'
          value={
            current_comparison_value ? String(current_comparison_value) : ''
          }
          onChange={handleChangeSelect}
        >
          {(fieldRef?.fieldConfig?.options || []).map((option, index) => {
            return (
              <MenuItem key={index} value={option.id}>
                {option.label || 'Option ' + (index + 1)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </QuestionOptionWrapper>
  );
}
