import TForm from '@/components/common/dashboard/TForm';
import { IFormHeaderBaseProps } from '@/components/common/dashboard/TForm/header';
import { FieldsArray, IFieldObject, ISubFieldObject } from '..';
import { FormInstance, FormatedData } from '../use-init-form';
import DashboardMiniWrapper from '../../dashboard-mini-wrapper';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Divider, List } from '@mui/material';
import DetailsGroup from './details-group';
import TypeOfQuestion from './items/question-settings/type-of-question';
import Required from './items/question-settings/required';
import TypeOfValue from './items/question-settings/type-of-value';
import ShowQuestion from './items/question-settings/show-question';
import { IDetailItemComponentProps } from './items/interfaces';
import ConditionsItems from './items/conditions-show/conditions-items';
import ValidationItems from './items/validation-settings/validation-items';
import SuccessMode from './items/outcome-settings/success-mode';
import EndIfComparisonFails from './items/outcome-settings/end-if-comparison-fails';
import OutcomeItems from './items/outcome-settings/outcome-items';
import minusPercentage from '../../utils/minus-percentage';
import plusPercentage from '../../utils/plus-percentage';
import { IGridRow } from '../../TForm/grid-radio';

export interface IFormRendererAnswerProps {
  fieldsArray: FieldsArray;
  defaultValues?: { [key: string]: any } | Promise<any>; // example: async () => fetch('/api-endpoint');
  header: IFormHeaderBaseProps | null;
  stepByStep?: boolean;
  formInstance: FormInstance;
  forcePreview?: boolean;
  previewDetails?: boolean;
  onSubmit?: (formInstance: FormInstance, formatedData: FormatedData) => any;
}

