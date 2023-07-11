import { ValidationType } from '@/components/common/dashboard/form-renderer/use-init-form';
import { ValidationOption } from '../options/add-validation-setting';
import {
  FieldType,
  IFieldObject,
} from '@/components/common/dashboard/form-renderer';
import useIsOf from './use-is-of';

// ANCHOR - Types of Validation to be rendered in the 'Add Validation' menu
// If you want to add a new rule, add it's name here, and also implement the necessary code in the next ANCHORs
const possibleValidationOptions: ValidationType['name'][] = [
  'exactLength',
  'minLength',
  'minLengthEq',
  'maxLength',
  'maxLengthEq',
  'minValue',
  'minValueEq',
  'maxValue',
  'maxValueEq',
  'regex',
];

interface IUseRulesProps {
  fieldRef: IFieldObject;
  isOfType: ReturnType<typeof useIsOf>['isOfType'];
  isOfValueType: ReturnType<typeof useIsOf>['isOfValueType'];
}

export default function useRules({
  fieldRef,
  isOfType,
  isOfValueType,
}: IUseRulesProps) {
  function checkRuleAlreadyAdded(
    ruleToSearch: ValidationType['name'] | ValidationType['name'][]
  ) {
    if (typeof ruleToSearch === 'string') {
      const i = (fieldRef.rules || []).findIndex(
        (rule) => rule.name === ruleToSearch
      );

      return i !== -1;
    }

    let found = false;

    ruleToSearch.forEach((ruleBeingSearched) => {
      if (!found) {
        const i = (fieldRef.rules || []).findIndex(
          (rule) => rule.name === ruleBeingSearched
        );

        found = i !== -1;
      }
    });

    return found;
  }

  function optionAvailable(
    validationOption: ValidationType['name'],
    checkAlreadyAdded: boolean = false
  ) {
    // If checkAlreadyAdded is set to true,
    // check if that type of validation wasn't already added yet fist,
    // and if that's the case return false immediately
    if (checkAlreadyAdded) {
      const ruleAlreadyAdded = checkRuleAlreadyAdded(validationOption);
      // Debug: console.log('checkAlreadyAdded:', validationOption);
      if (ruleAlreadyAdded) {
        return false;
      }
    }

    // ANCHOR - validate the availability of an option
    switch (validationOption) {
      case 'exactLength':
        return (
          isOfType(['short-answer']) &&
          isOfValueType(['text', 'integer']) &&
          !checkRuleAlreadyAdded([
            'maxLength',
            'minLength',
            'maxLengthEq',
            'minLengthEq',
          ])
        );
      case 'minLength':
        return (
          isOfType(['short-answer', 'long-answer']) &&
          isOfValueType(['text', 'integer']) &&
          !checkRuleAlreadyAdded(['minLengthEq', 'exactLength'])
        );
      case 'minLengthEq':
        return (
          isOfType(['short-answer', 'long-answer']) &&
          isOfValueType(['text', 'integer']) &&
          !checkRuleAlreadyAdded(['minLength', 'exactLength'])
        );
      case 'maxLength':
        return (
          isOfType(['short-answer', 'long-answer']) &&
          isOfValueType(['text', 'integer']) &&
          !checkRuleAlreadyAdded(['maxLengthEq', 'exactLength'])
        );
      case 'maxLengthEq':
        return (
          isOfType(['short-answer', 'long-answer']) &&
          isOfValueType(['text', 'integer']) &&
          !checkRuleAlreadyAdded(['maxLength', 'exactLength'])
        );
      case 'minValue':
        return (
          isOfType(['short-answer']) &&
          isOfValueType(['integer', 'decimal']) &&
          !checkRuleAlreadyAdded(['minValueEq'])
        );
      case 'minValueEq':
        return (
          isOfType(['short-answer']) &&
          isOfValueType(['integer', 'decimal']) &&
          !checkRuleAlreadyAdded(['minValue'])
        );
      case 'maxValue':
        return (
          isOfType(['short-answer']) &&
          isOfValueType(['integer', 'decimal']) &&
          !checkRuleAlreadyAdded(['maxValueEq'])
        );
      case 'maxValueEq':
        return (
          isOfType(['short-answer']) &&
          isOfValueType(['integer', 'decimal']) &&
          !checkRuleAlreadyAdded(['maxValue'])
        );
      case 'regex':
        return isOfType(['short-answer']);
      default:
        return false;
    }
  }

  function getValidationSettingsOptions() {
    // ANCHOR - Add Validation Menu Options
    return possibleValidationOptions
      .map((ruleName, index) => {
        if (ruleName === 'exactLength' && optionAvailable('exactLength', true))
          return (
            <ValidationOption
              key={index}
              value={'exactLength'}
              label='Exact Length'
            />
          );
        // NOTE - It doesn't make sense to have a 'minimum length' that does not accept equal value probably, so it's disabled for now
        if (
          false &&
          ruleName === 'minLength' &&
          optionAvailable('minLength', true)
        )
          return (
            <ValidationOption
              key={index}
              value={'minLength'}
              label='Minimum Length ( > )'
            />
          );
        if (ruleName === 'minLengthEq' && optionAvailable('minLengthEq', true))
          return (
            <ValidationOption
              key={index}
              value={'minLengthEq'}
              label='Minimum Length ( ≥ )'
            />
          );
        // NOTE - It doesn't make sense to have a 'maximum length' that does not accept equal value probably, so it's disabled for now
        if (
          false &&
          ruleName === 'maxLength' &&
          optionAvailable('maxLength', true)
        )
          return (
            <ValidationOption
              key={index}
              value={'maxLength'}
              label='Maximum Length ( < )'
            />
          );
        if (ruleName === 'maxLengthEq' && optionAvailable('maxLengthEq', true))
          return (
            <ValidationOption
              key={index}
              value={'maxLengthEq'}
              label='Maximum Length ( ≤ )'
            />
          );

        if (ruleName === 'minValue' && optionAvailable('minValue', true))
          return (
            <ValidationOption
              key={index}
              value={'minValue'}
              label='Minimum Value ( > )'
            />
          );
        if (ruleName === 'minValueEq' && optionAvailable('minValueEq', true))
          return (
            <ValidationOption
              key={index}
              value={'minValueEq'}
              label='Minimum Value ( ≥ )'
            />
          );
        if (ruleName === 'maxValue' && optionAvailable('maxValue', true))
          return (
            <ValidationOption
              key={index}
              value={'maxValue'}
              label='Maximum Value ( < )'
            />
          );
        if (ruleName === 'maxValueEq' && optionAvailable('maxValueEq', true))
          return (
            <ValidationOption
              key={index}
              value={'maxValueEq'}
              label='Maximum Value ( ≤ )'
            />
          );
        if (ruleName === 'regex' && optionAvailable('regex', true) && false) {
          // Note: Cannot be manually introduced for now
          return (
            <ValidationOption
              key={index}
              value={'regex'}
              label='Regular Expression'
            />
          );
        }
        return null;
      })
      .filter((x) => x !== null);
  }

  const validationSettingsOptions = getValidationSettingsOptions();

  return {
    optionAvailable,
    //getValidationSettingsOptions,
    validationSettingsOptions,
  };
}
