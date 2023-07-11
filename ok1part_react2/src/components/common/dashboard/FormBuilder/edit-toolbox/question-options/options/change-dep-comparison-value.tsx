import {
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import QuestionOptionWrapper from '../question-option-wrapper';
import BootstrapInput from '@/components/common/dashboard/bootstrap-input';
import { IEditToolboxProps } from '../..';
import { FieldsArray } from '@/components/common/dashboard/form-renderer';
import React from 'react';

export default function ChangeDepComparisonValue({
  children,
  id,
  focusedElement,
  setFocusedElement,
  actions,
  renderQuestionOptions = true,
  fieldsArray,
  setFieldsArray,
  depIndex,
}: IEditToolboxProps & { depIndex: number }) {
  const current =
    fieldsArray?.[id - 1]?.['deps']?.[depIndex]?.comparison?.comparisonValue;
  const currentSec =
    fieldsArray?.[id - 1]?.['deps']?.[depIndex]?.comparison?.secondaryValue;

  const fieldRef = fieldsArray?.[id - 1];
  const fieldId = fieldRef?.id_;
  const depFieldIndex = fieldRef?.deps?.[depIndex].questionIndex;

  const depFieldRef =
    typeof depFieldIndex === 'number' ? fieldsArray[depFieldIndex] : null;

  const depCompType =
    fieldsArray?.[id - 1]?.['deps']?.[depIndex]?.comparison?.type;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as string | number;
    setFieldsArray((currentState) => {
      const newFieldsArray: FieldsArray = Object.assign([], currentState);

      const comparisonRef =
        newFieldsArray?.[id - 1]?.['deps']?.[depIndex]?.comparison;

      if (comparisonRef) {
        comparisonRef.comparisonValue = value;
      } else {
        throw Error(
          'Invalid reference to dependency comparison object on ChangeDepComparisonValue component.'
        );
      }

      return newFieldsArray;
    });
  };

  const handleChangeSelect = (event: SelectChangeEvent<string | number>) => {
    const value = event.target.value as string | number;
    setFieldsArray((currentState) => {
      const newFieldsArray: FieldsArray = Object.assign([], currentState);

      const comparisonRef =
        newFieldsArray?.[id - 1]?.['deps']?.[depIndex]?.comparison;

      if (comparisonRef) {
        comparisonRef.comparisonValue = value;
      } else {
        throw Error(
          'Invalid reference to dependency comparison object on ChangeDepComparisonValue component.'
        );
      }

      return newFieldsArray;
    });
  };

  const handleChangeSecondary = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value as string | number;
    setFieldsArray((currentState) => {
      const newFieldsArray: FieldsArray = Object.assign([], currentState);

      const comparisonRef =
        newFieldsArray?.[id - 1]?.['deps']?.[depIndex]?.comparison;

      if (comparisonRef) {
        comparisonRef.secondaryValue = value;
      } else {
        throw Error(
          'Invalid reference to dependency comparison object on ChangeDepComparisonValue component.'
        );
      }

      return newFieldsArray;
    });
  };

  return (
    <React.Fragment>
      <QuestionOptionWrapper>
        <ListItemText>Value to Compare</ListItemText>

        <FormControl>
          {depCompType && depCompType === 'toggleValue' && (
            <Select
              sx={{ width: 150, height: 40 }}
              value={current ? current : ''}
              onChange={handleChangeSelect}
            >
              <MenuItem value='true'>Toggled</MenuItem>
              <MenuItem value='false'>Not Toggled</MenuItem>
            </Select>
          )}
          {depCompType && depCompType === 'isChecked' && (
            <Select
              sx={{ width: 150, height: 40 }}
              value={current ? current : ''}
              onChange={handleChangeSelect}
            >
              <MenuItem value='true'>Checked</MenuItem>
              <MenuItem value='false'>Not Checked</MenuItem>
            </Select>
          )}
          {depCompType && depCompType === 'selectedOption' && (
            <Select
              sx={{ width: 150, height: 40 }}
              value={current ? current : ''}
              onChange={handleChangeSelect}
            >
              {(depFieldRef?.fieldConfig?.options || []).map(
                (option, index) => {
                  return (
                    <MenuItem key={index} value={option.id}>
                      {option.label || 'Option ' + (index + 1)}
                    </MenuItem>
                  );
                }
              )}
            </Select>
          )}
          {depCompType !== 'toggleValue' &&
            depCompType !== 'isChecked' &&
            depCompType !== 'selectedOption' && (
              <BootstrapInput
                //inputMode='numeric'
                sx={{
                  width: 150,
                  '& .MuiInputBase-input': {
                    height: '18px',
                  },
                }}
                className={'lightGreyDisable'}
                id={'dep-value-' + String(fieldId) + '-' + String(depIndex)}
                value={current ? current : ''}
                placeholder='Insert a value'
                onChange={handleChange}
                type='numeric'
              />
            )}
        </FormControl>
      </QuestionOptionWrapper>
      {depCompType && (
        <React.Fragment>
          {(depCompType === 'percentMarginErrorInferior' ||
            depCompType === 'percentMarginErrorInferiorEq' ||
            depCompType === 'percentMarginErrorSuperior' ||
            depCompType === 'percentMarginErrorSuperiorEq') && (
            <QuestionOptionWrapper>
              <ListItemText>Margin of Error Value ( % )</ListItemText>
              <FormControl>
                <BootstrapInput
                  //inputMode='numeric'
                  sx={{
                    width: 150,
                    '& .MuiInputBase-input': {
                      height: '18px',
                    },
                  }}
                  className={'lightGreyDisable'}
                  id={
                    'dep-sec-value-' + String(fieldId) + '-' + String(depIndex)
                  }
                  value={currentSec ? currentSec : ''}
                  placeholder='Insert a value'
                  onChange={handleChangeSecondary}
                  type='numeric'
                />
              </FormControl>
            </QuestionOptionWrapper>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
