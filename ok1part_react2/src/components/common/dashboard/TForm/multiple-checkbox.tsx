import { ValidationType } from '@/components/common/dashboard/form-renderer/use-init-form';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import {
  FieldsArray,
  IFieldOption,
} from '@/components/common/dashboard/form-renderer';
import { Dispatch, SetStateAction } from 'react';

export interface IMultipleCheckboxProps {
  name: string;
  label: string;
  errors: { [key: string]: any };
  rules?: ValidationType[];
  currentValue: { [key: string]: any } | undefined | null;
  updateFieldFunc: Function;
  options: IFieldOption[];
  sx?: any;
  disabled?: boolean;
  checkboxgroupClassName?: string;
}

export interface IMultipleCheckboxModeProps extends IMultipleCheckboxProps {
  mode: 'answer';
}

export interface IMultipleCheckboxEditModeProps extends IMultipleCheckboxProps {
  mode: 'edit';
  updateLabelFunction: Function;
  setFieldsArray: Dispatch<SetStateAction<FieldsArray>>;
}

export default function MultipleCheckbox(
  props: IMultipleCheckboxModeProps | IMultipleCheckboxEditModeProps
) {
  const {
    name,
    label,
    errors,
    mode = 'answer',
    options,
    currentValue,
    updateFieldFunc,
    sx = {},
    disabled = false,
    checkboxgroupClassName = '',
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
        <Box className={checkboxgroupClassName}>
          {options.map((option, index) => {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }} key={index}>
                <Checkbox
                  checked={
                    typeof currentValue?.[option.id] === 'boolean'
                      ? currentValue[option.id]
                      : false
                  }
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    updateFieldFunc(name, (current_state: any) => {
                      const current_object =
                        typeof current_state === 'object' ? current_state : {};

                      return Object.assign({}, current_object, {
                        [option.id]:
                          typeof current_state?.[option.id] === 'boolean'
                            ? !current_state[option.id]
                            : true,
                      });
                    });
                  }}
                  sx={{ paddingX: 0, paddingY: 1, paddingRight: 1 }}
                />
                <Typography
                  variant='body1'
                  component={'span'}
                  sx={{ color: disabled ? '#00000061' : 'black' }}
                >
                  {option.label}
                </Typography>
              </Box>
            );
          })}
        </Box>
        {errors?.[name] && (
          <FormHelperText id={name + '-text'}>{errors[name][0]}</FormHelperText>
        )}
      </FormControl>
    );
  }

  return <></>;
}
