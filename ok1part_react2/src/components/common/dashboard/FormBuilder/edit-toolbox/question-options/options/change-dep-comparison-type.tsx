import { ListItemText, Typography } from '@mui/material';
import { IEditToolboxProps } from '../..';
import QuestionOptionWrapper from '../question-option-wrapper';
import { FieldsArray } from '@/components/common/dashboard/form-renderer';

export default function ChangeDepComparisonType({
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
  const curr =
    typeof depIndex === 'number'
      ? fieldsArray?.[id - 1]?.deps?.[depIndex]?.comparison?.type
      : '';

  const fieldId = id - 1;
  const questionIndex =
    typeof depIndex === 'number'
      ? fieldsArray?.[fieldId]?.deps?.[depIndex]?.questionIndex
      : null;
  const selectedQuestionId =
    typeof questionIndex === 'number' ? fieldsArray[questionIndex].id_ : null;

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

    if (typeof curr !== 'string') {
      throw new Error('Dependency does not exist3.');
    }

    switch (curr) {
      case 'exact':
        return 'Exact Value';
      case 'maxValue':
        return 'Maximum Value ( < )';
      case 'minValueEq':
        return 'Minimum Value ( ≥ )';
      case 'maxValueEq':
        return 'Maximum Value ( ≤ )';
      case 'minValue':
        return 'Minimum Value ( > )';
      case 'percentMarginErrorInferior':
        return 'Inferior % Margin Of Error ( < )';
      case 'percentMarginErrorInferiorEq':
        return 'Inferior % Margin Of Error ( ≤ )';
      case 'percentMarginErrorSuperior':
        return 'Superior % Margin Of Error ( > )';
      case 'percentMarginErrorSuperiorEq':
        return 'Superior % Margin Of Error ( ≥ )';
      case 'toggleValue':
        return 'Toggle Value';
      case 'isChecked':
        return 'Is Checked';
      case 'selectedOption':
        return 'Selected Option';
    }
  }

  return (
    <QuestionOptionWrapper>
      <ListItemText>Comparison Type</ListItemText>

      <Typography>{generateLabel()}</Typography>
    </QuestionOptionWrapper>
  );
}
