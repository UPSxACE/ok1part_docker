import {
  CheckBox,
  CheckBoxOutlineBlank,
  InfoOutlined,
} from '@mui/icons-material';
import {
  Autocomplete as MuiAutocomplete,
  TextField,
  Tooltip,
  Box,
  Checkbox,
} from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import generateMessage from '@/utils/forms/generateMessage';
import { alpha, styled } from '@mui/system';
import objectGetter from '@/utils/object-getter';

const StyledTextField = styled(TextField)(({ theme }) => ({
  borderRadius: 4,
  position: 'relative',
  backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',

  fontSize: 16,

  transition: theme.transitions.create([
    'border-color',
    'background-color',
    'box-shadow',
  ]),

  '& .MuiInputBase-root': {
    //height: 45,
    '&.Mui-focused': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    },

    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },

    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
    },
  },

  /*
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },*/
}));

const icon = <CheckBoxOutlineBlank fontSize='small' />;
const checkedIcon = <CheckBox fontSize='small' />;

const AutocompleteCheckbox = ({
  JOIValidator,
  field,
  label,
  formDataState,
  tooltip = {},
  inputProps,
  required = false,
  readOnly = false,
  noOptionsText = 'autocomplete_no_options',
  options,
  nestedProperty,
  orderData,
}) => {
  // FIXME - the "nestedProperty" behavior is apparently buggy and needs more testing (avoid using it)
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

  const getOptions = useMemo(() => {
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
      if (option !== null && option !== undefined) return option;
    });

    return result;
  }, [options, nestedProperty, orderData]);

  function updateData(newValue) {
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
      if (Object.prototype.toString.call(something) === '[object Object]') {
        return Boolean(Object.keys(something).length !== 0);
      }

      if (Object.prototype.toString.call(something) === '[object Array]') {
        return Boolean(something.length !== 0);
      }

      return Boolean(something);
    }

    obj['_filledFields'][field] = isNotEmpty(newValue) ? true : null;
    setFormData({ ...obj });
  }

  return (
    <MuiAutocomplete
      multiple
      disableCloseOnSelect
      noOptionsText={t(noOptionsText)}
      //freeSolo
      //disablePortal
      id={field + '-autocomplete'}
      options={getOptions}
      //sx={{ width: 300 }}
      onChange={(_, value) => {
        const newValue = value;
        updateData(newValue);
      }}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.label}
        </li>
      )}
      renderInput={(params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StyledTextField
            //label='Label'
            //placeholder='Placeholder'
            name={field}
            sx={{
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
            //label={required ? label + ' *' : label}
            id={field}
            aria-describedby='my-helper-text'
            required
            {...inputProps}
            {...params}
            onChange={(event) => {
              const newValue = event.target.value;
              updateData(newValue);
            }}
            value={
              formData[field] && formData[field]['value']
                ? formData[field]['value']
                : null
            }
          />
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
      )}
    />
  );
};

export default AutocompleteCheckbox;
