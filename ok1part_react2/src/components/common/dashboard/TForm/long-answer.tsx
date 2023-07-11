import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import BootstrapInput from '../bootstrap-input';
import { ValidationType } from '@/components/common/dashboard/form-renderer/use-init-form';
import FormLabel from '@mui/material/FormLabel';

interface ILongAnswerProps {
  name: string;
  label: string;
  errors: { [key: string]: any };
  rules?: ValidationType[];
  propsFunction: Function;
  sx?: any;
  disabled?: boolean;
  inputClassName?: string;
  forcePreview?: boolean;
}

interface ILongAnswerAnswerModeProps extends ILongAnswerProps {
  mode: 'answer';
}

interface ILongAnswerEditModeProps extends ILongAnswerProps {
  mode: 'edit';
  updateLabelFunction: Function;
}

export default function LongAnswer(
  props: ILongAnswerAnswerModeProps | ILongAnswerEditModeProps
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
        <BootstrapInput
          {...propsFunction(name, null, forcePreview)}
          id={name}
          multiline
          minRows={4}
          className={inputClassName}
        />
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
        disabled={disabled}
        sx={{ marginBottom: 3, ...sx }}
      >
        <BootstrapInput
          placeholder='Question Name'
          onChange={(e) => {
            const newValue = e.target.value;
            updateLabelFunction(name, newValue);
          }}
          value={label}
          id={name}
          className={inputClassName}
        />
      </FormControl>
    );
  }

  return <></>;
}
