import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import { ValidationType } from '../form-renderer/use-init-form';
import { Dispatch, SetStateAction } from 'react';
import { FieldsArray, IFieldOption } from '../form-renderer';
export interface IRadioColorProps {
  name: string;
  label: string;
  errors: { [key: string]: any };
  rules?: ValidationType[];
  currentValue: string;
  updateFieldFunc: Function;
  options: IFieldOption[];
  sx?: any;
  disabled?: boolean;
  radioClassName?: string;
  spread?: boolean;
}

export interface IRadioColorAnswerModeProps extends IRadioColorProps {
  mode: 'answer';
}

export interface IRadioColorEditModeProps extends IRadioColorProps {
  mode: 'edit';
  updateLabelFunction: Function;
  setFieldsArray: Dispatch<SetStateAction<FieldsArray>>;
}

export default function RadioColor(
  props: IRadioColorAnswerModeProps | IRadioColorEditModeProps
) {
  const {
    disabled,
    label,
    name,
    options,
    updateFieldFunc,
    currentValue,
    spread = true,
  } = props;

  if (props.mode === 'answer') {
    return (
      <Box>
        <FormLabel disabled={disabled} htmlFor={name}>
          {label || 'Question'}
        </FormLabel>
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            gap: 2,
            justifyContent: spread ? 'space-around' : 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          {options.map((option, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    cursor: !disabled ? 'pointer' : 'default',
                    userSelect: 'none',
                    width: 75,
                    height: 75,
                    backgroundColor: option.label as string,
                    border: 2,
                    borderColor:
                      currentValue === option.id
                        ? 'primary.main'
                        : disabled
                        ? '#e2e2e2'
                        : '#acacac',
                    borderRadius: 1,
                    opacity: disabled ? 0.75 : 1,
                  }}
                  onClick={() => {
                    if (!disabled) {
                      updateFieldFunc(name, option.id);
                    }
                  }}
                />
                <Radio
                  disabled={disabled}
                  disableRipple={disabled}
                  sx={{ cursor: disabled ? 'default' : 'pointer' }}
                  checked={currentValue === option.id}
                  onClick={() => {
                    if (!disabled) {
                      updateFieldFunc(name, option.id);
                    }
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }

  return <></>;
}
