import TForm from '@/components/common/dashboard/TForm';
import Box from '@mui/material/Box';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { FieldsArray, IFieldObject } from '..';
import EditToolbox from '../../FormBuilder/edit-toolbox';
import useGenerateActions from '../../FormBuilder/use-generate-actions';
import { FormInstance } from '../use-init-form';
import { IFormHeaderBaseProps } from '@/components/common/dashboard/TForm/header';
import { ApprovalStateDataInstance } from '@/components/manage-forms/edit/sidebar/approval-state/use-approval-state-data';

export interface IFormRendererEditProps {
  fieldsArray: FieldsArray;
  defaultValues?: { [key: string]: any } | Promise<any>; // example: async () => fetch('/api-endpoint');
  setFieldsArray: Dispatch<SetStateAction<FieldsArray>>;
  setDefaultValues: Dispatch<SetStateAction<any>>;
  header: IFormHeaderBaseProps | null;
  setHeader: Dispatch<SetStateAction<IFormHeaderBaseProps | null>>;
  formInstance: FormInstance;
  approvalData: ApprovalStateDataInstance;
}

export default function FormRendererEdit({
  fieldsArray,
  defaultValues,
  setFieldsArray,
  setDefaultValues,
  header,
  setHeader,
  formInstance,
  approvalData,
}: IFormRendererEditProps) {
  const {
    formData,
    errors,
    validation,
    generateFieldProps,
    generateTextHelperProps,
    onSubmit,
    updateLabel,
    updateField,
    resetForm,
  } = formInstance;

  const [focusedElement, setFocusedElement] = useState<number>(0);

  const { actionsFields, actionsHeaders } = useGenerateActions(
    setFieldsArray,
    setDefaultValues
  );

  const editingPermissions = useCallback(_editingPermissions, [approvalData]);

  const headerFields = useMemo(renderHeaderFields, [
    header,
    focusedElement,
    actionsHeaders,
    setHeader,
    fieldsArray,
    setFieldsArray,
    approvalData,
    editingPermissions,
    resetForm,
  ]);

  const normalFields = useMemo(renderNormalFields, [
    fieldsArray,
    errors,
    focusedElement,
    actionsFields,
    generateFieldProps,
    updateLabel,
    setFieldsArray,
    approvalData,
    editingPermissions,
    formData,
    updateField,
    formInstance,
  ]);

  function _editingPermissions() {
    return (
      (approvalData?.formStatus === 1 || approvalData?.formStatus === 2) &&
      (approvalData?.isEditor() || approvalData?.isAdmin())
    );
  }

  return (
    <TForm.Form onSubmit={onSubmit}>
      {headerFields}
      {normalFields}
      {/* FIXME - Submit button not needed here?
      <TForm.Submit sx={{ marginTop: 2 }} />
      */}
    </TForm.Form>
  );

  // Functions...
  function renderNormalFields() {
    function renderField(field: IFieldObject, index: number) {
      const isFocused = editingPermissions() && focusedElement - 1 === index;

      // ANCHOR - question renders if cases
      if (field.type === 'short-answer') {
        return (
          <TForm.ShortAnswer
            name={field.id_}
            label={field.label}
            errors={errors}
            rules={field.rules}
            mode={isFocused ? 'edit' : 'answer'}
            propsFunction={generateFieldProps}
            updateLabelFunction={updateLabel}
            disabled={!editingPermissions()}
            type={field?.fieldConfig?.valueType}
            forcePreview={true}
          />
        );
      }
      if (field.type === 'long-answer') {
        return (
          <TForm.LongAnswer
            name={field.id_}
            label={field.label}
            errors={errors}
            rules={field.rules}
            mode={isFocused ? 'edit' : 'answer'}
            propsFunction={generateFieldProps}
            updateLabelFunction={updateLabel}
            disabled={!editingPermissions()}
            forcePreview={true}
          />
        );
      }
      if (field.type === 'toggle-label') {
        return (
          <TForm.ToggleLabel
            name={field.id_}
            label={field.label}
            errors={errors}
            rules={field.rules}
            mode={isFocused ? 'edit' : 'answer'}
            updateLabelFunction={updateLabel}
            disabled={!editingPermissions()}
            type={field?.fieldConfig?.valueType}
            currentValue={
              isFocused
                ? false
                : (formData[field.id_] as boolean | undefined | null) || false
            }
            updateFieldFunc={updateField}
            forcePreview={true}
          />
        );
      }
      if (field.type === 'radio') {
        return (
          <TForm.Radio
            name={field.id_}
            label={field.label}
            errors={errors}
            rules={field.rules}
            mode={isFocused ? 'edit' : 'answer'}
            propsFunction={generateFieldProps}
            updateLabelFunction={updateLabel}
            options={field.fieldConfig?.options || []}
            setFieldsArray={setFieldsArray}
            disabled={!editingPermissions()}
            forcePreview={true}
          />
        );
      }
      if (field.type === 'select') {
        return (
          <TForm.Select
            name={field.id_}
            label={field.label}
            errors={errors}
            rules={field.rules}
            mode={isFocused ? 'edit' : 'answer'}
            propsFunction={generateFieldProps}
            updateLabelFunction={updateLabel}
            options={field.fieldConfig?.options || []}
            setFieldsArray={setFieldsArray}
            disabled={!editingPermissions()}
            forcePreview={true}
          />
        );
      }
    }

    let questionNumber = 0;
    let depNumber = 0;

    return fieldsArray.map((field, index) => {
      const isDep = Boolean(field?.deps?.length && field?.deps?.length > 0);
      if (!isDep) {
        questionNumber++;
        depNumber = 0;
      } else {
        depNumber++;
      }
      const { resetForm } = formInstance;
      return (
        <EditToolbox
          key={index}
          id={index + 1}
          focusedElement={focusedElement}
          setFocusedElement={setFocusedElement}
          actions={actionsFields}
          fieldsArray={fieldsArray}
          setFieldsArray={setFieldsArray}
          approvalData={approvalData}
          isDep={isDep}
          questionNumber={
            isDep
              ? String(questionNumber) + '.' + String(depNumber)
              : String(questionNumber)
          }
          depNumber={isDep ? depNumber : undefined}
          resetForm={resetForm}
        >
          <Box
            sx={{
              pointerEvents: focusedElement !== index + 1 ? 'none' : undefined,
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            {renderField(field, index)}
          </Box>
        </EditToolbox>
      );
    });
  }

  function renderHeaderFields() {
    const isFocused =
      editingPermissions() &&
      (approvalData.formStatus === 1 || approvalData.formStatus === 2) &&
      focusedElement === 0;

    return (
      <Box
        sx={{
          flex: 1,
          //boxShadow: '0px 2px 7px 0px rgb(149 149 149)',
        }}
      >
        <EditToolbox
          id={0}
          focusedElement={focusedElement}
          setFocusedElement={setFocusedElement}
          actions={actionsHeaders}
          renderQuestionOptions={false}
          fieldsArray={fieldsArray}
          setFieldsArray={setFieldsArray}
          approvalData={approvalData}
          resetForm={resetForm}
        >
          <TForm.Header
            form_name={header?.form_name || null}
            form_description={header?.form_description || null}
            setHeader={setHeader}
            mode={isFocused ? 'edit' : 'answer'}
          />
        </EditToolbox>
      </Box>
    );
  }
}
