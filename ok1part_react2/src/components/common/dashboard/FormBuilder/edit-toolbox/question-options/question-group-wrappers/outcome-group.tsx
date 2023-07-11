import { IEditToolboxProps } from '../..';
import useIsOf from '../function-hooks/use-is-of';
import useOutcome from '../function-hooks/use-outcome';
import AddComparisonSetting from '../options/add-comparison-setting';
import ComparisonCheckedValue from '../options/comparison-checked-value';
import ComparisonExactValue from '../options/comparison-exact-value';
import ComparisonInfMarginError from '../options/comparison-inf-marg-error';
import ComparisonInfMarginErrorEq from '../options/comparison-inf-marg-error-eq';
import ComparisonMaxEqValue from '../options/comparison-max-eq-value';
import ComparisonMaxValue from '../options/comparison-max-value';
import ComparisonMinEqValue from '../options/comparison-min-eq-value';
import ComparisonMinValue from '../options/comparison-min-value';
import ComparisonSelOption from '../options/comparison-sel-option';
import ComparisonSupMarginError from '../options/comparison-sup-marg-error';
import ComparisonSupMarginErrorEq from '../options/comparison-sup-marg-error-eq';
import ComparisonToggleValue from '../options/comparison-toggle-value';
import EndForm from '../options/end-form';
import SuccessMode from '../options/success-condition';
import QuestionGroupWrapper from '../question-group-wrapper';

interface IOutcomeGroupProps {
  qoProps: IEditToolboxProps;
  isOfSuccessMode: ReturnType<typeof useIsOf>['isOfSuccessMode'];
  isOfComparisonType: ReturnType<typeof useIsOf>['isOfComparisonType'];
  conditionSettingAvailable: ReturnType<
    typeof useOutcome
  >['conditionSettingAvailable'];
  conditionsAvailable: ReturnType<typeof useOutcome>['conditionsAvailable'];
}

export default function OutcomeGroup({
  qoProps,
  isOfSuccessMode,
  isOfComparisonType,
  conditionsAvailable,
  conditionSettingAvailable,
}: IOutcomeGroupProps) {
  const fieldRef = qoProps.fieldsArray[qoProps.id - 1];
  return (
    <QuestionGroupWrapper title='Outcome Settings'>
      <SuccessMode {...qoProps} />
      {/* ANCHOR - Add Validation Menu (no need to implement anything here) */}

      {/* FIXME - Deprecated concept
    {isOfSuccessMode(['comparison']) && <ComparisonType {...qoProps} /> */}
      {isOfSuccessMode(['comparison']) &&
        (fieldRef?.outcomeConfig?.comparisons || []).map(
          (comparison, index) => {
            // TODO - Add prop to reference the comparison index in the components below
            /* ANCHOR - Render of the fields to edit the values of the comparisons
             */
            if (
              comparison.comparisonType === 'exact' &&
              conditionSettingAvailable('exact') &&
              isOfComparisonType(index, ['exact'])
            )
              return (
                <ComparisonExactValue
                  comparisonIndex={index}
                  key={index}
                  {...qoProps}
                />
              );
            if (
              comparison.comparisonType === 'minValue' &&
              conditionSettingAvailable('minValue') &&
              isOfComparisonType(index, ['minValue'])
            )
              return (
                <ComparisonMinValue
                  comparisonIndex={index}
                  key={index}
                  {...qoProps}
                />
              );
            if (
              comparison.comparisonType === 'maxValue' &&
              conditionSettingAvailable('maxValue') &&
              isOfComparisonType(index, ['maxValue'])
            )
              return (
                <ComparisonMaxValue
                  comparisonIndex={index}
                  key={index}
                  {...qoProps}
                />
              );
            if (
              comparison.comparisonType === 'minValueEq' &&
              conditionSettingAvailable('minValueEq') &&
              isOfComparisonType(index, ['minValueEq'])
            )
              return (
                <ComparisonMinEqValue
                  comparisonIndex={index}
                  key={index}
                  {...qoProps}
                />
              );
            if (
              comparison.comparisonType === 'maxValueEq' &&
              conditionSettingAvailable('maxValueEq') &&
              isOfComparisonType(index, ['maxValueEq'])
            )
              return (
                <ComparisonMaxEqValue
                  comparisonIndex={index}
                  key={index}
                  {...qoProps}
                />
              );
            if (
              comparison.comparisonType === 'percentMarginErrorInferior' &&
              conditionSettingAvailable('percentMarginErrorInferior') &&
              isOfComparisonType(index, ['percentMarginErrorInferior'])
            )
              return (
                <ComparisonInfMarginError
                  comparisonIndex={index}
                  key={index}
                  {...qoProps}
                />
              );
            if (
              comparison.comparisonType === 'percentMarginErrorInferiorEq' &&
              conditionSettingAvailable('percentMarginErrorInferiorEq') &&
              isOfComparisonType(index, ['percentMarginErrorInferiorEq'])
            )
              return (
                <ComparisonInfMarginErrorEq
                  comparisonIndex={index}
                  key={index}
                  {...qoProps}
                />
              );
            if (
              comparison.comparisonType === 'percentMarginErrorSuperior' &&
              conditionSettingAvailable('percentMarginErrorSuperior') &&
              isOfComparisonType(index, ['percentMarginErrorSuperior'])
            )
              return (
                <ComparisonSupMarginError
                  comparisonIndex={index}
                  key={index}
                  {...qoProps}
                />
              );
            if (
              comparison.comparisonType === 'percentMarginErrorSuperiorEq' &&
              conditionSettingAvailable('percentMarginErrorSuperiorEq') &&
              isOfComparisonType(index, ['percentMarginErrorSuperiorEq'])
            )
              return (
                <ComparisonSupMarginErrorEq
                  comparisonIndex={index}
                  key={index}
                  {...qoProps}
                />
              );
            if (
              comparison.comparisonType === 'toggleValue' &&
              conditionSettingAvailable('toggleValue') &&
              isOfComparisonType(index, ['toggleValue'])
            )
              return (
                <ComparisonToggleValue
                  comparisonIndex={index}
                  key={index}
                  {...qoProps}
                />
              );
            if (
              comparison.comparisonType === 'isChecked' &&
              conditionSettingAvailable('isChecked') &&
              isOfComparisonType(index, ['isChecked'])
            )
              return (
                <ComparisonCheckedValue
                  comparisonIndex={index}
                  key={index}
                  {...qoProps}
                />
              );
            if (
              comparison.comparisonType === 'selectedOption' &&
              conditionSettingAvailable('selectedOption') &&
              isOfComparisonType(index, ['selectedOption'])
            )
              return (
                <ComparisonSelOption
                  comparisonIndex={index}
                  key={index}
                  {...qoProps}
                />
              );
            return null;
          }
        )}

      {isOfSuccessMode(['comparison']) && conditionsAvailable.length > 0 && (
        <AddComparisonSetting {...qoProps}>
          {conditionsAvailable}
        </AddComparisonSetting>
      )}
      {isOfSuccessMode(['comparison']) && <EndForm {...qoProps} />}
      {/* FIXME - Deprecated concept
    {isOfSuccessMode(['comparison']) && <Behavior {...qoProps} />
    */}
    </QuestionGroupWrapper>
  );
}
