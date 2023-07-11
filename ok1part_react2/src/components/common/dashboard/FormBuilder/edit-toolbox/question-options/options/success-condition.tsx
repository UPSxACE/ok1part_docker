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

export default function SuccessMode({
  children,
  id,
  focusedElement,
  setFocusedElement,
  actions,
  renderQuestionOptions = true,
  fieldsArray,
  setFieldsArray,
}: IEditToolboxProps) {
  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as 'always' | 'comparison';

    setFieldsArray((currentState) => {
      const newFieldsArray = currentState.map((field, index) => {
        if (index !== id - 1) {
          return field;
        }

        const newField: IFieldObject = {
          ...field,
          outcomeConfig: { ...field.outcomeConfig, successMode: value },
        };

        return newField;
      });
      return newFieldsArray;
    });
  };

  const current = fieldsArray[id - 1]?.['outcomeConfig']?.['successMode'];

  return (
    <QuestionOptionWrapper>
      <ListItemText>Success Mode</ListItemText>
      <FormControl>
        <Select
          sx={{ width: 150, height: 40 }}
          id='success-condition'
          labelId='success-condition-label'
          value={current || 'always'}
          onChange={handleChange}
        >
          <MenuItem value='always'>Always Success</MenuItem>
          <MenuItem value='comparison'>Comparisons</MenuItem>
        </Select>
      </FormControl>
    </QuestionOptionWrapper>
  );
}
