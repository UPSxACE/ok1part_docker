import { ValidationType } from '../form-renderer/use-init-form';

export default function getValidationLabels(
  validation: ValidationType
): [string, string] {
  const typeOfValidation = validation.name;
  let value = validation.value;

  if (typeof value !== 'string') {
    value = typeof value === 'number' ? String(value) : '';
  }

  switch (typeOfValidation) {
    case 'exactLength':
      return [`Answer Length Is Exactly`, value];
    case 'maxLength':
      return [`Answer Length Is`, '< ' + value];
    case 'minLength':
      return [`Answer Length Is`, '> ' + value];
    case 'minLengthEq':
      return [`Answer Length Is`, '≥ ' + value];
    case 'maxLengthEq':
      return [`Answer Length Is`, '≤ ' + value];
    case 'exactValue':
      return [`Answer Value Is Exactly`, value];
    case 'minValue':
      return [`Answer Value Is`, '> ' + value];
    case 'maxValue':
      return [`Answer Value Is`, '< ' + value];
    case 'minValueEq':
      return [`Answer Value Is`, '≥ ' + value];
    case 'maxValueEq':
      return [`Answer Value Is`, '≤ ' + value];
    case 'regex':
      return ['Regex', value];
  }

  return ['', ''];
}
