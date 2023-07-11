import React from 'react';
import { IEditToolboxProps } from '../..';
import useRules from '../function-hooks/use-rules';
import AddValidationSetting from '../options/add-validation-setting';
import ExactLength from '../options/exact-length';
import MaxLength from '../options/max-length';
import MaxLengthEq from '../options/max-length-eq';
import MaxValue from '../options/max-value';
import MaxValueEq from '../options/max-value-eq';
import MinLength from '../options/min-length';
import MinLengthEq from '../options/min-length-eq';
import MinValue from '../options/min-value';
import MinValueEq from '../options/min-value-eq';
import Regex from '../options/regex';
import QuestionGroupWrapper from '../question-group-wrapper';

interface IValidationGroupProps {
  qoProps: IEditToolboxProps;
  optionAvailable: ReturnType<typeof useRules>['optionAvailable'];
  validationSettingsOptions: ReturnType<
    typeof useRules
  >['validationSettingsOptions'];
}

export default function ValidationGroup({
  qoProps,
  optionAvailable,
  validationSettingsOptions,
}: IValidationGroupProps) {
  const fieldRef = qoProps.fieldsArray[qoProps.id - 1];
  return (
    <React.Fragment>
      {(validationSettingsOptions.length > 0 ||
        (fieldRef.rules || []).length > 0) && (
        <QuestionGroupWrapper title='Input Validation Settings'>
          {(fieldRef.rules || []).map((rule, index) => {
            // TODO - Add prop to reference the rule index in the components below
            /* ANCHOR - Render of the fields to edit the values of the rules
             */

            if (rule.name === 'exactLength' && optionAvailable('exactLength'))
              return <ExactLength ruleIndex={index} key={index} {...qoProps} />;
            if (
              false &&
              rule.name === 'minLength' &&
              optionAvailable('minLength')
            )
              // NOTE - It doesn't make sense to have a 'minimum length' that does not accept equal value probably, so it's disabled for now
              return <MinLength ruleIndex={index} key={index} {...qoProps} />;
            if (rule.name === 'minLengthEq' && optionAvailable('minLengthEq'))
              return <MinLengthEq ruleIndex={index} key={index} {...qoProps} />;
            if (
              false &&
              rule.name === 'maxLength' &&
              optionAvailable('maxLength')
            )
              // NOTE - It doesn't make sense to have a 'maximum length' that does not accept equal value probably, so it's disabled for now
              return <MaxLength ruleIndex={index} key={index} {...qoProps} />;
            if (rule.name === 'maxLengthEq' && optionAvailable('maxLengthEq'))
              return <MaxLengthEq ruleIndex={index} key={index} {...qoProps} />;
            if (rule.name === 'minValue' && optionAvailable('minValue'))
              return <MinValue ruleIndex={index} key={index} {...qoProps} />;
            if (rule.name === 'minValueEq' && optionAvailable('minValueEq'))
              return <MinValueEq ruleIndex={index} key={index} {...qoProps} />;
            if (rule.name === 'maxValue' && optionAvailable('maxValue'))
              return <MaxValue ruleIndex={index} key={index} {...qoProps} />;
            if (rule.name === 'maxValueEq' && optionAvailable('maxValueEq'))
              return <MaxValueEq ruleIndex={index} key={index} {...qoProps} />;
            if (rule.name === 'regex' && optionAvailable('regex'))
              return <Regex key={index} {...qoProps} />;
            return null;
          })}
          {/* ANCHOR - Add Validation Menu (no need to implement anything here) */}

          {validationSettingsOptions.length > 0 && (
            <AddValidationSetting {...qoProps}>
              {validationSettingsOptions}
            </AddValidationSetting>
          )}
        </QuestionGroupWrapper>
      )}
    </React.Fragment>
  );
}
