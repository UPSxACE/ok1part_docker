import { ValidationType } from '@/components/common/dashboard/form-renderer/use-init-form';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import {
  FieldsArray,
  IFieldOption,
} from '@/components/common/dashboard/form-renderer';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

export interface IRadioImageProps {
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
}

export interface IRadioImageAnswerModeProps extends IRadioImageProps {
  mode: 'answer';
}

export interface IRadioImageEditModeProps extends IRadioImageProps {
  mode: 'edit';
  updateLabelFunction: Function;
  setFieldsArray: Dispatch<SetStateAction<FieldsArray>>;
}

export default function RadioImage(
  props: IRadioImageAnswerModeProps | IRadioImageEditModeProps
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
    radioClassName = '',
  } = props;

  if (mode === 'answer') {
    return (
      <Box>
        <FormLabel disabled={disabled} htmlFor={name}>
          {label || 'Question'}
        </FormLabel>
        <Box sx={{ display: 'flex', mt: 1, flexWrap: 'wrap' }}>
          {options.map((option, index) => {
            return (
              <Box
                key={index}
                sx={{
                  userSelect: 'none',
                  width: { xs: '100%', sm: '50%', md: '25%' },
                  display: 'flex',
                  px: {
                    xs: 0,
                    sm: 1.5,
                  },
                  '&:not(:first-of-type)': {
                    pt: {
                      xs: 3,
                      sm: 0,
                    },
                  },
                  '&:not(:first-of-type):not(:nth-of-type(2))': {
                    pt: {
                      sm: 3,
                      md: 0,
                    },
                  },

                  '&:nth-of-type(2n + 1)': {
                    pl: { sm: 0, md: 1.5 },
                  },
                  '&:nth-of-type(2n)': {
                    pr: { sm: 0, md: 1.5 },
                  },
                  '&:first-of-type': {
                    pl: { md: 0 },
                  },
                  '&:last-of-type': {
                    pr: { md: 0 },
                  },
                  '&:after': {
                    content: '""',
                    display: 'block',
                    paddingBottom: '100%',
                  },
                }}
                onClick={() => {
                  if (!disabled) {
                    updateFieldFunc(name, option.id);
                  }
                }}
              >
                <Box
                  sx={(theme) => ({
                    flex: 1,
                    backgroundColor: 'grey',
                    position: 'relative',
                    border: 4,
                    borderColor:
                      currentValue === option.id
                        ? 'primary.main'
                        : disabled
                        ? '#e2e2e2'
                        : '#acacac',
                    borderRadius: 2,
                    overflow: 'hidden',
                    '&:hover': {
                      cursor: disabled ? 'default' : 'pointer',
                      borderColor: disabled ? '' : 'primary.main',
                      //borderColor: `${theme.palette.info.main}`,
                    },
                  })}
                >
                  <Image
                    src={typeof option.label === 'string' ? option.label : ''}
                    alt='image option'
                    fill
                    style={{
                      objectFit: 'cover',
                      opacity: disabled ? 0.75 : 1,
                      pointerEvents: 'none',
                    }}
                    sizes='(max-width: 600px) 430px,
                           (max-width: 900px) 325px,
                           (min-width: 901px) 200px,
                           200px'
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }

  return <></>;
}
