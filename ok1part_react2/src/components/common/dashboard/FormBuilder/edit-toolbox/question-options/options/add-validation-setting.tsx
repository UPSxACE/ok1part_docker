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
import { ValidationType } from '@/components/common/dashboard/form-renderer/use-init-form';

interface IValidationOptionProps {
  value: string;
  label: string;
}

export function ValidationOption(props: IValidationOptionProps) {
  // Despite the props types declaration,
  // this component will also receive all the necessary props
  // from the father 'Select' mui component

  const { value, label } = props;

  return (
    <MenuItem {...props} value={value}>
      {label}
    </MenuItem>
  );
}

export default function AddValidationSetting({
  children,
  id,
  focusedElement,
  setFocusedElement,
  actions,
  renderQuestionOptions = true,
  fieldsArray,
  setFieldsArray,
}: IEditToolboxProps & { children: React.ReactNode }) {
  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as ValidationType['name'];

    let validationType: ValidationType | null = null;
    switch (value) {
      case 'exactLength':
        validationType = {
          name: 'exactLength',
          value: 0,
          message: 'The answer length is invalid.',
        };
        break;
      case 'minLength':
        validationType = {
          name: 'minLength',
          value: 0,
          message: 'The answer is too short.',
        };
        break;
      case 'minLengthEq':
        validationType = {
          name: 'minLengthEq',
          value: 0,
          message: 'The answer is too short.',
        };
        break;
      case 'maxLength':
        validationType = {
          name: 'maxLength',
          value: 0,
          message: 'The answer is too long.',
        };
        break;
      case 'maxLengthEq':
        validationType = {
          name: 'maxLengthEq',
          value: 0,
          message: 'The answer is too long.',
        };
        break;
      case 'minValue':
        validationType = {
          name: 'minValue',
          value: 0,
          message: 'The value introduced is too low.',
        };
        break;
      case 'minValueEq':
        validationType = {
          name: 'minValueEq',
          value: 0,
          message: 'The value introduced is too low.',
        };
        break;
      case 'maxValue':
        validationType = {
          name: 'maxValue',
          value: 0,
          message: 'The value introduced is too high.',
        };
        break;
      case 'maxValueEq':
        validationType = {
          name: 'maxValueEq',
          value: 0,
          message: 'The value introduced is too high.',
        };
        break;
      default:
        throw Error('Invalid validation type');
    }

    // Debug: console.log('Validation Type:', validationType);

    if (validationType !== null) {
      setFieldsArray((currentState) => {
        const newFieldsArray: FieldsArray = Object.assign([], currentState);
        if (!newFieldsArray[id - 1].rules) {
          newFieldsArray[id - 1].rules = [];
        }
        if (newFieldsArray[id - 1]) {
          if ((newFieldsArray[id - 1] as IFieldObject).rules) {
            (newFieldsArray[id - 1] as IFieldObject).rules = (
              (newFieldsArray[id - 1] as IFieldObject).rules as ValidationType[]
            ).concat(validationType as ValidationType);
          }
        }

        //Debug: console.log('After update:', newFieldsArray[id - 1].rules);

        return newFieldsArray;
      });
    }

    /*
    setFieldsArray((currentState) => {
      const newFieldsArray = currentState.map((field, index) => {
        if (index !== id - 1) {
          return field;
        }

        const newField: IFieldObject = {
          ...field,
          fieldConfig: { ...field.fieldConfig, valueType: value },
        };

        return newField;
      });
      return newFieldsArray;
    });
    */
  };

  const current = fieldsArray[id - 1]?.['fieldConfig']?.['valueType'];

  return (
    <QuestionOptionWrapper>
      <ListItemText>Add Validation</ListItemText>
      <FormControl>
        <Select
          sx={{ width: 150, height: 40 }}
          id='add-validation-setting'
          labelId='add-validation-setting-label'
          value={''}
          onChange={handleChange}
        >
          {children}
        </Select>
      </FormControl>
    </QuestionOptionWrapper>
  );
}
