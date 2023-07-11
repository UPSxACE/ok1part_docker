import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import BootstrapInput from '../bootstrap-input';
import { ValidationType } from '@/components/common/dashboard/form-renderer/use-init-form';
import { Box, FormLabel } from '@mui/material';

export interface IShortAnswerProps {
  name: string;
  label: string;
  errors: { [key: string]: any };
  rules?: ValidationType[];
  propsFunction: Function;
  sx?: any;
  disabled?: boolean;
  inputClassName?: string;
  inputMode?: 'numeric' | 'email' | 'decimal';
  regexp?: RegExp | false;
  SubComponent?: any;
  LeftComponent?: any;
  RightComponent?: any;
  forcePreview?: boolean;
  type?: 'text' | 'integer' | 'decimal';
  inputProps?: any;
}

export interface IShortAnswerAnswerModeProps extends IShortAnswerProps {
  mode: 'answer';
}

export interface IShortAnswerEditModeProps extends IShortAnswerProps {
  mode: 'edit';
  updateLabelFunction: Function;
}

export default function ShortAnswer(
  props: IShortAnswerAnswerModeProps | IShortAnswerEditModeProps
) {
  const {
    name,
    label,
    errors,
    rules,
    mode = 'answer',
    propsFunction,
    sx = {},
    disabled = false,
    inputClassName = '',
    inputMode,
    regexp = false,
    SubComponent,
    LeftComponent,
    RightComponent,
    forcePreview,
    type = 'text',
    inputProps = {},
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
        <FormLabel htmlFor={name}>{label || 'Question'}</FormLabel>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          {LeftComponent && <LeftComponent />}
          <BootstrapInput
            sx={{ flex: 1 }}
            {...propsFunction(name, regexp, forcePreview, type)}
            id={name}
            className={inputClassName}
            inputMode={inputMode || 'none'}
            {...inputProps}
          />
          {LeftComponent && <RightComponent />}
        </Box>

        {SubComponent && <SubComponent />}
        {errors?.[name] && (
          <FormHelperText id={name + '-text'}>{errors[name][0]}</FormHelperText>
        )}
      </FormControl>
    );
  }
  if (props.mode === 'edit') {
    const { updateLabelFunction } = props;
    return (
      <FormControl
        variant='standard'
        sx={{ marginBottom: 3, ...sx }}
        disabled={disabled}
      >
        <BootstrapInput
          placeholder='Question Name'
          onChange={(e) => {
            const newValue = e.target.value;
            updateLabelFunction(name, newValue);
          }}
          value={label}
          id={name}
        />
        {SubComponent && <SubComponent />}
      </FormControl>
    );
  }

  return <></>;
}
