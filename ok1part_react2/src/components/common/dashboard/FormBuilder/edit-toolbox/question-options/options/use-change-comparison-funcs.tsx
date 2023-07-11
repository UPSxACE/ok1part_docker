import { FieldsArray } from '@/components/common/dashboard/form-renderer';
import { SelectChangeEvent } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export default function useChangeComparisonFuncs({
  fieldsArray,
  setFieldsArray,
  id,
  comparisonIndex,
}: {
  fieldsArray: FieldsArray;
  setFieldsArray: Dispatch<SetStateAction<FieldsArray>>;
  id: number;
  comparisonIndex: number;
}) {
  const current_config =
    fieldsArray?.[id - 1]?.outcomeConfig?.comparisons?.[comparisonIndex]
      ?.comparisonConfig;

  const current_comparison_value =
    fieldsArray?.[id - 1]?.outcomeConfig?.comparisons?.[comparisonIndex]
      ?.comparisonConfig?.comparisonValue;
  const current_secondary_value =
    fieldsArray?.[id - 1]?.outcomeConfig?.comparisons?.[comparisonIndex]
      ?.comparisonConfig?.secondaryValue;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as string | number;
    setFieldsArray((currentState) => {
      const newFieldsArray: FieldsArray = Object.assign([], currentState);
      const _comparison = newFieldsArray?.[id - 1]?.outcomeConfig?.comparisons;

      if (
        !newFieldsArray?.[id - 1]?.outcomeConfig?.comparisons?.[comparisonIndex]
          ?.comparisonConfig &&
        _comparison
      )
        _comparison[comparisonIndex].comparisonConfig = {};
      const current_config = _comparison?.[comparisonIndex]?.comparisonConfig;

      if (current_config) {
        current_config.comparisonValue = value;
      } else {
        throw new Error('Invalid Outcome Comparison Config');
      }

      return newFieldsArray;
    });
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    const value = event.target.value as string | number;
    setFieldsArray((currentState) => {
      const newFieldsArray: FieldsArray = Object.assign([], currentState);
      const _comparison = newFieldsArray?.[id - 1]?.outcomeConfig?.comparisons;

      if (
        !newFieldsArray?.[id - 1]?.outcomeConfig?.comparisons?.[comparisonIndex]
          ?.comparisonConfig &&
        _comparison
      )
        _comparison[comparisonIndex].comparisonConfig = {};
      const current_config = _comparison?.[comparisonIndex]?.comparisonConfig;

      if (current_config) {
        current_config.comparisonValue = value;
      } else {
        throw new Error('Invalid Outcome Comparison Config');
      }

      return newFieldsArray;
    });
  };

  const handleChangeBase = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as string | number;
    setFieldsArray((currentState) => {
      const newFieldsArray: FieldsArray = Object.assign([], currentState);
      const _comparison = newFieldsArray?.[id - 1]?.outcomeConfig?.comparisons;

      if (
        !newFieldsArray?.[id - 1]?.outcomeConfig?.comparisons?.[comparisonIndex]
          ?.comparisonConfig &&
        _comparison
      )
        _comparison[comparisonIndex].comparisonConfig = {};
      const current_config = _comparison?.[comparisonIndex]?.comparisonConfig;

      if (current_config) {
        current_config.secondaryValue = value;
      } else {
        throw new Error('Invalid Outcome Comparison Config');
      }

      return newFieldsArray;
    });
  };

  function deleteComparison() {
    setFieldsArray((currentState) => {
      const newArray: FieldsArray = Object.assign([], currentState);

      if (typeof comparisonIndex === 'number') {
        newArray?.[id - 1]?.outcomeConfig?.comparisons?.splice(
          comparisonIndex,
          1
        );
      }

      return newArray;
    });
  }

  return {
    current_config,
    current_comparison_value,
    current_base_value: current_secondary_value,
    handleChange,
    handleChangeBase,
    handleChangeSelect,
    deleteComparison,
  };
}