export default function FormRendererAnswer({
  fieldsArray,
  defaultValues,
  header,
  stepByStep = false,
  formInstance,
  forcePreview = false,
  previewDetails = false,
  onSubmit = () => {},
}: IFormRendererAnswerProps) {
  const {
    formData,
    errors,
    addError,
    validation,
    generateFieldProps,
    generateTextHelperProps,
    onSubmit: _onSubmit,
    currentQuestion,
    nextQuestion,
    previousQuestion,
    updateField,
    isValid,
  } = formInstance;

  function renderField(field: IFieldObject, index: number) {
    // ANCHOR - question renders if cases
    if (field.type === 'short-answer') {
      return (
        <TForm.ShortAnswer
          name={field.id_}
          label={field.label}
          propsFunction={generateFieldProps}
          errors={errors}
          rules={field.rules}
          mode={'answer'}
          disabled={stepByStep && index !== currentQuestion}
          inputClassName={index < currentQuestion ? 'greyDisable' : ''}
          forcePreview={forcePreview}
          type={field?.fieldConfig?.valueType}
        />
      );
    }

    if (field.type === 'long-answer') {
      return (
        <TForm.LongAnswer
          name={field.id_}
          label={field.label}
          propsFunction={generateFieldProps}
          errors={errors}
          rules={field.rules}
          mode={'answer'}
          disabled={stepByStep && index !== currentQuestion}
          inputClassName={index < currentQuestion ? 'greyDisable' : ''}
          forcePreview={forcePreview}
        />
      );
    }

    if (field.type === 'toggle-label') {
      return (
        <TForm.ToggleLabel
          name={field.id_}
          label={field.label}
          currentValue={formData[field.id_] as boolean}
          updateFieldFunc={updateField}
          errors={errors}
          rules={field.rules}
          mode={'answer'}
          disabled={stepByStep && index !== currentQuestion}
          inputClassName={index < currentQuestion ? 'greyDisable' : ''}
          forcePreview={forcePreview}
        />
      );
    }

    if (field.type === 'radio') {
      return (
        <TForm.Radio
          name={field.id_}
          label={field.label}
          propsFunction={generateFieldProps}
          errors={errors}
          rules={field.rules}
          mode={'answer'}
          options={field?.fieldConfig?.options || []}
          disabled={stepByStep && index !== currentQuestion}
          radioClassName={index < currentQuestion ? 'greyDisable' : ''}
          forcePreview={forcePreview}
        />
      );
    }

    if (field.type === 'radio-color') {
      return (
        <TForm.RadioColor
          name={field.id_}
          label={field.label}
          updateFieldFunc={updateField}
          errors={errors}
          rules={field.rules}
          mode={'answer'}
          options={field?.fieldConfig?.options || []}
          disabled={stepByStep && index !== currentQuestion}
          radioClassName={index < currentQuestion ? 'greyDisable' : ''}
          currentValue={formData[field.id_] as string}
        />
      );
    }

    if (field.type === 'select') {
      return (
        <TForm.Select
          name={field.id_}
          label={field.label}
          propsFunction={generateFieldProps}
          errors={errors}
          rules={field.rules}
          mode={'answer'}
          options={field?.fieldConfig?.options || []}
          disabled={stepByStep && index !== currentQuestion}
          selectClassName={index < currentQuestion ? 'greyDisable' : ''}
          forcePreview={forcePreview}
        />
      );
    }

    if (field.type === 'radio-image') {
      return (
        <TForm.RadioImage
          name={field.id_}
          label={field.label}
          updateFieldFunc={updateField}
          errors={errors}
          rules={field.rules}
          mode={'answer'}
          currentValue={
            typeof formData[field.id_] === 'string'
              ? (formData[field.id_] as string)
              : ''
          }
          options={field?.fieldConfig?.options || []}
          disabled={stepByStep && index !== currentQuestion}
          radioClassName={index < currentQuestion ? 'greyDisable' : ''}
        />
      );
    }

    if (field.type === 'range') {
      return (
        <TForm.Range
          name={field.id_}
          label={field.label}
          propsFunction={generateFieldProps}
          errors={errors}
          rules={field.rules}
          mode={'answer'}
          disabled={stepByStep && index !== currentQuestion}
          inputClassName={index < currentQuestion ? 'greyDisable' : ''}
          min={1}
          max={10}
        />
      );
    }

    if (field.type === 'slider') {
      return (
        <TForm.Slider
          name={field.id_}
          label={field.label}
          updateFieldFunc={updateField}
          errors={errors}
          rules={field.rules}
          mode={'answer'}
          disabled={stepByStep && index !== currentQuestion}
          min={Number(field?.fieldConfig?.scaleStart) || 0}
          max={Number(field?.fieldConfig?.scaleEnd) || 1}
          type='number'
          defaultValue={15}
          currentValue={formData[field.id_] as number}
          showLabel={true}
        />
      );
    }

    if (field.type === 'slider-label') {
      let steps = (field?.fieldConfig?.columns || []).map(
        (column) => column.label
      );
      if (steps.length === 0) steps = ['?'];

      return (
        <TForm.Slider
          name={field.id_}
          label={field.label}
          updateFieldFunc={updateField}
          errors={errors}
          rules={field.rules}
          mode={'answer'}
          disabled={stepByStep && index !== currentQuestion}
          steps={steps}
          type='label'
          defaultValue={
            steps[
              (Math.floor(Number(field?.fieldConfig?.columns?.length) / 2) ||
                1) - 1
            ]
          }
          currentValue={formData[field.id_] as number}
        />
      );
    }

    if (field.type === 'scale') {
      return (
        <TForm.Scale
          name={field.id_}
          label={field.label}
          propsFunction={generateFieldProps}
          errors={errors}
          rules={field.rules}
          mode={'answer'}
          options={field?.fieldConfig?.options || []}
          labelStart='Start Label'
          labelEnd='End Label'
          disabled={stepByStep && index !== currentQuestion}
        />
      );
    }

    if (field.type === 'multiple-checkbox') {
      return (
        <TForm.MultipleCheckbox
          name={field.id_}
          label={field.label}
          currentValue={formData[field.id_] as { [key: string]: any }}
          updateFieldFunc={updateField}
          errors={errors}
          rules={field.rules}
          mode={'answer'}
          options={field?.fieldConfig?.options || []}
          disabled={stepByStep && index !== currentQuestion}
          checkboxgroupClassName={index < currentQuestion ? 'greyDisable' : ''}
        />
      );
    }

    if (field.type === 'grid-radio') {
      return (
        <TForm.GridRadio
          id={field.id_}
          label={field.label}
          updateFieldFunc={updateField}
          errors={errors}
          rules={field.rules}
          mode={'answer'}
          disabled={stepByStep && index !== currentQuestion}
          columns={field?.fieldConfig?.columns || []}
          rows={(field?.fieldConfig?.rows as IGridRow[]) || []}
          currentValue={formData[field.id_] as { [key: string]: any }}
        />
      );
    }

    if (field.type === 'grid-checkbox') {
      return (
        <TForm.GridCheckbox
          id={field.id_}
          label={field.label}
          updateFieldFunc={updateField}
          errors={errors}
          rules={field.rules}
          mode={'answer'}
          disabled={stepByStep && index !== currentQuestion}
          columns={field?.fieldConfig?.columns || []}
          rows={(field?.fieldConfig?.rows as IGridRow[]) || []}
          currentValue={formData[field.id_] as { [key: string]: any }}
        />
      );
    }

    if (field.type === 'grid-toggle') {
      return (
        <TForm.GridToggle
          id={field.id_}
          label={field.label}
          updateFieldFunc={updateField}
          errors={errors}
          rules={field.rules}
          mode={'answer'}
          disabled={stepByStep && index !== currentQuestion}
          columns={field?.fieldConfig?.columns || []}
          rows={(field?.fieldConfig?.rows as IGridRow[]) || []}
          currentValue={formData[field.id_] as { [key: string]: any }}
        />
      );
    }

    if (field.type === 'grid-advanced') {
      return (
        <TForm.GridAdvanced
          name={field.id_}
          label={field.label}
          updateFieldFunc={updateField}
          errors={errors}
          rules={field.rules}
          mode={'answer'}
          disabled={stepByStep && index !== currentQuestion}
          columns={field?.fieldConfig?.columns || []}
          rows={(field?.fieldConfig?.rows as ISubFieldObject[]) || []}
          currentValue={formData[field.id_] as { [key: string]: any }}
        />
      );
    }

    if (field.type === 'date') {
      return (
        <TForm.Date
          name={field.id_}
          label={field.label}
          updateFieldFunc={updateField}
          currentValue={formData[field.id_] as string}
          errors={errors}
          rules={field.rules}
          mode={'answer'}
          disabled={stepByStep && index !== currentQuestion}
          inputClassName={index < currentQuestion ? 'greyDisable' : ''}
        />
      );
    }

    if (field.type === 'datetime') {
      return (
        <TForm.DateTime
          name={field.id_}
          label={field.label}
          updateFieldFunc={updateField}
          currentValue={formData[field.id_] as string}
          errors={errors}
          rules={field.rules}
          mode={'answer'}
          disabled={stepByStep && index !== currentQuestion}
          inputClassName={index < currentQuestion ? 'greyDisable' : ''}
        />
      );
    }

    return <div key={index}>Error</div>;
  }

  function checkDeps(
    field: IFieldObject,
    ignoreCurrentQuestionVerification = false
  ): boolean {
    // if question is marked as disabled NEVER render it
    if (field?.showQuestion === 'disabled') {
      return false;
    }

    // if on force-preview mode, then ALWAYS render the question
    if (forcePreview) return true;

    // if field doesn't exist there is no need for more verification
    // it has reached the end of the array probably
    if (field === undefined || field === null) {
      return true;
    }

    let validDeps = true;

    // if deps array exists, check each one of them, and if one fails set validDeps to false
    if (field.deps) {
      field.deps.map((dep) => {
        // if the user has not reached the question referenced on the dependency yet, just return false
        if (
          !ignoreCurrentQuestionVerification &&
          dep.questionIndex &&
          currentQuestion <= dep.questionIndex
        ) {
          validDeps = false;
        }

        // in case the question referenced on the dependency has already been answered, check if the answer
        // satisfies the expected value according to the comparison type

        const questionIndex = dep.questionIndex;
        if (validDeps === true && questionIndex) {
          const typeOfCondition = dep.typeOfCondition;
          const comparisonType = dep.comparison?.type;
          const comparisonValue = dep.comparison?.comparisonValue;
          const secondaryValue = dep.comparison?.secondaryValue;
          // const comparisonValue = dep.comparison.value; // FIXME - Deprecated concept

          if (typeOfCondition === 'parent-compare') {
            // ANCHOR - dependency comparison types implementation
            if (comparisonType === 'minValue') {
              const value = formData?.[fieldsArray[questionIndex].id_];
              if (typeof value === 'string' || typeof value === 'number') {
                if (comparisonValue) {
                  validDeps = Number(value) > Number(comparisonValue);
                }
              } else {
                validDeps = false;
              }
            }
            if (comparisonType === 'maxValue') {
              const value = formData?.[fieldsArray[questionIndex].id_];
              if (typeof value === 'string' || typeof value === 'number') {
                if (comparisonValue) {
                  validDeps = Number(value) < Number(comparisonValue);
                }
              } else {
                validDeps = false;
              }
            }
            if (comparisonType === 'exact') {
              const value = formData?.[fieldsArray[questionIndex].id_];
              if (typeof value === 'string' || typeof value === 'number') {
                if (comparisonValue) {
                  validDeps = String(value) === String(comparisonValue);
                }
              } else {
                validDeps = false;
              }
            }
            if (comparisonType === 'maxValueEq') {
              const value = formData?.[fieldsArray[questionIndex].id_];
              if (typeof value === 'string' || typeof value === 'number') {
                if (comparisonValue) {
                  validDeps =
                    Number(value) < Number(comparisonValue) ||
                    Number(value) === Number(comparisonValue);
                }
              } else {
                validDeps = false;
              }
            }
            if (comparisonType === 'minValueEq') {
              const value = formData?.[fieldsArray[questionIndex].id_];
              if (typeof value === 'string' || typeof value === 'number') {
                if (comparisonValue) {
                  validDeps =
                    Number(value) > Number(comparisonValue) ||
                    Number(value) === Number(comparisonValue);
                }
              } else {
                validDeps = false;
              }
            }
            if (comparisonType === 'percentMarginErrorInferior') {
              const value = formData?.[fieldsArray[questionIndex].id_];
              if (typeof value === 'string' || typeof value === 'number') {
                if (comparisonValue) {
                  const calculatedComparisonValue = minusPercentage(
                    Number(secondaryValue),
                    Number(comparisonValue),
                    false
                  );
                  validDeps = Number(value) > calculatedComparisonValue;
                }
              } else {
                validDeps = false;
              }
            }
            if (comparisonType === 'percentMarginErrorInferiorEq') {
              const value = formData?.[fieldsArray[questionIndex].id_];
              if (typeof value === 'string' || typeof value === 'number') {
                if (comparisonValue) {
                  const calculatedComparisonValue = minusPercentage(
                    Number(secondaryValue),
                    Number(comparisonValue),
                    false
                  );
                  validDeps =
                    Number(value) > calculatedComparisonValue ||
                    Number(value) === calculatedComparisonValue;
                }
              } else {
                validDeps = false;
              }
            }
            if (comparisonType === 'percentMarginErrorSuperior') {
              const value = formData?.[fieldsArray[questionIndex].id_];
              if (typeof value === 'string' || typeof value === 'number') {
                if (comparisonValue) {
                  const calculatedComparisonValue = plusPercentage(
                    Number(secondaryValue),
                    Number(comparisonValue),
                    false
                  );
                  validDeps = Number(value) < calculatedComparisonValue;
                }
              } else {
                validDeps = false;
              }
            }
            if (comparisonType === 'percentMarginErrorSuperiorEq') {
              const value = formData?.[fieldsArray[questionIndex].id_];
              if (typeof value === 'string' || typeof value === 'number') {
                if (comparisonValue) {
                  const calculatedComparisonValue = plusPercentage(
                    Number(secondaryValue),
                    Number(comparisonValue),
                    false
                  );
                  validDeps =
                    Number(value) < calculatedComparisonValue ||
                    Number(value) === calculatedComparisonValue;
                }
              } else {
                validDeps = false;
              }
            }
            if (comparisonType === 'toggleValue') {
              const value = formData?.[fieldsArray[questionIndex].id_];
              if (typeof value === 'boolean') {
                validDeps = String(value) === comparisonValue;
              } else {
                validDeps = false;
              }
            }
            if (comparisonType === 'isChecked') {
              const value = formData?.[fieldsArray[questionIndex].id_];
              if (typeof value === 'boolean') {
                validDeps = String(value) === comparisonValue;
              } else {
                validDeps = false;
              }
            }
          }
        }
      });
    }

    // return the value of validDeps(which may be true or false)
    return validDeps;
  }

  return (
    <TForm.Form
      onSubmit={() => {
        checkUnansweredDefaults();
        onSubmit(formInstance, _onSubmit());
      }}
    >
      <DashboardMiniWrapper sx={{ boxShadow: 'none', p: 3 }}>
        <TForm.Header
          form_name={header?.form_name || null}
          form_description={header?.form_description || null}
        />
      </DashboardMiniWrapper>
      <AnimatePresence>
        {fieldsArray.map((field, index) => {
          const detailComponentProps: IDetailItemComponentProps = {
            fieldsArray: fieldsArray,
            index: index,
          };

          return (
            <React.Fragment key={field.id_}>
              {checkDeps(field) && (
                <motion.div
                  initial={{
                    opacity: !forcePreview && field.deps ? 0 : 1,
                  }}
                  animate={{
                    opacity: 1,
                    transition: {
                      duration: 0.5, // should make all animations last 0.5 second (but i think it's not)
                      opacity: {
                        ease: [0.32, 0.03, 1, 0.4],
                        duration: 0.5,
                      },
                      /*zIndex: {
                        delay: 0.5, // delay the changes to zIndex by 0.5 second
                      },*/
                    },
                  }}
                >
                  <DashboardMiniWrapper
                    sx={{
                      mt: 2,
                      p: 3,
                      boxShadow: 'none',
                      opacity: stepByStep && index > currentQuestion ? 0.4 : 1,
                    }}
                  >
                    {renderField(field, index)}
                    {previewDetails && (
                      <>
                        <Divider sx={{ mt: 1.5, mb: 1.5 }} />

                        <List sx={{ paddingBottom: 0, paddingTop: 0 }}>
                          <DetailsGroup title='Question Settings'>
                            <TypeOfQuestion {...detailComponentProps} />
                            <Required {...detailComponentProps} />
                            <TypeOfValue {...detailComponentProps} />
                            <ShowQuestion {...detailComponentProps} />
                          </DetailsGroup>
                          {fieldsArray[index]?.showQuestion ===
                            'conditions-met' && (
                            <DetailsGroup title='Conditions to Show'>
                              <ConditionsItems {...detailComponentProps} />
                            </DetailsGroup>
                          )}

                          {fieldsArray[index]?.rules &&
                          fieldsArray[index]?.rules?.length ? (
                            <DetailsGroup title='Input Validation Settings'>
                              <ValidationItems {...detailComponentProps} />
                            </DetailsGroup>
                          ) : null}

                          {fieldsArray[index]?.outcomeConfig?.successMode ===
                            'comparison' && (
                            <DetailsGroup title='Outcome Settings'>
                              <SuccessMode {...detailComponentProps} />
                              <OutcomeItems {...detailComponentProps} />
                              <EndIfComparisonFails {...detailComponentProps} />
                            </DetailsGroup>
                          )}
                        </List>
                      </>
                    )}
                  </DashboardMiniWrapper>
                </motion.div>
              )}

              {stepByStep && currentQuestion === index && (
                <TForm.NextButton
                  sx={{ marginLeft: 'auto' }}
                  onClick={() => {
                    // Debug: console.log('NEXT');
                    let valid = false;
                    let question_index = currentQuestion;
                    while (valid === false) {
                      question_index++;
                      valid = checkDeps(fieldsArray[question_index], true);
                    }
                    nextQuestion(question_index);
                  }}
                  disabled={!isValid()}
                />
              )}
            </React.Fragment>
          );
        })}
      </AnimatePresence>
      {!stepByStep ||
        (currentQuestion === fieldsArray.length && (
          <TForm.Submit disabled={!isValid()} />
        ))}
    </TForm.Form>
  );

  // Functions...

  function questionHasDefault(questionType: String) {
    // ANCHOR - Fields that are FORCED to have a value
    const typesWithDefault = ['slider', 'slider-label'];
    return typesWithDefault.findIndex((type) => type === questionType) !== -1;
  }

  function insertDefault(field: IFieldObject) {
    // ANCHOR - Fields that are FORCED to have a value
    const fieldType = field.type;
    switch (fieldType) {
      case 'slider':
        formData[field.id_] = field?.fieldConfig?.scaleEnd
          ? Math.floor(Number(field?.fieldConfig?.scaleEnd) / 2)
          : 0;
        break;
      case 'slider-label':
        formData[field.id_] =
          (Math.floor(Number(field?.fieldConfig?.columns?.length) / 2) || 1) -
          1;
        break;
      default:
        break;
    }
  }

  function checkUnansweredDefaults() {
    fieldsArray.map((field) => {
      if (
        (formData[field.id_] === null || formData[field.id_] === undefined) &&
        questionHasDefault(field.type)
      ) {
        if (checkDeps(field, true)) {
          insertDefault(field);
        }
      }
    });
  }
}
