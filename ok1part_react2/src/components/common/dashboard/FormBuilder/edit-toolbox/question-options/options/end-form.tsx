import { Checkbox, ListItemText } from '@mui/material';
import { IEditToolboxProps } from '../..';
import QuestionOptionWrapper from '../question-option-wrapper';
import { FieldsArray } from '@/components/common/dashboard/form-renderer';

export default function EndForm({
  children,
  id,
  focusedElement,
  setFocusedElement,
  actions,
  renderQuestionOptions = true,
  fieldsArray,
  setFieldsArray,
}: IEditToolboxProps) {
  const checked = fieldsArray?.[id - 1]?.outcomeConfig?.endOnFail;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    setFieldsArray((currentState) => {
      const newFieldsArray: FieldsArray = Object.assign([], currentState);
      if (!fieldsArray[id - 1]?.outcomeConfig) {
        fieldsArray[id - 1].outcomeConfig = {};
      }
      (fieldsArray[id - 1].outcomeConfig as { [key: string]: any }).endOnFail =
        value; // NOTE: Slightly dangerous use of any keyword
      return newFieldsArray;
    });
  };

  return (
    <QuestionOptionWrapper>
      <ListItemText>End Form If Comparison Fails</ListItemText>
      <Checkbox
        checked={typeof checked === 'boolean' ? checked : false}
        onChange={handleChange}
        sx={{ padding: 0 }}
      />
    </QuestionOptionWrapper>
  );
}
