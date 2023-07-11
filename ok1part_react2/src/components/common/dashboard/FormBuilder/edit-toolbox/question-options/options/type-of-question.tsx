import {
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { IEditToolboxProps } from '../..';
import {
  FieldType,
  FieldsArray,
} from '@/components/common/dashboard/form-renderer';
import QuestionOptionWrapper from '../question-option-wrapper';
import getSettingValueLabel from '@/components/common/dashboard/utils/get-setting-value-label';

export default function TypeOfQuestion({
  children,
  id,
  focusedElement,
  setFocusedElement,
  actions,
  renderQuestionOptions = true,
  fieldsArray,
  setFieldsArray,
  resetForm,
}: IEditToolboxProps) {
  const handleChange = (event: SelectChangeEvent) => {
    const c_fieldsarray: FieldsArray = Object.assign([], fieldsArray);
    c_fieldsarray[focusedElement - 1]['type'] = event.target.value as FieldType;
    c_fieldsarray[focusedElement - 1]['showQuestion'] = undefined;
    c_fieldsarray[focusedElement - 1]['rules'] = undefined;
    c_fieldsarray[focusedElement - 1]['outcomeConfig'] = undefined;
    c_fieldsarray[focusedElement - 1]['workflowConfig'] = undefined;
    c_fieldsarray[focusedElement - 1]['fieldConfig'] = undefined;

    setFieldsArray(c_fieldsarray);
    resetForm();
  };

  return (
    <QuestionOptionWrapper>
      <ListItemText>Type of Question</ListItemText>
      <FormControl>
        <Select
          sx={{ width: 150, height: 40 }}
          id='type-of-question'
          labelId='type-of-question-label'
          value={
            focusedElement === 0 || !fieldsArray?.[focusedElement - 1]?.['type']
              ? ''
              : fieldsArray[focusedElement - 1]['type']
          }
          onChange={handleChange}
        >
          {/* ANCHOR - type of question options */}
          <MenuItem value='short-answer'>
            {getSettingValueLabel('type-of-question', 'short-answer')}
          </MenuItem>
          <MenuItem value='long-answer'>
            {getSettingValueLabel('type-of-question', 'long-answer')}
          </MenuItem>
          <MenuItem value='toggle-label'>
            {getSettingValueLabel('type-of-question', 'toggle-label')}
          </MenuItem>
          <MenuItem value='radio'>
            {getSettingValueLabel('type-of-question', 'radio')}
          </MenuItem>
          <MenuItem value='select'>
            {getSettingValueLabel('type-of-question', 'select')}
          </MenuItem>
        </Select>
      </FormControl>
    </QuestionOptionWrapper>
  );
}
