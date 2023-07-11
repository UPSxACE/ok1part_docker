import { Checkbox, ListItemText } from '@mui/material';
import { IEditToolboxProps } from '../..';
import QuestionOptionWrapper from '../question-option-wrapper';
import { FieldsArray } from '@/components/common/dashboard/form-renderer';

export default function Required({
  children,
  id,
  focusedElement,
  setFocusedElement,
  actions,
  renderQuestionOptions = true,
  fieldsArray,
  setFieldsArray,
}: IEditToolboxProps) {
  const checked = fieldsArray?.[id - 1]?.required;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    setFieldsArray((currentState) => {
      const newFieldsArray: FieldsArray = Object.assign([], currentState);
      newFieldsArray[id - 1].required = value;
      return newFieldsArray;
    });
  };

  return (
    <QuestionOptionWrapper>
      <ListItemText>Required</ListItemText>
      <Checkbox
        checked={checked || false}
        onChange={handleChange}
        sx={{ padding: 0 }}
      />
    </QuestionOptionWrapper>
  );
}
