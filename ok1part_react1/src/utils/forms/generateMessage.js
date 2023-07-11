export default function generateMessage(error) {
  // Most useful: error.context, error.type
  // Debug: console.log(error.type);

  switch (error.type) {
    case 'string.empty':
      return 'string_empty';
    case 'string.email':
      return 'string_email';
    case 'string.min':
      return ['err_string_min', { size: error.context.limit }];
    case 'string.max':
      return ['err_string_max', { size: error.context.limit }];
    case 'number.base':
      return 'err_number_base';
    case 'does_not_match_password':
      return 'does_not_match_password';
    default:
      return null;
  }
}
