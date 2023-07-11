import {
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { IEditToolboxProps } from '../..';
import QuestionOptionWrapper from '../question-option-wrapper';
import { IFieldObject } from '@/components/common/dashboard/form-renderer';
import getSettingValueLabel from '@/components/common/dashboard/utils/get-setting-value-label';

export default function ShowQuestion({
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
      | 'always'
      | 'conditions-met'
      | 'disabled';

    setFieldsArray((currentState) => {
      const newFieldsArray = currentState.map((field, index) => {
        if (index !== id - 1) {
          return field;
        }

        const newField: IFieldObject = {
          ...field,
          showQuestion: value,
        };

        return newField;
      });
      return newFieldsArray;
    });
  };

  const current = fieldsArray[id - 1]?.['showQuestion'];

  return (
    <QuestionOptionWrapper>
      <ListItemText>Show Question</ListItemText>
      <Select
        sx={{ width: 150, height: 40 }}
        id='reason'
        labelId='reason-label'
        value={current ? current : 'always'}
        onChange={handleChange}
      >
        <MenuItem value='always'>
          {getSettingValueLabel('show-question', 'always')}
        </MenuItem>
        <MenuItem value='conditions-met'>
          {getSettingValueLabel('show-question', 'conditions-met')}
        </MenuItem>
        <MenuItem value='disabled'>
          {getSettingValueLabel('show-question', 'disabled')}
        </MenuItem>
      </Select>
    </QuestionOptionWrapper>
  );
}
