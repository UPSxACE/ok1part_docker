import {
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { IEditToolboxProps } from '../..';
import QuestionOptionWrapper from '../question-option-wrapper';
import {
  FieldsArray,
  IFieldObject,
} from '@/components/common/dashboard/form-renderer';

export default function NewCondition({
  children,
  id,
  focusedElement,
  setFocusedElement,
  actions,
  renderQuestionOptions = true,
  fieldsArray,
  setFieldsArray,
  depIndex,
}: IEditToolboxProps & { depIndex?: number }) {
  const fieldId = id - 1;
  const depsCount = fieldsArray?.[fieldId || 0]?.deps?.length;

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as
      | 'parent-success'
      | 'parent-fail'
      | 'parent-compare';

    setFieldsArray((currentState) => {
      const newArray: FieldsArray = Object.assign([], currentState);

      const newFieldObject: IFieldObject = Object.assign({}, newArray[fieldId]);

      if (!newFieldObject.deps) {
        newFieldObject.deps = [];
      }

      newFieldObject.deps.push({
        typeOfCondition: value,
      });

      newArray.splice(fieldId, 1, newFieldObject);

      return newArray;
    });
  };

  return (
    <QuestionOptionWrapper sx={{ borderTop: '1px solid #d1d1d1' }}>
      <ListItemText>New Condition</ListItemText>
      <FormControl>
        <Select
          sx={{ width: 150, height: 40 }}
          id='new-condition'
          labelId='new-condition-label'
          value={''}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value='parent-success'>
            Parent Question was Successful
          </MenuItem>
          <MenuItem value='parent-fail'>
            Parent Question was Not Successful
          </MenuItem>
          <MenuItem value='parent-compare'>
            Compare Parent Question Answer Value
          </MenuItem>
        </Select>
      </FormControl>
    </QuestionOptionWrapper>
  );
}
