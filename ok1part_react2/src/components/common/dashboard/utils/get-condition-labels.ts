import { FieldsArray, IDependencyObject } from '../form-renderer';
import minusPercentage from './minus-percentage';
import plusPercentage from './plus-percentage';

export default function getConditionLabels(
  condition: IDependencyObject,
  fieldsArray: FieldsArray,
  index: number
): [string, string] {
  const typeOfCondition = condition.typeOfCondition;
  const questionToCompare = condition.questionIndex;
  const typeOfComparison = condition?.comparison?.type;
  let valueOfComparison = condition?.comparison?.comparisonValue;
  if (typeof valueOfComparison !== 'string') {
    valueOfComparison =
      typeof valueOfComparison === 'number' ? String(valueOfComparison) : '';
  }
  const secondaryValue = condition?.comparison?.secondaryValue || 0;

  const questionNumber = (questionToCompare as number) + 1;

  const selectedOption =
    typeof questionToCompare === 'number' &&
    (fieldsArray[questionToCompare]?.fieldConfig?.options || []).find(
      (option) => option.id === valueOfComparison
    );

  switch (typeOfCondition) {
    case 'parent-success':
      return [`Q.${questionNumber} - Outcome Was Successful`, ''];
    case 'parent-fail':
      return [`Q.${questionNumber} - Outcome Was NOT Successful`, ''];
    case 'parent-compare':
      switch (typeOfComparison) {
        case 'exact':
          return [
            `Q.${questionNumber} - Answer Value Was Exactly`,
            valueOfComparison,
          ];
        case 'minValue':
          return [
            `Q.${questionNumber} - Answer Value Was`,
            '> ' + valueOfComparison,
          ];
        case 'maxValue':
          return [
            `Q.${questionNumber} - Answer Value Was`,
            '< ' + valueOfComparison,
          ];
        case 'minValueEq':
          return [
            `Q.${questionNumber} - Answer Value Was`,
            '≤ ' + valueOfComparison,
          ];
        case 'maxValueEq':
          return [
            `Q.${questionNumber} - Answer Value Was`,
            '≥ ' + valueOfComparison,
          ];
        case 'percentMarginErrorInferior':
          return [
            `Q.${questionNumber} - Inferior Margin Of Error ( ${secondaryValue}% below ${valueOfComparison} )`,
            '> ' +
              minusPercentage(
                Number(secondaryValue),
                Number(valueOfComparison),
                false
              ),
          ];
        case 'percentMarginErrorSuperior':
          return [
            `Q.${questionNumber} - Superior Margin Of Error ( ${secondaryValue}% above ${valueOfComparison} )`,
            '< ' +
              plusPercentage(
                Number(secondaryValue),
                Number(valueOfComparison),
                false
              ),
          ];
        case 'percentMarginErrorInferiorEq':
          return [
            `Q.${questionNumber} - Inferior Margin Of Error ( ${secondaryValue}% below ${valueOfComparison} )`,
            '≥ ' +
              minusPercentage(
                Number(secondaryValue),
                Number(valueOfComparison),
                false
              ),
          ];
        case 'percentMarginErrorSuperiorEq':
          return [
            `Q.${questionNumber} - Superior Margin Of Error ( ${secondaryValue}% above ${valueOfComparison} )`,
            '≤ ' +
              plusPercentage(
                Number(secondaryValue),
                Number(valueOfComparison),
                false
              ),
          ];
        case 'toggleValue':
          return [
            `Q.${questionNumber} - Answer Value Was`,
            valueOfComparison === 'true' ? 'Toggled' : 'Not Toggled',
          ];
        case 'isChecked':
          return [
            `Q.${questionNumber} - Answer Value Was`,
            valueOfComparison === 'true' ? 'Checked' : 'Not Checked',
          ];
        case 'selectedOption':
          return [
            `Q.${questionNumber} - Answer Was`,
            '"' +
              ((typeof selectedOption === 'object' && selectedOption?.label) ||
                '') +
              '"',
          ];
      }
    default:
      return ['', ''];
    //throw Error('Invalid Type of Condition, or Invalid Type of Comparison');
  }

  return ['Q.1 - Success', ''];
}
