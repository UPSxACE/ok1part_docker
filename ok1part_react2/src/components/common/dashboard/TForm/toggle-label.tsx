import { Box, FormControl, FormLabel, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { ValidationType } from '../form-renderer/use-init-form';
import Android12Switch from '../android12-switch';
import BootstrapInput from '../bootstrap-input';

/*
const ref = 5; // REVIEW - Decide later if this will become dynamic (according to a prop or length of text)
const subref = 5 + 10 * ref + 5;

const ToggleComponent = styled(Android12Switch)({
  padding: 0,
  width: 2 + subref + 5 + subref + 2,
  '& .MuiSwitch-track': {
    borderRadius: 7,

    '&:before': {
      content: '"ACCRT"',
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      top: '50%',
      width: subref,
      textAlign: 'center',
      left: 5,
      backgroundImage: 'none',
      color: 'white',
    },
    '&:after': {
      content: '"INACC"',
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      top: '50%',
      width: subref,
      textAlign: 'center',
      direction: 'rtl',
      right: 5,
      backgroundImage: 'none',
      color: 'white',
    },
  },
  '& .MuiSwitch-thumb': {
    borderRadius: 5,
    height: 30,
    width: subref,
  },
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      transform: 'translateX(' + (subref + 1) + 'px)',
    },
    padding: 2,
  },
});
*/

export const ToggleComponent = styled(Android12Switch)({
  padding: 0,
  width: 70,
  '& .MuiSwitch-track': {
    borderRadius: 7,

    '&:before': { top: '27.5%', transform: 'scale(1.25)' },
    '&:after': { top: '27.5%', transform: 'scale(1.25)' },
  },
  '& .MuiSwitch-thumb': {
    borderRadius: 5,
    height: 30,
    width: 30,
  },
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      transform: 'translateX(32px)',
    },
    padding: 2,
  },
});

export interface IToggleLabelProps {
  name: string;
  label: string;
  errors: { [key: string]: any };
  rules?: ValidationType[];
  currentValue: boolean | undefined | null;
  updateFieldFunc: Function;
  sx?: any;
  disabled?: boolean;
  inputClassName?: string;
  type?: string;
  regexp?: RegExp | false;
  SubComponent?: any;
  accurateLabel?: string;
  inaccurateLabel?: string;
  forcePreview?: boolean;
}

export interface IToggleLabelAnswerModeProps extends IToggleLabelProps {
  mode: 'answer';
}

export interface IToggleLabelEditModeProps extends IToggleLabelProps {
  mode: 'edit';
  updateLabelFunction: Function;
}

export default function ToggleLabel(
  props: IToggleLabelAnswerModeProps | IToggleLabelEditModeProps
) {
  const {
    name,
    label,
    errors,
    rules,
    currentValue,
    updateFieldFunc,
    mode = 'answer',
    sx = {},
    disabled = false,
    inputClassName = '',
    type,
    regexp = false,
    SubComponent,
    accurateLabel,
    inaccurateLabel,
    forcePreview,
  } = props;
  if (mode === 'answer') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormLabel disabled={disabled} htmlFor={name}>
          {label || 'Question'}
        </FormLabel>
        <Box sx={{ display: 'flex', mt: 1 }}>
          <ToggleComponent
            disabled={disabled}
            checked={!forcePreview && (currentValue || false)}
            onChange={(new_value) => {
              if (forcePreview) return;
              updateFieldFunc(name, new_value.target.checked);
            }}
          />
          <Typography
            sx={{
              ml: 1,
              lineHeight: '2.35rem',
              fontWeight: 'lighter',
              color: disabled ? '#00000061' : 'black',
            }}
            variant='h5'
            component='span'
          >
            {currentValue && !forcePreview
              ? accurateLabel || 'ACCRT'
              : inaccurateLabel || 'INACC'}
          </Typography>
        </Box>
        {SubComponent && <SubComponent />}
      </Box>
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
        {/* <Box sx={{ display: 'flex', mt: 1.5 }}>
          
          <ToggleComponent
            disabled={disabled}
            checked={false}
            onChange={(new_value) => {
              //updateFieldFunc(name, new_value.target.checked);
            }}
          />
          
          <Typography
            sx={{
              ml: 1,
              lineHeight: '2.35rem',
              fontWeight: 'lighter',
              color: disabled ? '#00000061' : 'black',
            }}
            variant='h5'
            component='span'
          >
            {currentValue
              ? accurateLabel || 'ACCRT'
              : inaccurateLabel || 'INACC'}
          </Typography>
        </Box>*/}
      </FormControl>
    );
  }

  return <></>;
}
