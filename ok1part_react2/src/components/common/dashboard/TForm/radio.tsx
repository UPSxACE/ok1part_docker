import { ValidationType } from '@/components/common/dashboard/form-renderer/use-init-form';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import RadioGroup from '@mui/material/RadioGroup';
import MuiRadio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import BootstrapInput from '../bootstrap-input';
import {
  FieldsArray,
  IFieldConfig,
  IFieldOption,
} from '@/components/common/dashboard/form-renderer';
import { Close } from '@mui/icons-material';
import { Dispatch, SetStateAction } from 'react';
import generateRandomHash from '@/utils/generate-random-hash';

export interface IRadioProps {
  name: string;
  label: string;
  errors: { [key: string]: any };
  rules?: ValidationType[];
  propsFunction: Function;
  options: IFieldOption[];
  sx?: any;
  disabled?: boolean;
  radioClassName?: string;
  forcePreview?: boolean;
}

export interface IRadioAnswerModeProps extends IRadioProps {
  mode: 'answer';
}

export interface IRadioEditModeProps extends IRadioProps {
  mode: 'edit';
  updateLabelFunction: Function;
  setFieldsArray: Dispatch<SetStateAction<FieldsArray>>;
}

export default function Radio(
  props: IRadioAnswerModeProps | IRadioEditModeProps
) {
  const {
    name,
    label,
    errors,
    mode = 'answer',
    options,
    propsFunction,
    sx = {},
    disabled = false,
    radioClassName = '',
    forcePreview,
  } = props;

  if (mode === 'answer') {
    return (
      <FormControl
        variant='standard'
        disabled={disabled}
        sx={sx}
        error={
          errors?.[name] &&
          errors?.[name] !== null &&
          errors?.[name]?.[0] !== undefined
        }
      >
        <FormLabel htmlFor={name}>{label || 'Question'}</FormLabel>
        <RadioGroup
          {...propsFunction(name, null, forcePreview)}
          className={radioClassName}
        >
          {options.map((option, index) => {
            return (
              <FormControlLabel
                key={index}
                value={option.id}
                control={<MuiRadio />}
                label={option.label || `Option ${index + 1}`}
              />
            );
          })}
        </RadioGroup>
        {errors?.[name] && (
          <FormHelperText id={name + '-text'}>{errors[name][0]}</FormHelperText>
        )}
      </FormControl>
    );
  }
  if (props.mode === 'edit') {
    const { updateLabelFunction, setFieldsArray } = props;
    return (
      <FormControl variant='standard' disabled={disabled} sx={sx}>
        <BootstrapInput
          placeholder='Question Name'
          onChange={(e) => {
            const newValue = e.target.value;
            updateLabelFunction(name, newValue);
          }}
          value={label}
          id={name}
          sx={{ marginBottom: 1 }}
        />
        <RadioGroup {...propsFunction(name)} className={radioClassName}>
          {options.map((option, index) => {
            return (
              <ListItemButton
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '&:hover': {
                    cursor: 'default',
                  },
                  paddingY: 1,
                  paddingX: 3,
                  marginX: -3,
                }}
                disableRipple
              >
                <MuiRadio
                  sx={{ paddingX: 0, color: 'rgba(0, 0, 0, 0.6)!important' }}
                  value={false}
                  disabled
                />
                <TextField
                  value={option.label}
                  autoFocus
                  sx={{
                    ml: 1,
                    width: '100%',
                    paddingRight: '40px',
                    '& .MuiInput-root:before': {
                      borderBottom: 0,
                    },
                  }}
                  variant='standard'
                  placeholder={`Option ${index + 1}`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newValue = e.target.value;
                    setFieldsArray((c_fieldsArray: FieldsArray) => {
                      const newArray: FieldsArray = Object.assign(
                        [],
                        c_fieldsArray
                      );
                      const el = newArray.find((field) => field.id_ === name);

                      const index = el && newArray.indexOf(el);

                      if (typeof index === 'number' && index >= 0) {
                        if (!newArray[index]?.['fieldConfig']?.['options']) {
                          if (!newArray[index]?.['fieldConfig']) {
                            newArray[index]['fieldConfig'] = {};
                          }

                          // REVIEW - The "IFieldConfig" keyword was dangerously set here, without enough testing.
                          if (!newArray[index]['fieldConfig']?.['options']) {
                            (newArray[index]['fieldConfig'] as IFieldConfig)[
                              'options'
                            ] = [];
                          }
                        }

                        // REVIEW - The "any" keyword was dangerously set here, without enough testing.
                        const optionRef = (newArray as any)[index][
                          'fieldConfig'
                        ]['options'].find(
                          (option_: any) => option_.id === option.id
                        );

                        const optionIndex = (newArray as any)[index][
                          'fieldConfig'
                        ]['options'].indexOf(optionRef);

                        (newArray as any)[index]['fieldConfig']['options'][
                          optionIndex
                        ]['label'] = newValue;
                      }

                      return newArray;
                    });
                    /*
            const newValue = e.target.value;
            updateLabelFunction(name, newValue);*/
                  }}
                />
                <IconButton
                  sx={{ marginLeft: 'auto' }}
                  onClick={() => {
                    setFieldsArray((c_fieldsArray: FieldsArray) => {
                      const newArray: FieldsArray = Object.assign(
                        [],
                        c_fieldsArray
                      );
                      const el = newArray.find((field) => field.id_ === name);

                      const index = el && newArray.indexOf(el);

                      if (typeof index === 'number' && index >= 0) {
                        if (!newArray[index]?.['fieldConfig']?.['options']) {
                          if (!newArray[index]?.['fieldConfig']) {
                            newArray[index]['fieldConfig'] = {};
                          }

                          // REVIEW - The "IFieldConfig" keyword was dangerously set here, without enough testing.
                          if (!newArray[index]['fieldConfig']?.['options']) {
                            (newArray[index]['fieldConfig'] as IFieldConfig)[
                              'options'
                            ] = [];
                          }
                        }

                        // REVIEW - The "any" keyword was dangerously set here, without enough testing.
                        const optionRef = (newArray as any)[index][
                          'fieldConfig'
                        ]['options'].find(
                          (option_: any) => option_.name === option.id
                        );

                        const optionIndex = (newArray as any)[index][
                          'fieldConfig'
                        ]['options'].indexOf(optionRef);

                        (newArray as any)[index]['fieldConfig'][
                          'options'
                        ].splice(optionIndex, 1);
                      }

                      return newArray;
                    });
                  }}
                >
                  <Close color='error' />
                </IconButton>
              </ListItemButton>
            );
          })}
          <ListItemButton
            sx={{
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                cursor: 'default',
              },
              paddingY: 1,
              paddingX: 3,
              marginX: -3,
            }}
            disableRipple
          >
            <MuiRadio
              sx={{ paddingX: 0, color: 'rgba(0, 0, 0, 0.6)!important' }}
              value={false}
              disabled
            />
            <TextField
              sx={{
                ml: 1,
                width: '100%',
                paddingRight: '80px',
                '& .MuiInput-root:before': {
                  borderBottom: 0,
                },
              }}
              variant='standard'
              placeholder='Add Option'
              value={''}
              onClick={() => {
                setFieldsArray((c_fieldsArray: FieldsArray) => {
                  const newArray: FieldsArray = Object.assign(
                    [],
                    c_fieldsArray
                  );
                  const el = newArray.find((field) => field.id_ === name);

                  const index = el && newArray.indexOf(el);

                  if (typeof index === 'number' && index >= 0) {
                    let newHash = '';
                    while (newHash === '') {
                      const generatedHash = generateRandomHash('new_option', 8);

                      if (!newArray[index]?.['fieldConfig']) {
                        newArray[index]['fieldConfig'] = {};
                      }

                      if (!newArray[index]['fieldConfig']?.['options']) {
                        // REVIEW - The "IFieldConfig" keyword was dangerously set here, without enough testing.
                        (newArray[index]['fieldConfig'] as IFieldConfig)[
                          'options'
                        ] = [];
                      }

                      // REVIEW - The "any" keyword was dangerously set here, without enough testing.
                      if (
                        (newArray as any)[index]['fieldConfig']['options'].find(
                          (option: any) => option.id === newHash
                        ) === undefined
                      ) {
                        newHash = generatedHash;
                      }
                    }

                    // REVIEW - The "IFieldConfig" keyword was dangerously set here, without enough testing.
                    (newArray[index]['fieldConfig'] as IFieldConfig)[
                      'options'
                    ]?.push({
                      id: newHash,
                      label: '',
                    });
                  }

                  return newArray;
                });

                /*
            const newValue = e.target.value;
            updateLabelFunction(name, newValue);*/
              }}
            />
          </ListItemButton>
        </RadioGroup>
        {errors?.[name] && (
          <FormHelperText id={name + '-text'}>{errors[name][0]}</FormHelperText>
        )}
      </FormControl>
    );
  }
  return <></>;
}
