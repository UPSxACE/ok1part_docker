import { InfoOutlined } from '@mui/icons-material';
import { Box, OutlinedInput, Tooltip, Typography } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import BootstrapInput from './bootstrap-input';
import generateMessage from '@/utils/forms/generateMessage';

const BootstrapFillInput = ({
  JOIValidator,
  field,
  label,
  formDataState,
  tooltip = {},
  inputProps,
  required = false,
  readOnly = false,
  text,
}) => {
  const { formData, setFormData } = formDataState;
  const { t } = useTranslation();

  useEffect(() => {
    if (formData[field] && formData[field]['matches']) {
    }
    if (formData[field] && formData[field]['matchesPassword']) {
      if (!formData[field]['error']) {
        // If formData was updated, and it didn't have an error, re-check it
        if (
          !(
            formData[field]['value'] ===
            formData[formData[field].matchesPassword]['value']
          )
        ) {
          const obj = { ...formData };
          obj[field].error = {
            type: 'does_not_match_password',
            message: 'does_not_match_password',
            context: {
              field1: field,
              field2: obj[field].matchesPassword,
            },
          };
          setFormData(obj);
        }
      } else {
        if (
          formData[field]['value'] ===
            formData[formData[field].matchesPassword]['value'] &&
          formData[field]['error']['type'] === 'does_not_match_password'
        ) {
          const obj = { ...formData };
          delete obj[field]['error'];
          setFormData(obj);
        }
      }
    }
  }, [formData]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '50%', pr: 2 }}>
      <BootstrapInput
        sx={{
          flex: 1,
          '&.MuiInputBase-root': {
            mt: 0,
          },
          '& .MuiInputBase-input': {
            backgroundColor: readOnly ? '#e7e7e7' : 'transparent',
            width: '100%',
          },
          color: 'black',
        }}
        readOnly={readOnly}
        color='info'
        label={required ? label + ' *' : label}
        id={field}
        aria-describedby='my-helper-text'
        onChange={(event) => {
          const newValue = event.target.value;
          const obj = { ...formData };
          obj[field] = formData[field];
          obj[field]['value'] = newValue;
          if (JOIValidator) {
            const validateValue = required
              ? JOIValidator.required().validate(newValue)
              : JOIValidator.allow('').allow(null).validate(newValue);
            obj[field]['error'] = validateValue.error
              ? validateValue.error.details[0]
              : null;
            if (obj[field]['error']) {
              // Try to generate a message of an error that was already predicted
              const error_message = generateMessage(obj[field]['error']);
              // If that kind of error was already predicted, exchange the default error message by one that was manually set.
              if (error_message) {
                obj[field]['error']['message'] = error_message;
              }
            }
          }

          if (formData[field] && formData[field]['matchesPassword']) {
            if (
              !(
                formData[field]['value'] ===
                formData[formData[field].matchesPassword]['value']
              )
            )
              obj[field].error = {
                type: 'does_not_match_password',
                message: 'does_not_match_password',
                context: {
                  field1: field,
                  field2: obj[field].matchesPassword,
                },
              };
          }

          if (formData[field] && formData[field]['matches']) {
          }
          if (formData[field] && formData[field]['extraValidation']) {
          }

          function isNotEmpty(something) {
            if (
              Object.prototype.toString.call(something) === '[object Object]'
            ) {
              return Boolean(Object.keys(something).length !== 0);
            }

            if (
              Object.prototype.toString.call(something) === '[object Array]'
            ) {
              return Boolean(something.length !== 0);
            }

            return Boolean(something);
          }

          obj['_filledFields'][field] = isNotEmpty(newValue) ? true : null;
          setFormData({ ...obj });
        }}
        required
        {...inputProps}
        defaultValue={
          formData[field] && formData[field]['value']
            ? formData[field]['value']
            : null
        }
      />
      {text && (
        <Typography sx={{ pl: 1 }} variant='h6' component='span'>
          {text}
        </Typography>
      )}
      <Tooltip
        placement='right'
        title={
          <p>
            {label && t(label)}
            {tooltip.tip && (
              <>
                <br />
                <br />
                {t(tooltip.tip)}
              </>
            )}
            {tooltip.example && (
              <>
                <br />
                <br />
                {t('formExample') + ' ' + t(tooltip.example)}
              </>
            )}
          </p>
        }
      >
        <InfoOutlined
          sx={{ color: 'primary.components3', cursor: 'pointer', ml: 1 }}
        />
      </Tooltip>
    </Box>
  );
};

export default BootstrapFillInput;
