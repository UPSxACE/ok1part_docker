import React, { Dispatch, SetStateAction } from 'react';
import {
  FieldsArray,
  ISimpleColumnObject,
  ISubFieldObject,
} from '../form-renderer';
import { ValidationType } from '../form-renderer/use-init-form';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import { ToggleComponent } from './toggle-label';
import BootstrapInput from '../bootstrap-input';

export interface IGridAdvancedProps {
  name: string;
  label: string;
  errors: { [key: string]: any };
  rules?: ValidationType[];
  currentValue: { [key: string]: any } | undefined | null;
  updateFieldFunc: Function;
  sx?: any;
  disabled?: boolean;
  radioClassName?: string;
  columns: ISimpleColumnObject[];
  rows: ISubFieldObject[];
  accurateLabel?: string;
  inaccurateLabel?: string;
}

export interface IGridAdvancedAnswerModeProps extends IGridAdvancedProps {
  mode: 'answer';
}

export interface IGridAdvancedEditModeProps extends IGridAdvancedProps {
  mode: 'edit';
  updateLabelFunction: Function;
  setFieldsArray: Dispatch<SetStateAction<FieldsArray>>;
}

export default function GridAdvanced(
  props: IGridAdvancedAnswerModeProps | IGridAdvancedEditModeProps
) {
  const {
    name,
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
    accurateLabel,
    inaccurateLabel,
  } = props;

  if (mode === 'answer') {
    return (
      <React.Fragment>
        <FormLabel disabled={disabled} htmlFor={name}>
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
                        {row.type === 'multiple-checkbox' && (
                          <CheckboxRow
                            name={name}
                            row={row}
                            column={column}
                            disabled={disabled}
                            updateFieldFunc={updateFieldFunc}
                            currentValue={currentValue}
                          />
                        )}
                        {row.type === 'radio' && (
                          <RadioRow
                            name={name}
                            row={row}
                            column={column}
                            disabled={disabled}
                            updateFieldFunc={updateFieldFunc}
                            currentValue={currentValue}
                          />
                        )}
                        {row.type === 'toggle-label' && (
                          <ToggleLabelRow
                            name={name}
                            row={row}
                            column={column}
                            disabled={disabled}
                            updateFieldFunc={updateFieldFunc}
                            currentValue={currentValue}
                            accurateLabel={accurateLabel}
                            inaccurateLabel={inaccurateLabel}
                          />
                        )}
                        {row.type === 'select' && (
                          <SelectRow
                            name={name}
                            row={row}
                            column={column}
                            disabled={disabled}
                            updateFieldFunc={updateFieldFunc}
                            currentValue={currentValue}
                          />
                        )}
                        {row.type === 'short-answer' && (
                          <ShortAnswerRow
                            name={name}
                            row={row}
                            column={column}
                            disabled={disabled}
                            updateFieldFunc={updateFieldFunc}
                            currentValue={currentValue}
                          />
                        )}
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

// Functions...

interface ISubComponentProps {
  name: string;
  row: ISubFieldObject;
  column: ISimpleColumnObject;
  disabled: boolean;
  currentValue: { [key: string]: any } | undefined | null;
  updateFieldFunc: Function;
}

function CheckboxRow({
  name,
  row,
  column,
  disabled,
  currentValue,
  updateFieldFunc,
}: ISubComponentProps) {
  return (
    <Typography variant='body1' component='span'>
      <Checkbox
        disabled={disabled}
        checked={
          typeof currentValue?.[row.id]?.[column.id] === 'boolean'
            ? currentValue[row.id][column.id]
            : false
        }
        onClick={() => {
          if (!disabled) {
            updateFieldFunc(name, (c_value: any) => {
              const current_object = typeof c_value === 'object' ? c_value : {};

              // Debug: console.log(c_value);

              return Object.assign({}, current_object, {
                [row.id]:
                  typeof c_value?.[row.id]?.[column.id] === 'boolean'
                    ? {
                        ...current_object[row.id],
                        [column.id]: !c_value[row.id][column.id],
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
  );
}

function RadioRow({
  name,
  row,
  column,
  disabled,
  currentValue,
  updateFieldFunc,
}: ISubComponentProps) {
  return (
    <Typography variant='body1' component='span'>
      <Radio
        disableRipple={disabled}
        sx={{ cursor: disabled ? 'default' : 'pointer' }}
        checked={currentValue?.[row.id] === column.id ? true : false}
        onClick={() => {
          if (!disabled) {
            updateFieldFunc(name, (c_value: any) => {
              // Debug: console.log(c_value);
              return Object.assign({}, c_value, {
                [row.id]: column.id,
              });
            });
          }
        }}
      />
    </Typography>
  );
}

function SelectRow({
  name,
  row,
  column,
  disabled,
  currentValue,
  updateFieldFunc,
}: ISubComponentProps) {
  return (
    <Select
      sx={{ height: 40, width: 150 }}
      variant='outlined'
      value={currentValue?.[row.id]?.[column.id] || ''}
      onChange={(e) => {
        const newValue = e.target.value;
        updateFieldFunc(name, (c_value: any) => {
          const current_object = typeof c_value === 'object' ? c_value : {};

          // Debug: console.log(c_value);

          return Object.assign({}, current_object, {
            [row.id]:
              typeof c_value?.[row.id]?.[column.id] === 'string'
                ? {
                    ...current_object[row.id],
                    [column.id]: newValue,
                  }
                : typeof c_value?.[row.id] === 'object'
                ? {
                    ...current_object[row.id],
                    [column.id]: newValue,
                  }
                : { [column.id]: newValue },
          });
        });
      }}
      disabled={disabled}
    >
      {row?.fieldConfig?.options &&
        row.fieldConfig.options.map((option, index) => {
          return (
            <MenuItem key={index} value={option.id}>
              {option.label}
            </MenuItem>
          );
        })}
    </Select>
  );
}

function ShortAnswerRow({
  name,
  row,
  column,
  disabled,
  currentValue,
  updateFieldFunc,
}: ISubComponentProps) {
  return (
    <BootstrapInput
      disabled={disabled}
      value={currentValue?.[row.id]?.[column.id] || ''}
      onChange={(e) => {
        const newValue = e.target.value;
        updateFieldFunc(name, (c_value: any) => {
          const current_object = typeof c_value === 'object' ? c_value : {};

          // Debug: console.log(c_value);

          return Object.assign({}, current_object, {
            [row.id]:
              typeof c_value?.[row.id]?.[column.id] === 'string'
                ? {
                    ...current_object[row.id],
                    [column.id]: newValue,
                  }
                : typeof c_value?.[row.id] === 'object'
                ? {
                    ...current_object[row.id],
                    [column.id]: newValue,
                  }
                : { [column.id]: newValue },
          });
        });
      }}
      id={name}
      type={row.fieldConfig?.type || 'none'}
      sx={{
        width: 150,
        '& .MuiInputBase-input': {
          height: '20px',
        },
      }}
    />
  );
}

function ToggleLabelRow({
  name,
  row,
  column,
  disabled,
  currentValue,
  updateFieldFunc,
  accurateLabel,
  inaccurateLabel,
}: ISubComponentProps & { accurateLabel?: string; inaccurateLabel?: string }) {
  return (
    <React.Fragment>
      <ToggleComponent
        disabled={disabled}
        checked={
          typeof currentValue?.[row.id]?.[column.id] === 'boolean'
            ? currentValue[row.id][column.id]
            : false
        }
        onChange={(new_value) => {
          updateFieldFunc(name, (c_value: any) => {
            const current_object = typeof c_value === 'object' ? c_value : {};

            // Debug: console.log(c_value);

            return Object.assign({}, current_object, {
              [row.id]:
                typeof c_value?.[row.id]?.[column.id] === 'boolean'
                  ? {
                      ...current_object[row.id],
                      [column.id]: !c_value[row.id][column.id],
                    }
                  : typeof c_value?.[row.id] === 'object'
                  ? {
                      ...current_object[row.id],
                      [column.id]: true,
                    }
                  : { [column.id]: true },
            });
          });
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
        {typeof currentValue?.[row.id]?.[column.id] === 'boolean' &&
        currentValue[row.id][column.id]
          ? accurateLabel || 'ACCRT'
          : inaccurateLabel || 'INACC'}
      </Typography>
    </React.Fragment>
  );
}
