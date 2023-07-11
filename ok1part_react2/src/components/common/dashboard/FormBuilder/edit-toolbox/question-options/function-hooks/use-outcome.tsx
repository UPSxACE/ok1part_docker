import {
  IComparisonObject,
  IFieldObject,
} from '@/components/common/dashboard/form-renderer';
import useIsOf from './use-is-of';
import { ComparisonOption } from '../options/add-comparison-setting';

// ANCHOR - Types of Validation to be rendered in the 'Add Comparison' menu
// If you want to add a new comparison, add it's name here, and also implement the necessary code in the next ANCHORs
const possibleComparisonOptions: IComparisonObject['comparisonType'][] = [
  'exact',
  'minValue',
  'minValueEq',
  'maxValue',
  'maxValueEq',
  'percentMarginErrorInferior',
  'percentMarginErrorInferiorEq',
  'percentMarginErrorSuperior',
  'percentMarginErrorSuperiorEq',
  'toggleValue',
  'isChecked',
  'selectedOption',
];

interface IUseOutcomeProps {
  fieldRef: IFieldObject;
  isOfType: ReturnType<typeof useIsOf>['isOfType'];
  isOfValueType: ReturnType<typeof useIsOf>['isOfValueType'];
}

export default function useOutcome({
  fieldRef,
  isOfType,
  isOfValueType,
}: IUseOutcomeProps) {
  function checkCompOptionAlreadyAdded(
    comparisonToSearch:
      | IComparisonObject['comparisonType']
      | IComparisonObject['comparisonType'][]
  ) {
    if (typeof comparisonToSearch === 'string') {
      const i = (fieldRef?.outcomeConfig?.comparisons || []).findIndex(
        (comparison) => comparison.comparisonType === comparisonToSearch
      );

      return i !== -1;
    }

    let found = false;

    comparisonToSearch.forEach((comparisonBeingSearched) => {
      if (!found) {
        const i = (fieldRef?.outcomeConfig?.comparisons || []).findIndex(
          (comparison) => comparison.comparisonType === comparisonBeingSearched
        );

        found = i !== -1;
      }
    });

    return found;
  }

  function conditionSettingAvailable(
    comparisonOption: IComparisonObject['comparisonType'],
    checkAlreadyAdded: boolean = false
  ) {
    // If checkAlreadyAdded is set to true,
    // check if that type of validation wasn't already added yet fist,
    // and if that's the case return false immediately
    if (checkAlreadyAdded) {
      const ruleAlreadyAdded = checkCompOptionAlreadyAdded(comparisonOption);
      // Debug: console.log('checkAlreadyAdded:', comparisonOption);
      if (ruleAlreadyAdded) {
        return false;
      }
    }

    // ANCHOR - validate the availability of an option
    switch (comparisonOption) {
      case 'exact':
        return (
          isOfType(['short-answer']) &&
          isOfValueType(['text', 'integer']) &&
          !checkCompOptionAlreadyAdded([
            'maxValue',
            'maxValueEq',
            'minValue',
            'minValueEq',
            'percentMarginErrorInferior',
            'percentMarginErrorInferiorEq',
            'percentMarginErrorSuperior',
            'percentMarginErrorSuperiorEq',
          ])
        );
      case 'minValue':
        return (
          isOfType(['short-answer']) &&
          isOfValueType(['integer', 'decimal']) &&
          !checkCompOptionAlreadyAdded([
            'exact',
            'minValueEq',
            'percentMarginErrorInferior',
            'percentMarginErrorInferiorEq',
            'percentMarginErrorSuperior',
            'percentMarginErrorSuperiorEq',
          ])
        );
      case 'minValueEq':
        return (
          isOfType(['short-answer']) &&
          isOfValueType(['integer', 'decimal']) &&
          !checkCompOptionAlreadyAdded([
            'exact',
            'minValue',
            'percentMarginErrorInferior',
            'percentMarginErrorInferiorEq',
            'percentMarginErrorSuperior',
            'percentMarginErrorSuperiorEq',
          ])
        );
      case 'maxValue':
        return (
          isOfType(['short-answer']) &&
          isOfValueType(['integer', 'decimal']) &&
          !checkCompOptionAlreadyAdded([
            'exact',
            'maxValueEq',
            'percentMarginErrorInferior',
            'percentMarginErrorInferiorEq',
            'percentMarginErrorSuperior',
            'percentMarginErrorSuperiorEq',
          ])
        );
      case 'maxValueEq':
        return (
          isOfType(['short-answer']) &&
          isOfValueType(['integer', 'decimal']) &&
          !checkCompOptionAlreadyAdded([
            'exact',
            'maxValue',
            'percentMarginErrorInferior',
            'percentMarginErrorInferiorEq',
            'percentMarginErrorSuperior',
            'percentMarginErrorSuperiorEq',
          ])
        );
      case 'percentMarginErrorInferior':
        return (
          isOfType(['short-answer']) &&
          isOfValueType(['integer', 'decimal']) &&
          !checkCompOptionAlreadyAdded([
            'exact',
            'maxValue',
            'maxValueEq',
            'minValue',
            'minValueEq',
            'percentMarginErrorInferiorEq',
          ])
        );
      case 'percentMarginErrorInferiorEq':
        return (
          isOfType(['short-answer']) &&
          isOfValueType(['integer', 'decimal']) &&
          !checkCompOptionAlreadyAdded([
            'exact',
            'maxValue',
            'maxValueEq',
            'minValue',
            'minValueEq',
            'percentMarginErrorInferior',
          ])
        );
      case 'percentMarginErrorSuperior':
        return (
          isOfType(['short-answer']) &&
          isOfValueType(['integer', 'decimal']) &&
          !checkCompOptionAlreadyAdded([
            'exact',
            'maxValue',
            'maxValueEq',
            'minValue',
            'minValueEq',
            'percentMarginErrorSuperiorEq',
          ])
        );
      case 'percentMarginErrorSuperiorEq':
        return (
          isOfType(['short-answer']) &&
          isOfValueType(['integer', 'decimal']) &&
          !checkCompOptionAlreadyAdded([
            'exact',
            'maxValue',
            'maxValueEq',
            'minValue',
            'minValueEq',
            'percentMarginErrorSuperior',
          ])
        );
      case 'toggleValue':
        return isOfType(['toggle-label']);
      case 'isChecked':
        return isOfType(['checkbox']);
      case 'selectedOption':
        return isOfType(['select', 'radio', 'radio-color', 'radio-image']);
      default:
        return false;
    }
  }

  function getConditionsOptions() {
    // ANCHOR - Add Comparison Menu Options
    return possibleComparisonOptions
      .map((comparisonType, index) => {
        if (
          comparisonType === 'exact' &&
          conditionSettingAvailable('exact', true)
        )
          return (
            <ComparisonOption key={index} value={'exact'} label='Exact Value' />
          );
        if (
          comparisonType === 'minValue' &&
          conditionSettingAvailable('minValue', true)
        )
          return (
            <ComparisonOption
              key={index}
              value={'minValue'}
              label='Minimum Value ( > )'
            />
          );
        if (
          comparisonType === 'minValueEq' &&
          conditionSettingAvailable('minValueEq', true)
        )
          return (
            <ComparisonOption
              key={index}
              value={'minValueEq'}
              label='Minimum Value ( ≥ )'
            />
          );
        if (
          comparisonType === 'maxValue' &&
          conditionSettingAvailable('maxValue', true)
        )
          return (
            <ComparisonOption
              key={index}
              value={'maxValue'}
              label='Maximum Value ( < )'
            />
          );
        if (
          comparisonType === 'maxValueEq' &&
          conditionSettingAvailable('maxValueEq', true)
        )
          return (
            <ComparisonOption
              key={index}
              value={'maxValueEq'}
              label='Maximum Value ( ≤ )'
            />
          );
        if (
          comparisonType === 'percentMarginErrorInferior' &&
          conditionSettingAvailable('percentMarginErrorInferior', true)
        )
          return (
            <ComparisonOption
              key={index}
              value={'percentMarginErrorInferior'}
              label='Inferior % Margin Of Error ( < )'
            />
          );
        if (
          comparisonType === 'percentMarginErrorInferiorEq' &&
          conditionSettingAvailable('percentMarginErrorInferiorEq', true)
        )
          return (
            <ComparisonOption
              key={index}
              value={'percentMarginErrorInferiorEq'}
              label='Inferior % Margin Of Error ( ≤ )'
            />
          );
        if (
          comparisonType === 'percentMarginErrorSuperior' &&
          conditionSettingAvailable('percentMarginErrorSuperior', true)
        )
          return (
            <ComparisonOption
              key={index}
              value={'percentMarginErrorSuperior'}
              label='Superior % Margin Of Error ( > )'
            />
          );
        if (
          comparisonType === 'percentMarginErrorSuperiorEq' &&
          conditionSettingAvailable('percentMarginErrorSuperiorEq', true)
        )
          return (
            <ComparisonOption
              key={index}
              value={'percentMarginErrorSuperiorEq'}
              label='Superior % Margin Of Error ( ≥ )'
            />
          );
        if (
          comparisonType === 'toggleValue' &&
          conditionSettingAvailable('toggleValue', true)
        )
          return (
            <ComparisonOption
              key={index}
              value={'toggleValue'}
              label='Toggle Value'
            />
          );
        if (
          comparisonType === 'isChecked' &&
          conditionSettingAvailable('isChecked', true)
        )
          return (
            <ComparisonOption
              key={index}
              value={'isChecked'}
              label='Is Checked'
            />
          );
        if (
          comparisonType === 'selectedOption' &&
          conditionSettingAvailable('selectedOption', true)
        )
          return (
            <ComparisonOption
              key={index}
              value={'selectedOption'}
              label='Selected Option'
            />
          );
        return null;
      })
      .filter((x) => x !== null);
  }

  const conditionsAvailable = getConditionsOptions();

  return {
    conditionSettingAvailable,
    conditionsAvailable,
  };
}
