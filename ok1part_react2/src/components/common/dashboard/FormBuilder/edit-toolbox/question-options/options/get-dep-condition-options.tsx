import {
  FieldType,
  FieldsArray,
  IDependencyComparisonObject,
  IFieldConfig,
} from '@/components/common/dashboard/form-renderer';
import { MenuItem } from '@mui/material';

// ANCHOR - Types of Validation to be rendered in the 'New Condition' menu
// If you want to add a new comparison, add it's name here, and also implement the necessary code in the next ANCHORs
export const possibleComparisonOptions: IDependencyComparisonObject['type'][] =
  [
    'exact',
    'minValue',
    'minValueEq',
    'maxValue',
    'maxValueEq',
    'percentMarginErrorInferior',
    'percentMarginErrorInferiorEq',
    'percentMarginErrorSuperior',
    'percentMarginErrorSuperiorEq',
    'isChecked',
    'toggleValue',
    'selectedOption',
  ];

export default function getDepConditionsOptions(
  fieldsArray: FieldsArray,
  fieldId: number,
  depIndex: number
) {
  // NOTE - If depIndex, depOriginalIndex, depOriginalFieldRef, depTypeOfQuestion or depValueType is null,
  // some of the checks will be skipped in the depSettingAvailable function

  const fieldRef = fieldsArray[fieldId];
  const depOriginalIndex =
    typeof depIndex === 'number'
      ? fieldsArray[fieldId]?.deps?.[depIndex].questionIndex
      : null;
  const depOriginalFieldRef =
    typeof depOriginalIndex === 'number' ? fieldsArray[depOriginalIndex] : null;
  const depTypeOfQuestion = depOriginalFieldRef
    ? depOriginalFieldRef.type
    : null;
  const depValueType = depOriginalFieldRef
    ? depOriginalFieldRef?.['fieldConfig']?.['valueType'] || 'text'
    : null;

  // ANCHOR - New Condition Menu Options
  return possibleComparisonOptions
    .map((comparisonType, index) => {
      if (comparisonType === 'exact' && depSettingAvailable('exact', true))
        return (
          <MenuItem
            key={index}
            value={'exact' as IDependencyComparisonObject['type']}
          >
            Exact Value
          </MenuItem>
        );

      if (
        comparisonType === 'minValue' &&
        depSettingAvailable('minValue', true)
      )
        return (
          <MenuItem
            key={index}
            value={'minValue' as IDependencyComparisonObject['type']}
          >
            Minimum Value ( &gt; )
          </MenuItem>
        );

      if (
        comparisonType === 'minValueEq' &&
        depSettingAvailable('minValueEq', true)
      )
        return (
          <MenuItem
            key={index}
            value={'minValueEq' as IDependencyComparisonObject['type']}
          >
            Minimum Value ( &ge; )
          </MenuItem>
        );

      if (
        comparisonType === 'maxValue' &&
        depSettingAvailable('maxValue', true)
      )
        return (
          <MenuItem
            key={index}
            value={'maxValue' as IDependencyComparisonObject['type']}
          >
            Maximum Value ( &lt; )
          </MenuItem>
        );

      if (
        comparisonType === 'maxValueEq' &&
        depSettingAvailable('maxValueEq', true)
      )
        return (
          <MenuItem
            key={index}
            value={'maxValueEq' as IDependencyComparisonObject['type']}
          >
            Maximum Value ( &le; )
          </MenuItem>
        );

      if (
        comparisonType === 'percentMarginErrorInferior' &&
        depSettingAvailable('percentMarginErrorInferior', true)
      )
        return (
          <MenuItem
            key={index}
            value={
              'percentMarginErrorInferior' as IDependencyComparisonObject['type']
            }
          >
            Inferior % Margin Of Error ( &lt; )
          </MenuItem>
        );

      if (
        comparisonType === 'percentMarginErrorInferiorEq' &&
        depSettingAvailable('percentMarginErrorInferiorEq', true)
      )
        return (
          <MenuItem
            key={index}
            value={
              'percentMarginErrorInferiorEq' as IDependencyComparisonObject['type']
            }
          >
            Inferior % Margin Of Error ( &le; )
          </MenuItem>
        );

      if (
        comparisonType === 'percentMarginErrorSuperior' &&
        depSettingAvailable('percentMarginErrorSuperior', true)
      )
        return (
          <MenuItem
            key={index}
            value={
              'percentMarginErrorSuperior' as IDependencyComparisonObject['type']
            }
          >
            Superior % Margin Of Error ( &gt; )
          </MenuItem>
        );

      if (
        comparisonType === 'percentMarginErrorSuperiorEq' &&
        depSettingAvailable('percentMarginErrorSuperiorEq', true)
      )
        return (
          <MenuItem
            key={index}
            value={
              'percentMarginErrorSuperiorEq' as IDependencyComparisonObject['type']
            }
          >
            Superior % Margin Of Error ( &ge; )
          </MenuItem>
        );

      if (
        comparisonType === 'isChecked' &&
        depSettingAvailable('isChecked', true)
      )
        return (
          <MenuItem
            key={index}
            value={'isChecked' as IDependencyComparisonObject['type']}
          >
            Is Checked
          </MenuItem>
        );
      if (
        comparisonType === 'toggleValue' &&
        depSettingAvailable('toggleValue', true)
      )
        return (
          <MenuItem
            key={index}
            value={'toggleValue' as IDependencyComparisonObject['type']}
          >
            Toggle Value
          </MenuItem>
        );
      if (
        comparisonType === 'selectedOption' &&
        depSettingAvailable('selectedOption', true)
      )
        return (
          <MenuItem
            key={index}
            value={'selectedOption' as IDependencyComparisonObject['type']}
          >
            Selected Option
          </MenuItem>
        );

      return null;
    })
    .filter((x) => x !== null);

  // Functions...
  function depSettingAvailable(
    comparisonOption: IDependencyComparisonObject['type'],
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
          depIsOfType(['short-answer']) &&
          depIsOfValueType(['text', 'integer']) &&
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
          depIsOfType(['short-answer']) &&
          depIsOfValueType(['integer', 'decimal']) &&
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
          depIsOfType(['short-answer']) &&
          depIsOfValueType(['integer', 'decimal']) &&
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
          depIsOfType(['short-answer']) &&
          depIsOfValueType(['integer', 'decimal']) &&
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
          depIsOfType(['short-answer']) &&
          depIsOfValueType(['integer', 'decimal']) &&
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
          depIsOfType(['short-answer']) &&
          depIsOfValueType(['integer', 'decimal']) &&
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
          depIsOfType(['short-answer']) &&
          depIsOfValueType(['integer', 'decimal']) &&
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
          depIsOfType(['short-answer']) &&
          depIsOfValueType(['integer', 'decimal']) &&
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
          depIsOfType(['short-answer']) &&
          depIsOfValueType(['integer', 'decimal']) &&
          !checkCompOptionAlreadyAdded([
            'exact',
            'maxValue',
            'maxValueEq',
            'minValue',
            'minValueEq',
            'percentMarginErrorSuperior',
          ])
        );
      case 'isChecked':
        return depIsOfType(['checkbox']);
      case 'toggleValue':
        return depIsOfType(['toggle-label']);
      case 'selectedOption':
        return depIsOfType(['radio', 'radio-color', 'radio-image', 'select']);
      default:
        return false;
    }
  }

  function checkCompOptionAlreadyAdded(
    comparisonToSearch:
      | IDependencyComparisonObject['type']
      | IDependencyComparisonObject['type'][]
  ) {
    if (typeof comparisonToSearch === 'string') {
      const i = (fieldRef?.deps || []).findIndex(
        (dep) => dep?.comparison?.type === comparisonToSearch
      );

      return i !== -1;
    }

    let found = false;

    comparisonToSearch.forEach((comparisonBeingSearched) => {
      if (!found) {
        const i = (fieldRef?.deps || []).findIndex(
          (dep) => dep?.comparison?.type === comparisonBeingSearched
        );

        found = i !== -1;
      }
    });

    return found;
  }

  function depIsOfType(possibleTypes: FieldType[]) {
    const foundValue = possibleTypes.find((type) => depTypeOfQuestion === type);
    if (!foundValue) {
      return false;
    }
    return true;
  }

  function depIsOfValueType(possibleValueTypes: IFieldConfig['valueType'][]) {
    const foundValueType = possibleValueTypes.find(
      (possibleValueType) => depValueType === possibleValueType
    );
    if (!foundValueType) {
      return false;
    }
    return true;
  }
}
