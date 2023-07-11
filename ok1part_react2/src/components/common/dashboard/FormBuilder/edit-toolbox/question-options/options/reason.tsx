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

export default function Reason({
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
    const value = event.target.value as
      | 'any'
      | 'change-shift-id'
      | 'different-model-id';

    setFieldsArray((currentState) => {
      const newFieldsArray = currentState.map((field, index) => {
        if (index !== id - 1) {
          return field;
        }

        const newField: IFieldObject = {
          ...field,
          workflowConfig: {
            ...field.workflowConfig,
            reason: value === 'any' ? false : value,
          },
        };

        return newField;
      });
      return newFieldsArray;
    });
  };

  const current = fieldsArray[id - 1]?.['workflowConfig']?.['reason'];

  return (
    <QuestionOptionWrapper>
      <ListItemText>Show When Reason Is</ListItemText>
      <FormControl>
        <Select
          sx={{ width: 150, height: 40 }}
          id='reason'
          labelId='reason-label'
          value={current ? current : 'any'}
          onChange={handleChange}
        >
          <MenuItem value='any'>Any</MenuItem>
          <MenuItem value='change-shift-id'>Change of Shift</MenuItem>
          <MenuItem value='different-model-id'>Different Model</MenuItem>
        </Select>
      </FormControl>
    </QuestionOptionWrapper>
  );
}
