import {
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { IEditToolboxProps } from '../..';
import QuestionOptionWrapper from '../question-option-wrapper';
import { IFieldObject } from '@/components/common/dashboard/form-renderer';

export default function TypeOfValue({
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
    const value = event.target.value as 'text' | 'integer' | 'decimal';

    setFieldsArray((currentState) => {
      const newFieldsArray = currentState.map((field, index) => {
        if (index !== id - 1) {
          return field;
        }

        const newField: IFieldObject = {
          ...field,
          fieldConfig: { valueType: value }, //{ ...field.fieldConfig, valueType: value },
          outcomeConfig: undefined,
          workflowConfig: undefined,
          rules: undefined,
        };

        return newField;
      });
      return newFieldsArray;
    });
  };

  const current = fieldsArray[id - 1]?.['fieldConfig']?.['valueType'];

  return (
    <QuestionOptionWrapper>
      <ListItemText>Type of Value</ListItemText>
      <FormControl>
        <Select
          sx={{ width: 150, height: 40 }}
          id='type-of-value'
          labelId='type-of-value-label'
          value={current || 'text'}
          onChange={handleChange}
        >
          <MenuItem value='text'>Text</MenuItem>
          <MenuItem value='integer'>Integer</MenuItem>
          <MenuItem value='decimal'>Decimal</MenuItem>
        </Select>
      </FormControl>
    </QuestionOptionWrapper>
  );
}
