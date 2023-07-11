import React, { Dispatch, SetStateAction } from 'react';
import { FieldsArray } from '../form-renderer';
import { ValidationType } from '../form-renderer/use-init-form';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';

interface IGridColumn {
  id: string;
  label: string;
}
interface IGridRow {
  id: string;
  label: string;
}

export interface IGridCheckboxProps {
  id: string;
  label: string;
  errors: { [key: string]: any };
  rules?: ValidationType[];
  currentValue: { [key: string]: any } | undefined | null;
  updateFieldFunc: Function;
  sx?: any;
  disabled?: boolean;
  radioClassName?: string;
  columns: IGridColumn[];
  rows: IGridRow[];
}

export interface IGridCheckboxAnswerModeProps extends IGridCheckboxProps {
  mode: 'answer';
}

export interface IGridCheckboxEditModeProps extends IGridCheckboxProps {
  mode: 'edit';
  updateLabelFunction: Function;
  setFieldsArray: Dispatch<SetStateAction<FieldsArray>>;
}

export default function GridCheckbox(
  props: IGridCheckboxAnswerModeProps | IGridCheckboxEditModeProps
) {
  const {
    id,
    label,
    errors,
    mode = 'answer',
    currentValue,
    updateFieldFunc,
    sx = {},
    disabled = false,
    radioClassName = '',
    columns,
    rows,
  } = props;

  if (mode === 'answer') {
    return (
      <React.Fragment>
        <FormLabel disabled={disabled} htmlFor={id}>
          {label || 'Question'}
        </FormLabel>
        <Box sx={{ display: 'flex', opacity: disabled ? 0.4 : 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', pr: 3 }}>
            <Box sx={{ height: 50 }}></Box>
            {rows.map((row, index) => {
              return (
                <Box
                  key={index}
                  sx={{ height: 50, display: 'flex', alignItems: 'center' }}
                >
                  <Typography variant='body1' component='span'>
                    {row.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
          <Box sx={{ display: 'flex', flex: 1 }}>
            {columns.map((column, index) => {
              return (
                <Box
                  key={index}
                  sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}
                >
                  <Box
                    sx={{
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant='body1' component='span'>
                      {column.label}
                    </Typography>
                  </Box>
                  {rows.map((row, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          height: 50,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant='body1' component='span'>
                          <Checkbox
                            disabled={disabled}
                            checked={
                              typeof currentValue?.[row.id]?.[column.id] ===
                              'boolean'
                                ? currentValue[row.id][column.id]
                                : false
                            }
                            onClick={() => {
                              if (!disabled) {
                                updateFieldFunc(id, (c_value: any) => {
                                  const current_object =
                                    typeof c_value === 'object' ? c_value : {};

                                  // Debug: console.log(c_value);

                                  return Object.assign({}, current_object, {
                                    [row.id]:
                                      typeof c_value?.[row.id]?.[column.id] ===
                                      'boolean'
                                        ? {
                                            ...current_object[row.id],
                                            [column.id]:
                                              !c_value[row.id][column.id],
                                          }
                                        : typeof c_value?.[row.id] === 'object'
                                        ? {
                                            ...current_object[row.id],
                                            [column.id]: true,
                                          }
                                        : { [column.id]: true },
                                  });
                                });
                              }
                            }}
                          />
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </Box>
      </React.Fragment>
    );
  }

  return <></>;
}
