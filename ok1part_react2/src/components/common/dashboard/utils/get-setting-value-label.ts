import { IFieldConfig, IFieldObject, IOutcomeConfig } from '../form-renderer';

type SettingCategoryType =
  | 'type-of-question'
  | 'type-of-value'
  | 'show-question'
  | 'success-mode';

/** Function to get the name of a setting value in the way that it should be shown to the user */
export default function getSettingValueLabel(
  settingCategory: SettingCategoryType,
  settingName: string
): string {
  switch (settingCategory) {
    case 'type-of-question':
      switch (settingName as IFieldObject['type']) {
        case 'short-answer':
          return 'Short Answer';
        case 'long-answer':
          return 'Long Answer';
        case 'radio':
          return 'Radio';
        case 'toggle-label':
          return 'Toggle Label';
        case 'select':
          return 'Select';
      }
    case 'type-of-value':
      switch (settingName as IFieldConfig['valueType']) {
        case 'text':
          return 'Text';
        case 'integer':
          return 'Integer';
        case 'decimal':
          return 'Decimal';
      }
    case 'show-question':
      switch (settingName as IFieldObject['showQuestion']) {
        case 'always':
          return 'Always';
        case 'conditions-met':
          return 'If Conditions are Met';
        case 'disabled':
          return 'Disabled';
      }
    case 'success-mode':
      switch (settingName as IOutcomeConfig['successMode']) {
        case 'always':
          return 'Always';
        case 'comparison':
          return 'Comparison';
      }
    default:
      throw Error(
        `Invalid arguments given to getSettingValueLabel function. Arguments given: ${settingCategory}, ${settingName}`
      );
  }
}
