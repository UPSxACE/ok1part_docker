import { FieldsArray, IComparisonObject } from '../form-renderer';
import minusPercentage from './minus-percentage';
import plusPercentage from './plus-percentage';

export default function getOutcomeComparisonLabels(
  comparison: IComparisonObject,
  fieldsArray: FieldsArray,
  index: number
): [string, string] {
  const typeOfComparison = comparison.comparisonType;
  let value = comparison.comparisonConfig?.comparisonValue;
  let secValue = comparison.comparisonConfig?.secondaryValue;

  if (typeof value !== 'string') {
    value = typeof value === 'number' ? String(value) : '';
  }

  const selectedOption = (fieldsArray[index]?.fieldConfig?.options || []).find(
    (option) => option.id === value
  );

  switch (typeOfComparison) {
    case 'exact':
      return [`Answer Value Is Exactly`, value];
    case 'minValue':
      return [`Answer Value Is`, '> ' + value];
    case 'maxValue':
      return [`Answer Value Is`, '< ' + value];
    case 'minValueEq':
      return [`Answer Value Is`, '≥ ' + value];
    case 'maxValueEq':
      return [`Answer Value Is`, '≤ ' + value];
    case 'percentMarginErrorInferior':
      return [
        `Inferior Margin Of Error ( ${secValue}% below ${value} )`,
        '> ' + minusPercentage(Number(secValue), Number(value), false),
      ];
    case 'percentMarginErrorSuperior':
      return [
        `Superior Margin Of Error ( ${secValue}% above ${value} )`,
        '< ' + plusPercentage(Number(secValue), Number(value), false),
      ];
    case 'percentMarginErrorInferiorEq':
      return [
        `Inferior Margin Of Error ( ${secValue}% below ${value} )`,
        '≥ ' + minusPercentage(Number(secValue), Number(value), false),
      ];
    case 'percentMarginErrorSuperiorEq':
      return [
        `Superior Margin Of Error ( ${secValue}% above ${value} )`,
        '≤ ' + plusPercentage(Number(secValue), Number(value), false),
      ];
    case 'toggleValue':
      return [`Answer Value Was`, value === 'true' ? 'Toggled' : 'Not Toggled'];
    case 'isChecked':
      return [`Answer Value Was`, value === 'true' ? 'Checked' : 'Not Checked'];
    case 'selectedOption':
      return [`Answer Was`, selectedOption?.label || ''];
  }

  return ['', ''];
}
