import { Button } from '@mui/material';
import Joi from 'joi';
import { useTranslation } from 'next-i18next';

const Submit = ({
  validators,
  extraValidation,
  title,
  formDataState,
  formStatusState,
  formLoadingState,
  onSubmit,
  onSuccess,
  onError,
  autoFinalize,
  resetOnSuccess,
}) => {
  const { formData, setFormData } = formDataState;
  const { formStatus, setFormStatus } = formStatusState;
  const { formLoading, setFormLoading } = formLoadingState;
  const { t } = useTranslation();

  function getFormDataValues() {
    const MultiFormData = new FormData();
    Object.keys(formData).map((field) => {
      if (field[0] !== '_') MultiFormData.append(field, formData[field].value);
    });

    return MultiFormData;
  }

  function validate() {
    let valid = true;

    if (formData._filledFields) {
      Object.keys(formData._filledFields).map((field) => {
        if (valid) {
          let test_result = {};

          if (validators[field]) {
            test_result = formData[field].required
              ? validators[field]
                  .empty([
                    Joi.array().length(0),
                    null,
                    Joi.object().keys().length(0),
                  ])
                  .required()
                  .validate(formData[field]['value'])
              : validators[field]
                  .allow('')
                  .allow(null)
                  .validate(formData[field]['value']);
          } else {
          }

          if (valid) {
            if (formData[field].matches) {
              if (
                !(
                  formData[field]['value'] ===
                  formData[formData[field].matches]['value']
                )
              )
                test_result.error = {
                  type: 'does_not_match',
                  context: { field1: field, field2: formData[field].matches },
                };
            }

            if (formData[field].matchesPassword) {
              if (
                !(
                  formData[field]['value'] ===
                  formData[formData[field].matchesPassword]['value']
                )
              )
                test_result.error = {
                  type: 'does_not_match_password',
                  message: 'does_not_match_password',
                  context: {
                    field1: field,
                    field2: formData[field].matchesPassword,
                  },
                };
            }

            if (extraValidation) {
            }
          }

          if (test_result.error) {
            valid = false;
          }
        }
      });
    }

    return valid;
  }

  function resetFormData() {
    const newFormData = { ...formData };
    Object.keys(newFormData).map((field) => {
      if (field[0] !== '_') {
        if (newFormData[field]?.['value']) {
          newFormData[field].value = null;
        }
      }
    });

    setFormData(newFormData);
  }

  return (
    <Button
      disabled={!validate()}
      variant='contained'
      sx={{ height: 56, fontSize: '1rem' }}
      fullWidth
      type='submit'
      onClick={() => {
        if (onSubmit) {
          async function handleSubmit() {
            await onSubmit(getFormDataValues());
          }

          setFormLoading(true);
          handleSubmit()
            .then((result) => {
              if (onSuccess) onSuccess(result, setFormStatus);
              if (autoFinalize) setFormStatus(true);
              if (resetOnSuccess) resetFormData();
              setFormLoading(false);
            })
            .catch((error) => {
              if (onError) onError(error, setFormStatus);
              if (autoFinalize) setFormStatus(error);
              setFormLoading(false);
            });
        }
      }}
    >
      {t(title)}
    </Button>
  );
};

export default Submit;
