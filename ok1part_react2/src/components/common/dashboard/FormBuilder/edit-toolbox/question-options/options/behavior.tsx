// FIXME - Deprecated concept
// import {
//   FormControl,
//   ListItemText,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
// } from '@mui/material';
// import { IEditToolboxProps } from '../..';
// import QuestionOptionWrapper from '../question-option-wrapper';
// import { IFieldObject } from '@/components/common/dashboard/form-renderer';

// export default function Behavior({
//   children,
//   id,
//   focusedElement,
//   setFocusedElement,
//   actions,
//   renderQuestionOptions = true,
//   fieldsArray,
//   setFieldsArray,
// }: IEditToolboxProps) {
//   const handleChange = (event: SelectChangeEvent) => {
//     const value = event.target.value as
//       | 'continuous'
//       | 'blocking'
//       | 'conditional';

//     setFieldsArray((currentState) => {
//       const newFieldsArray = currentState.map((field, index) => {
//         if (index !== id - 1) {
//           return field;
//         }

//         const newField: IFieldObject = {
//           ...field,
//           workflowConfig: { ...field.workflowConfig, behavior: value },
//         };

//         return newField;
//       });
//       return newFieldsArray;
//     });
//   };

//   const current = fieldsArray[id - 1]?.['workflowConfig']?.['behavior'];
//   return (
//     <QuestionOptionWrapper>
//       <ListItemText>Behavior</ListItemText>
//       <FormControl>
//         <Select
//           sx={{ width: 150, height: 40 }}
//           id='behavior'
//           labelId='behavior-label'
//           value={current ? current : 'continuous'}
//           onChange={handleChange}
//         >
//           <MenuItem value='continuous'>Continuous</MenuItem>
//           <MenuItem value='blocking'>Blocking</MenuItem>
//           <MenuItem value='conditional'>Conditional</MenuItem>
//           {/*<MenuItem value='conditional'>Conditional</MenuItem>*/}
//         </Select>
//       </FormControl>
//     </QuestionOptionWrapper>
//   );
// }
