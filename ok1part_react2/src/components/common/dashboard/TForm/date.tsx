import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ValidationType } from '../form-renderer/use-init-form';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

type PartOfDateString = 'day' | 'month' | 'year';

export interface IDateProps {
  name: string;
  label: string;
  errors: { [key: string]: any };
  rules?: ValidationType[];
  updateFieldFunc: Function;
  sx?: any;
  disabled?: boolean;
  inputClassName?: string;
  format?: string;
  views?: PartOfDateString[];
  regexp?: RegExp | false;
  SubComponent?: any;
  currentValue: string;
  pickmode?: 'date' | 'datetime' | 'time';
  small?: boolean;
}

export interface IDateAnswerModeProps extends IDateProps {
  mode: 'answer';
}

export interface IDateEditModeProps extends IDateProps {
  mode: 'edit';
  updateLabelFunction: Function;
}

export default function DateComponent(
  props: IDateAnswerModeProps | IDateEditModeProps
) {
  const {
    name,
    label,
    errors,
    rules,
    mode = 'answer',
    updateFieldFunc,
    sx = {},
    disabled = false,
    inputClassName = '',
    format,
    views,
    regexp = false,
    SubComponent,
    currentValue,
    pickmode = 'date',
    small = false,
  } = props;

  if (mode === 'answer') {
    return (
      <FormControl
        variant='standard'
        sx={sx}
        disabled={disabled}
        error={
          errors?.[name] &&
          errors?.[name] !== null &&
          errors?.[name]?.[0] !== undefined
        }
      >
        <FormLabel
          disabled={disabled}
          htmlFor={name}
          sx={{ mb: 0.5, fontSize: small ? '0.95rem' : undefined }}
        >
          {label || 'Question'}
        </FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {pickmode === 'date' && (
            <DatePicker
              disabled={disabled}
              value={
                typeof currentValue === 'string'
                  ? dayjs(new Date(currentValue))
                  : null
              }
              views={views || ['year', 'month', 'day']}
              format={format || 'DD/MM/YYYY'}
              onChange={(value: any) => {
                try {
                  const newDate = value.$d as Date;
                  const newDateString = newDate.toISOString();
                  if (
                    newDate.getFullYear() < 1900 ||
                    newDate.getFullYear() > 2099
                  ) {
                    throw Error;
                  }
                  updateFieldFunc(name, newDateString);
                } catch {
                  updateFieldFunc(name, currentValue);
                }
              }}
              slotProps={{
                textField: {
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      height: small ? 40 : undefined,
                      fontSize: small ? '0.9rem' : undefined,
                    },
                    '& .MuiOutlinedInput-input': {
                      height: small ? 40 : undefined,
                      fontSize: small ? '0.9rem' : undefined,
                    },
                  },
                },
              }}
            />
          )}
          {pickmode === 'datetime' && (
            <DateTimePicker
              disabled={disabled}
              value={
                typeof currentValue === 'string'
                  ? dayjs(new Date(currentValue))
                  : null
              }
              views={views || ['year', 'month', 'day', 'hours', 'minutes']}
              format={format || 'DD/MM/YYYY HH:mm'}
              onChange={(value: any) => {
                try {
                  const newDate = value.$d as Date;
                  const newDateString = newDate.toISOString();
                  if (
                    newDate.getFullYear() < 1900 ||
                    newDate.getFullYear() > 2099
                  ) {
                    throw Error;
                  }
                  updateFieldFunc(name, newDateString);
                } catch {
                  updateFieldFunc(name, currentValue);
                }
              }}
              slotProps={{
                textField: {
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      height: small ? 40 : undefined,
                      fontSize: small ? '0.9rem' : undefined,
                    },
                    '& .MuiOutlinedInput-input': {
                      height: small ? 40 : undefined,
                      fontSize: small ? '0.9rem' : undefined,
                    },
                  },
                },
              }}
            />
          )}
        </LocalizationProvider>
        {errors?.[name] && (
          <FormHelperText id={name + '-text'}>{errors[name][0]}</FormHelperText>
        )}
      </FormControl>
    );
  }

  return <></>;
}
