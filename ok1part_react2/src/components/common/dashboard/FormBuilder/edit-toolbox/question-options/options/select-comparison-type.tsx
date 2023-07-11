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
  IDependencyComparisonObject,
  IFieldObject,
} from '@/components/common/dashboard/form-renderer';

export default function SelectDepComparisonType({
  children,
  id,
  focusedElement,
  setFocusedElement,
  actions,
  renderQuestionOptions = true,
  fieldsArray,
  setFieldsArray,
  depIndex,
  options,
}: IEditToolboxProps & { depIndex?: number; options: React.ReactNode | null }) {
  const fieldId = id - 1;

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as
      | IDependencyComparisonObject['type']
      | 'cancel';

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

      if (!newFieldObject.deps) {
        newFieldObject.deps = [];
      }

      const depIndexToUpdate = depIndex || 0;

      if (!newFieldObject.deps[depIndexToUpdate]) {
        throw new Error('Dependency does not exist.');
      }

      const depRef = newFieldObject.deps[depIndexToUpdate];
      if (!depRef.comparison) {
        depRef.comparison = { type: value };
      } else {
        depRef.comparison.type = value;
      }

      newArray.splice(fieldId, 1, newFieldObject);

      return newArray;
    });
  };

  return (
    <QuestionOptionWrapper>
      <ListItemText
        sx={{
          color: 'primary.main',
          '& .MuiTypography-root': { fontWeight: 'bold' },
        }}
      >
        Select the Comparison Type
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
          id='select-comparison-type'
          labelId='select-comparison-type-label'
          value={''}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value='cancel'>Cancel</MenuItem>
          {options}
        </Select>
      </FormControl>
    </QuestionOptionWrapper>
  );
}
