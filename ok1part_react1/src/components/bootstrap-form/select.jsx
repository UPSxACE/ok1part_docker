import objectGetter from '@/utils/object-getter';
import { InfoOutlined } from '@mui/icons-material';
import { Box, MenuItem, Select as MuiSelect, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';

const Select = ({
  JOIValidator,
  field,
  label,
  formDataState,
  tooltip = {},
  inputProps,
  required = false,
  readOnly = false,
  options = [],
  nestedProperty,
  initialized = true,
  orderData = false,
}) => {
  const { formData, setFormData } = formDataState;
  const { t } = useTranslation();

  function renderOptions() {
    let options_array = options;
    if (nestedProperty) {
      const propertyArray = nestedProperty.split('.');
      options_array = options.map((option, index) => {
        const optionName = objectGetter(option, ...propertyArray);
        return optionName;
      });
    }

    if (orderData) {
      options_array.sort();
    }

    const result = options_array.map((option, index) => {
      if (option !== null && option !== undefined)
        return (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        );
    });

    return result;
  }

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
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <MuiSelect
        value={
          initialized
            ? formData[field] && formData[field]['value']
              ? formData[field]['value']
              : ''
            : ''
        }
        disabled={!initialized}
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
        sx={{
          flex: 1,
          height: 45,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black',
          },
        }}
      >
        {renderOptions()}
      </MuiSelect>
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

export default Select;
