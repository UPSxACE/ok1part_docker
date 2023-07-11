import {
  FieldType,
  IComparisonObject,
  IFieldConfig,
  IFieldObject,
  IOutcomeConfig,
} from '@/components/common/dashboard/form-renderer';

export default function useIsOf(fieldRef: IFieldObject) {
  const typeOfQuestion = fieldRef.type;
  const valueType = fieldRef?.['fieldConfig']?.['valueType'] || 'text';
  const showQuestion = fieldRef?.['showQuestion'] || 'always';
  const successMode = fieldRef?.['outcomeConfig']?.['successMode'] || 'always';

  // Functions...
  function isOfType(possibleTypes: FieldType[]) {
    const foundValue = possibleTypes.find((type) => typeOfQuestion === type);
    if (!foundValue) {
      return false;
    }
    return true;
  }

  function isOfValueType(possibleValueTypes: IFieldConfig['valueType'][]) {
    const foundValueType = possibleValueTypes.find(
      (possibleValueType) => valueType === possibleValueType
    );
    if (!foundValueType) {
      return false;
    }
    return true;
  }

  function isOfSuccessMode(
    possibleSuccessModes: IOutcomeConfig['successMode'][]
  ) {
    const foundSuccessMode = possibleSuccessModes.find(
      (possibleSuccessMode) => successMode === possibleSuccessMode
    );
    if (!foundSuccessMode) {
      return false;
    }
    return true;
  }

  function isOfComparisonType(
    comparisonIndex: number,
    possibleComparisonTypes: IComparisonObject['comparisonType'][]
  ) {
    const foundComparisonType = possibleComparisonTypes.find(
      (possibleComparisonType) =>
        fieldRef?.['outcomeConfig']?.['comparisons']?.[comparisonIndex]?.[
          'comparisonType'
        ] === possibleComparisonType
    );
    if (!foundComparisonType) {
      return false;
    }
    return true;
  }

  function isOfShowQuestion(
    possibleShowQuestions: IFieldObject['showQuestion'][]
  ) {
    const foundShowQuestion = possibleShowQuestions.find(
      (possibleShowQuestion) => showQuestion === possibleShowQuestion
    );
    if (!foundShowQuestion) {
      return false;
    }
    return true;
  }

  /* FIXME - Depreacted concept
  function isOfBehavior(possibleBehaviors: IWorkflowConfig['behavior'][]) {
    const foundBehavior = possibleBehaviors.find(
      (possibleBehavior) => behavior === possibleBehavior
    );
    if (!foundBehavior) {
      return false;
    }
    return true;
  }
  */

  return {
    isOfType,
    isOfComparisonType,
    isOfShowQuestion,
    isOfSuccessMode,
    isOfValueType,
  };
}
