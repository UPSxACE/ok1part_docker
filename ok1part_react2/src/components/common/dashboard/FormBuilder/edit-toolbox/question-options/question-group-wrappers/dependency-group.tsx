import React from 'react';
import QuestionGroupWrapper from '../question-group-wrapper';
import Reason from '../options/reason';
import SelectParent from '../options/select-parent';
import getDepConditionsOptions from '../options/get-dep-condition-options';
import ChangeParent from '../options/change-parent';
import SelectDepComparisonType from '../options/select-comparison-type';
import ChangeDepComparisonType from '../options/change-dep-comparison-type';
import ChangeDepComparisonValue from '../options/change-dep-comparison-value';
import NewCondition from '../options/new-condition';
import { IEditToolboxProps } from '../..';
import useIsOf from '../function-hooks/use-is-of';

interface IDependencyGroupProps {
  qoProps: IEditToolboxProps;
  isOfShowQuestion: ReturnType<typeof useIsOf>['isOfShowQuestion'];
}

export default function DependencyGroup({
  qoProps,
  isOfShowQuestion,
}: IDependencyGroupProps) {
  const fieldRef = qoProps.fieldsArray[qoProps.id - 1];

  const dependencies = fieldRef?.['deps'];
  const hasDependency = Boolean(fieldRef?.['deps']?.['0']);
  const dependencyCount = fieldRef?.['deps']?.length || 0;

  return (
    <React.Fragment>
      {isOfShowQuestion(['conditions-met']) && ( // && isOfBehavior(['conditional'])
        <QuestionGroupWrapper title='Setup Conditions'>
          <Reason {...qoProps} />

          {hasDependency &&
            dependencies?.map((dep, index) => {
              if (typeof dep.questionIndex !== 'number') {
                return (
                  <SelectParent key={index} depIndex={index} {...qoProps} />
                );
              }

              if (dep.typeOfCondition === 'parent-compare') {
                const options = getDepConditionsOptions(
                  qoProps.fieldsArray,
                  qoProps.id - 1,
                  index
                );
                return (
                  <React.Fragment key={index}>
                    <ChangeParent depIndex={index} {...qoProps} />
                    {!dep?.comparison?.type ? (
                      <SelectDepComparisonType
                        depIndex={index}
                        {...qoProps}
                        options={options}
                      />
                    ) : (
                      <ChangeDepComparisonType depIndex={index} {...qoProps} />
                    )}
                    {dep?.comparison?.type && (
                      <ChangeDepComparisonValue depIndex={index} {...qoProps} />
                    )}
                  </React.Fragment>
                );
              }

              return <ChangeParent key={index} depIndex={index} {...qoProps} />;
            })}

          {(!hasDependency ||
            typeof dependencies?.[dependencyCount - 1].questionIndex ===
              'number') &&
            (!(
              dependencies?.[dependencyCount - 1]?.typeOfCondition ===
              'parent-compare'
            ) ||
              dependencies?.[dependencyCount - 1]?.comparison?.type) && (
              <NewCondition depIndex={dependencyCount} {...qoProps} />
            )}
        </QuestionGroupWrapper>
      )}
    </React.Fragment>
  );
}
