import {
  FormControl,
  IconButton,
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
import { Close } from '@mui/icons-material';

export default function ChangeParent({
  children,
  id,
  focusedElement,
  setFocusedElement,
  actions,
  renderQuestionOptions = true,
  fieldsArray,
  setFieldsArray,
  last,
  depIndex,
}: IEditToolboxProps & { last?: boolean; depIndex?: number }) {
  const fieldId = id - 1;
  const questionIndex =
    typeof depIndex === 'number'
      ? fieldsArray?.[fieldId]?.deps?.[depIndex]?.questionIndex
      : null;
  const selectedQuestionId =
    typeof questionIndex === 'number' ? fieldsArray[questionIndex].id_ : null;

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;

    setFieldsArray((currentState) => {
      const newArray: FieldsArray = Object.assign([], currentState);

      const newFieldObject: IFieldObject = Object.assign({}, newArray[fieldId]);
      const questionIndex = newArray.findIndex((field) => field.id_ === value);
      const depIndexToUpdate = depIndex || 0;

      if (!newFieldObject?.deps?.[depIndexToUpdate]) {
        throw new Error('Dependency does not exist.');
      }

      if (questionIndex === -1) {
        throw new Error('Negative Index.');
      }

      newFieldObject.deps[depIndexToUpdate] = {
        ...newFieldObject.deps[depIndexToUpdate],
        questionIndex,
      };

      newArray.splice(fieldId, 1, newFieldObject);

      return newArray;
    });
  };

  function deleteCondition() {
    setFieldsArray((currentState) => {
      // Debug: console.log('Not last; value: ', value);
      const newArray: FieldsArray = Object.assign([], currentState);
      if (typeof depIndex === 'number') {
        newArray[fieldId].deps?.splice(depIndex, 1);
      }

      return newArray;
    });
  }

  function generateLabel() {
    if (typeof questionIndex !== 'number') {
      throw new Error('Question does not exist1.');
    }
    if (typeof depIndex !== 'number') {
      throw new Error('Dependency does not exist2.');
    }

    const typeOfCondition =
      fieldsArray?.[id - 1]?.['deps']?.[depIndex]?.typeOfCondition;

    if (!typeOfCondition) {
      throw new Error('Dependency does not exist3.');
    }

    switch (typeOfCondition) {
      case 'parent-success':
        return 'Question Was Successful'; // Parent
      case 'parent-fail':
        return 'Question Was Not Successful'; // Parent
      case 'parent-compare':
        return 'Question to Compare Value'; // Compare Question Value // Compare Parent
    }
  }

  return (
    <QuestionOptionWrapper sx={{ borderTop: '1px solid #d1d1d1' }}>
      <ListItemText>{generateLabel()}</ListItemText>
      <IconButton sx={{ mr: 0.5 }} onClick={deleteCondition}>
        <Close color='error' />
      </IconButton>
      <FormControl>
        <Select
          sx={{ width: 150, height: 40 }}
          id={'condition-' + depIndex}
          labelId={'condition-' + depIndex + '-label'}
          value={selectedQuestionId || ''}
          onChange={handleChange}
          displayEmpty
        >
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
