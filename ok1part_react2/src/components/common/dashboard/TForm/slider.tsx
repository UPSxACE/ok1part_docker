import FormHelperText from '@mui/material/FormHelperText';
import { ValidationType } from '@/components/common/dashboard/form-renderer/use-init-form';
import { Box, FormLabel, Slider as SliderMui, Typography } from '@mui/material';

export interface ISliderProps {
  name: string;
  label: string;
  mode: string;
  errors: { [key: string]: any };
  rules?: ValidationType[];
  updateFieldFunc: Function;
  sx?: any;
  disabled?: boolean;
  regexp?: RegExp | false;
  SubComponent?: any;
}

export interface ISliderAnswerModeProps extends ISliderProps {
  mode: 'answer';
}

export interface ISliderEditModeProps extends ISliderProps {
  mode: 'edit';
  updateLabelFunction: Function;
}

export interface ISliderNumberTypeProps {
  type: 'number';
  min: number;
  max: number;
  step?: number;
  defaultValue: number;
  currentValue: number;
  showLabel?: boolean;
}

export interface ISliderLabelTypeProps {
  type: 'label';
  steps: string[] | number[];
  defaultValue: string | number;
  currentValue: number;
}

export default function Slider(
  props: (ISliderAnswerModeProps | ISliderEditModeProps) &
    (ISliderNumberTypeProps | ISliderLabelTypeProps)
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
    type = 'number',
    regexp = false,
    SubComponent,
    defaultValue,
    currentValue,
  } = props;

  function getMarks() {
    if (props.type === 'label') {
      const steps_formatted = props.steps.map((option, index) => ({
        //label: option,
        value: index + 1,
      }));

      return steps_formatted;
    }

    return [];
  }

  function getLabelDefault() {
    if (props.type === 'label') {
      return props.steps.findIndex((option) => option === defaultValue);
    }
    return 0;
  }

  if (mode === 'answer') {
    return (
      <Box sx={{ paddingX: 1 }}>
        <FormLabel disabled={disabled} htmlFor={name}>
          {label || 'Question'}
        </FormLabel>
        <SliderMui
          disabled={disabled}
          value={
            props.currentValue ||
            (props.type === 'number'
              ? props.defaultValue
              : getLabelDefault() + 1)
          } // FIXME - 0 is probably not a good fallback number for all situations
          min={props.type === 'number' ? props.min : 1}
          max={props.type === 'number' ? props.max : props.steps.length}
          id={name}
          onChange={(e: any) => {
            const new_value = e?.target?.value;
            if (new_value !== null && new_value !== undefined) {
              updateFieldFunc(name, new_value);
            }
          }}
          valueLabelDisplay={props.type === 'number' ? 'auto' : 'off'}
          valueLabelFormat={
            props.type === 'label' ? (val) => props.steps[val - 1] : undefined
          }
          step={props.type === 'number' ? 1 : null}
          marks={props.type === 'label' ? getMarks() : undefined}
          //sx={{ mt: props.type === 'number' ? 0 : 4 }}
        />
        {props.type === 'number' && props.showLabel && (
          <Box sx={{ display: 'flex' }}>
            <Typography
              variant='body1'
              component='span'
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: disabled ? '#00000061' : 'black',
              }}
            >
              {props.min}
            </Typography>
            <Typography
              variant='body1'
              component='span'
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: disabled ? '#00000061' : 'black',
                marginLeft: 'auto',
              }}
            >
              {props.max}
            </Typography>
          </Box>
        )}
        {props.type === 'label' && (
          <Typography
            variant='body1'
            component='span'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              color: disabled ? '#00000061' : 'black',
            }}
          >
            {props.currentValue
              ? props.steps[props.currentValue - 1]
              : props.steps[getLabelDefault()]}
          </Typography>
        )}
        {SubComponent && <SubComponent />}
        {errors?.[name] && (
          <FormHelperText id={name + '-text'}>{errors[name][0]}</FormHelperText>
        )}
      </Box>
    );
  }

  return <></>;
}
