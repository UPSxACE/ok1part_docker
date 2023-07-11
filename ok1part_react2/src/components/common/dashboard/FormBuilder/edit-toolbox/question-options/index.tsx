import { Box, List } from '@mui/material';
import { IEditToolboxProps } from '..';
import TypeOfQuestion from './options/type-of-question';
import Required from './options/required';
import TypeOfValue from './options/type-of-value';
// import Behavior from './options/behavior'; // FIXME - Deprecated concept (delete component later)
import ShowQuestion from './options/show-question';
import useRules from './function-hooks/use-rules';
import useOutcome from './function-hooks/use-outcome';
import useIsOf from './function-hooks/use-is-of';
import DependencyGroup from './question-group-wrappers/dependency-group';
import ValidationGroup from './question-group-wrappers/validation-group';
import OutcomeGroup from './question-group-wrappers/outcome-group';

export default function QuestionOptions(props: IEditToolboxProps) {
  const {
    children,
    id,
    focusedElement,
    setFocusedElement,
    actions,
    renderQuestionOptions = true,
    fieldsArray,
    setFieldsArray,
    resetForm,
  } = props;

  const fieldRef = fieldsArray[id - 1];

  const {
    isOfType,
    isOfComparisonType,
    isOfShowQuestion,
    isOfSuccessMode,
    isOfValueType,
  } = useIsOf(fieldRef);

  const { optionAvailable, validationSettingsOptions } = useRules({
    fieldRef,
    isOfType,
    isOfValueType,
  });

  const { conditionsAvailable, conditionSettingAvailable } = useOutcome({
    fieldRef,
    isOfType,
    isOfValueType,
  });

  return (
    <List sx={{ paddingBottom: 0, paddingTop: 0 }}>
      {/* ANCHOR - interface to configure the questions */}
      <Box sx={{ borderTop: '1px solid #e0e2e4', marginX: -3 }} />
      <TypeOfQuestion {...props} />
      <Required {...props} />
      {isOfType(['short-answer']) && <TypeOfValue {...props} />}
      <ShowQuestion {...props} />
      <DependencyGroup qoProps={props} isOfShowQuestion={isOfShowQuestion} />
      <ValidationGroup
        qoProps={props}
        optionAvailable={optionAvailable}
        validationSettingsOptions={validationSettingsOptions}
      />
      <OutcomeGroup
        conditionSettingAvailable={conditionSettingAvailable}
        conditionsAvailable={conditionsAvailable}
        isOfComparisonType={isOfComparisonType}
        isOfSuccessMode={isOfSuccessMode}
        qoProps={props}
      />
    </List>
  );
}
