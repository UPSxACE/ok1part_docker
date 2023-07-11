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

export default function SelectParent({
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
    const value = event.target.value;

    if (value === 'cancel') {
      setFieldsArray((currentState) => {
        // Debug: console.log('Not last; value: ', value);
        const newArray: FieldsArray = Object.assign([], currentState);
        if (typeof depIndex === 'number') {
          newArray[fieldId].deps?.splice(depIndex, 1);
        }

        return newArray;
      });
      return;
    }

    setFieldsArray((currentState) => {
      const newArray: FieldsArray = Object.assign([], currentState);

      const newFieldObject: IFieldObject = Object.assign({}, newArray[fieldId]);
      const questionIndex = newArray.findIndex((field) => field.id_ === value);

      if (!newFieldObject.deps) {
        newFieldObject.deps = [];
      }

      const depIndexToUpdate = depIndex || 0;

      if (!newFieldObject.deps[depIndexToUpdate]) {
        throw new Error('Dependency does not exist.');
      }

      newFieldObject.deps[depIndexToUpdate].questionIndex = questionIndex;

      return newArray;

      //newArray.splice(fieldId, 1, newFieldObject);
      //return newArray;
    });
  };

  return (
    <QuestionOptionWrapper sx={{ borderTop: '1px solid #d1d1d1' }}>
      <ListItemText
        sx={{
          color: 'primary.main',
          '& .MuiTypography-root': { fontWeight: 'bold' },
        }}
      >
        Select the Parent Question
      </ListItemText>
      <FormControl>
        <Select
          sx={{
            width: 150,
            height: 40,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
              borderWidth: 3,
            },
          }}
          id='select-parent'
          labelId='select-parent-label'
          value={''}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value='cancel'>Cancel</MenuItem>
          {fieldsArray.map((field, index) => {
            if (field.id_ === fieldsArray[fieldId].id_) {
              return null;
            }
            return (
              <MenuItem key={index} value={field.id_}>
                {index + 1}. {field.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </QuestionOptionWrapper>
  );
}
