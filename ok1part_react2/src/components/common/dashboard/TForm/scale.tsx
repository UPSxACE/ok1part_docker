import { ValidationType } from '@/components/common/dashboard/form-renderer/use-init-form';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import RadioGroup from '@mui/material/RadioGroup';
import MuiRadio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import {
  FieldsArray,
  IFieldOption,
} from '@/components/common/dashboard/form-renderer';
import { Dispatch, SetStateAction } from 'react';

export interface IScaleProps {
  name: string;
  label: string;
  errors: { [key: string]: any };
  rules?: ValidationType[];
  propsFunction: Function;
  options: IFieldOption[];
  sx?: any;
  disabled?: boolean;
  scaleClassName?: string;
  labelStart?: string;
  labelEnd?: string;
}

export interface IScaleAnswerModeProps extends IScaleProps {
  mode: 'answer';
}

export interface IScaleEditModeProps extends IScaleProps {
  mode: 'edit';
  updateLabelFunction: Function;
  setFieldsArray: Dispatch<SetStateAction<FieldsArray>>;
}

export default function Scale(
  props: IScaleAnswerModeProps | IScaleEditModeProps
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
    scaleClassName = '',
    labelEnd,
    labelStart,
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
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'nowrap',
          }}
          row
          {...propsFunction(name)}
          className={scaleClassName}
        >
          {labelStart && (
            <Typography
              variant='body1'
              component='span'
              sx={{
                height: 42,
                display: 'flex',
                alignItems: 'center',
                color: disabled ? '#00000061' : 'black',
              }}
            >
              {labelStart}
            </Typography>
          )}

          {options.map((option, index) => {
            return (
              <FormControlLabel
                key={index}
                value={option.id}
                control={<MuiRadio />}
                label={option.label || `Option ${index + 1}`}
                labelPlacement='top'
              />
            );
          })}
          {labelEnd && (
            <Typography
              variant='body1'
              component='span'
              sx={{
                height: 42,
                display: 'flex',
                alignItems: 'center',
                color: disabled ? '#00000061' : 'black',
              }}
            >
              {labelEnd}
            </Typography>
          )}
        </RadioGroup>
        {errors?.[name] && (
          <FormHelperText id={name + '-text'}>{errors[name][0]}</FormHelperText>
        )}
      </FormControl>
    );
  }

  return <></>;
}
