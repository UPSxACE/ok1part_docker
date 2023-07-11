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
  IComparisonObject,
  IFieldObject,
} from '@/components/common/dashboard/form-renderer';

interface IComparisonOptionProps {
  value: string;
  label: string;
}

export function ComparisonOption(props: IComparisonOptionProps) {
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

export default function AddComparisonSetting({
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
    // Debug: console.log('ADD COMPARISON TRIGGERED');
    const value = event.target.value as IComparisonObject['comparisonType'];
    // Debug: console.log('COMPARISON VALUE:', value);

    let comparisonObject: IComparisonObject | null = null;
    switch (value) {
      case 'exact':
        comparisonObject = {
          comparisonType: 'exact',
        };
        break;
      case 'minValue':
        comparisonObject = {
          comparisonType: 'minValue',
        };
        break;
      case 'maxValue':
        comparisonObject = {
          comparisonType: 'maxValue',
        };
        break;
      case 'minValueEq':
        comparisonObject = {
          comparisonType: 'minValueEq',
        };
        break;
      case 'maxValueEq':
        comparisonObject = {
          comparisonType: 'maxValueEq',
        };
        break;
      case 'percentMarginErrorInferior':
        comparisonObject = {
          comparisonType: 'percentMarginErrorInferior',
        };
        break;
      case 'percentMarginErrorInferiorEq':
        comparisonObject = {
          comparisonType: 'percentMarginErrorInferiorEq',
        };
        break;
      case 'percentMarginErrorSuperior':
        comparisonObject = {
          comparisonType: 'percentMarginErrorSuperior',
        };
        break;
      case 'percentMarginErrorSuperiorEq':
        comparisonObject = {
          comparisonType: 'percentMarginErrorSuperiorEq',
        };
        break;
      case 'toggleValue':
        comparisonObject = {
          comparisonType: 'toggleValue',
        };
        break;
      case 'isChecked':
        comparisonObject = {
          comparisonType: 'isChecked',
        };
        break;
      case 'selectedOption':
        comparisonObject = {
          comparisonType: 'selectedOption',
        };
        break;
      default:
        throw Error('Invalid validation type');
    }

    if (comparisonObject !== null) {
      // Debug: console.log('COMPARISON OBJECT NOT NULL');
      setFieldsArray((currentState) => {
        const newFieldsArray: FieldsArray = Object.assign([], currentState);
        if (!newFieldsArray[id - 1].outcomeConfig) {
          newFieldsArray[id - 1].outcomeConfig = {};
        }
        if (
          !(
            newFieldsArray[id - 1].outcomeConfig as {
              [key: string]: any; // NOTE - Slightly dangerous use of any keyword
            }
          ).comparisons
        ) {
          (
            newFieldsArray[id - 1].outcomeConfig as {
              [key: string]: any; // NOTE - Slightly dangerous use of any keyword
            }
          ).comparisons = [];
        }
        if (newFieldsArray[id - 1]) {
          if (
            (newFieldsArray[id - 1] as IFieldObject)?.outcomeConfig?.comparisons
          ) {
            (
              (newFieldsArray[id - 1] as IFieldObject).outcomeConfig as {
                [key: string]: any; // NOTE - Slightly dangerous use of any keyword
              }
            ).comparisons = (
              (newFieldsArray[id - 1] as IFieldObject).outcomeConfig
                ?.comparisons as IComparisonObject[]
            ).concat(comparisonObject as IComparisonObject);
          }
        }

        return newFieldsArray;
      });
    }
  };

  const current = fieldsArray[id - 1]?.['fieldConfig']?.['valueType'];

  return (
    <QuestionOptionWrapper>
      <ListItemText>Add Comparison</ListItemText>
      <FormControl>
        <Select
          sx={{ width: 150, height: 40 }}
          id='add-comparison-setting'
          labelId='add-comparison-setting-label'
          value={''}
          onChange={handleChange}
        >
          {children}
        </Select>
      </FormControl>
    </QuestionOptionWrapper>
  );
}
