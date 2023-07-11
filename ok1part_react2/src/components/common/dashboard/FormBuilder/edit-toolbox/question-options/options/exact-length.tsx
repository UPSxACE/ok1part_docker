import { FormControl, IconButton, ListItemText } from '@mui/material';
import { IEditToolboxProps } from '../..';
import QuestionOptionWrapper from '../question-option-wrapper';
import BootstrapInput from '@/components/common/dashboard/bootstrap-input';
import { Close } from '@mui/icons-material';
import { FieldsArray } from '@/components/common/dashboard/form-renderer';
import useChangeRuleFuncs from './use-change-rule-funcs';

export default function ExactLength({
  children,
  id,
  focusedElement,
  setFocusedElement,
  actions,
  renderQuestionOptions = true,
  fieldsArray,
  setFieldsArray,
  ruleIndex,
}: IEditToolboxProps & { ruleIndex: number }) {
  const { current, handleChange, deleteDependency } = useChangeRuleFuncs({
    fieldsArray,
    setFieldsArray,
    id,
    ruleIndex,
  });

  return (
    <QuestionOptionWrapper>
      <ListItemText>Exact Length</ListItemText>
      <IconButton sx={{ mr: 0.5 }} onClick={deleteDependency}>
        <Close color='error' />
      </IconButton>
      <FormControl>
        <BootstrapInput
          inputMode='numeric'
          sx={{
            width: 150,
            '& .MuiInputBase-input': {
              height: '18px',
            },
          }}
          className={'lightGreyDisable'}
          id='exact-length'
          value={current ? current : ''}
          placeholder='Insert a value'
          onChange={handleChange}
          type='numeric'
        />
      </FormControl>
    </QuestionOptionWrapper>
  );
}
