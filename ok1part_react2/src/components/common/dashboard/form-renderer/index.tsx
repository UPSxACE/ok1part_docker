import { Dispatch, SetStateAction } from 'react';
import FormRendererAnswer from './form-renderer-answer';
import FormRendererEdit from './form-renderer-edit';
import { FormInstance, FormatedData, ValidationType } from './use-init-form';
import { IFormHeaderBaseProps } from '@/components/common/dashboard/TForm/header';
import { ApprovalStateDataInstance } from '@/components/manage-forms/edit/sidebar/approval-state/use-approval-state-data';

export type FormModes = 'edit' | 'answer' | 'view'; // | 'validate'

// ANCHOR - possible types of questions
export type FieldType =
  | 'short-answer'
  | 'long-answer'
  | 'radio'
  | 'radio-color'
  | 'radio-image'
  | 'range'
  | 'multiple-checkbox'
  | 'grid-radio'
  | 'grid-checkbox'
  | 'date'
  | 'datetime' // | 'checkbox';
  | 'toggle-label'
  | 'select'
  | 'slider'
  | 'slider-label'
  | 'scale'
  | 'grid-toggle'
  | 'grid-advanced';

export type SubFieldType =
  | 'radio'
  | 'multiple-checkbox'
  | 'toggle-label'
  | 'select'
  | 'short-answer';

export interface IFieldOption {
  id: string; // FIXME - Change to id
  label: string; // | JSX.Element //FIXME - Check if this doesn't cause errors (probably not)
}

/* FIXME - Deprecated concept

export interface IDependencyComparisonObject {
  type: 'valueSuperior';
  value: any;
}

*/

export interface IDependencyComparisonObject {
  type: //depsComparisonType?:
  | 'exact'
    | 'minValue'
    | 'minValueEq'
    | 'maxValue'
    | 'maxValueEq'
    | 'percentMarginErrorInferior'
    | 'percentMarginErrorInferiorEq'
    | 'percentMarginErrorSuperior'
    | 'percentMarginErrorSuperiorEq'
    | 'toggleValue'
    | 'isChecked'
    | 'selectedOption';
  secondaryValue?: string | number;
  comparisonValue?: string | number;
}
export interface IDependencyObject {
  typeOfCondition: 'parent-success' | 'parent-fail' | 'parent-compare';
  questionIndex?: number;
  comparison?: IDependencyComparisonObject;
}

export interface ISubFieldConfig {
  // REVIEW - needs more testing
  options?: IFieldOption[];
  type?: string; // FIXME - is this really needed? Probably not
}

export interface ISubFieldObject {
  // REVIEW - needs more testing
  id: string;
  label?: string;
  type: SubFieldType;
  rules?: ValidationType[];
  fieldConfig?: ISubFieldConfig;
}

export interface ISimpleRowObject {
  id: string;
  label: string;
}

export interface ISimpleColumnObject {
  id: string;
  label: string;
}
export interface IFieldConfig {
  options?: IFieldOption[];
  scaleStart?: number;
  scaleEnd?: number;
  rows?: ISimpleRowObject[] | ISubFieldObject[];
  columns?: ISimpleColumnObject[];
  labelStart?: string;
  labelEnd?: string;
  showLabel?: boolean;
  mode?: string;
  valueType?: 'text' | 'integer' | 'decimal';
}

export interface IFieldObject {
  //active?: boolean; // FIXME - Deprecated concept ... FIXME - implement active check on formrenderer
  showQuestion?: 'always' | 'conditions-met' | 'disabled';
  id_: string;
  label: string;
  type: FieldType;
  registerRef?: string; //ex: "name.firstName" or "cars.honda.0" // FIXME - Deprecated concept
  required?: boolean;
  rules?: ValidationType[];
  //defaultValue: string | number | boolean;
  fieldConfig?: IFieldConfig;
  outcomeConfig?: IOutcomeConfig;
  workflowConfig?: IWorkflowConfig;
  deps?: IDependencyObject[];
}

export interface IComparisonObject {
  comparisonType:
    | 'exact'
    | 'minValue'
    | 'minValueEq'
    | 'maxValue'
    | 'maxValueEq'
    | 'percentMarginErrorInferior'
    | 'percentMarginErrorInferiorEq'
    | 'percentMarginErrorSuperior'
    | 'percentMarginErrorSuperiorEq'
    | 'toggleValue'
    | 'isChecked'
    | 'selectedOption';
  comparisonConfig?: {
    secondaryValue?: string | number;
    comparisonValue?: string | number;
  };
}

export interface IOutcomeConfig {
  successMode?: 'always' | 'comparison';
  endOnFail?: boolean;
  comparisons?: IComparisonObject[];
}

export interface IWorkflowConfig {
  reason?: string | false;
  // behavior?: 'continuous' | 'blocking' | 'conditional'; FIXME - Deprecated concept
}

export type FieldsArray = IFieldObject[];

export interface IFieldsRenderProps {
  mode: 'answer' | 'force-preview' | 'force-preview-details';
  fieldsArray: FieldsArray;
  defaultValues?: { [key: string]: any } | Promise<any>;
  header: IFormHeaderBaseProps | null;
  formInstance: FormInstance;
  onSubmit?: (formInstance: FormInstance, formatedData: FormatedData) => any;
}

export interface IFieldsRenderEditModeProps {
  mode: 'edit';
  fieldsArray: FieldsArray;
  defaultValues?: { [key: string]: any } | Promise<any>;
  setFieldsArray: Dispatch<SetStateAction<FieldsArray>>;
  setDefaultValues: Dispatch<SetStateAction<any>>;
  header: IFormHeaderBaseProps | null;
  setHeader: Dispatch<SetStateAction<IFormHeaderBaseProps | null>>;
  formInstance: FormInstance;
  approvalData: ApprovalStateDataInstance;
}

export default function FormRenderer(
  props: IFieldsRenderProps | IFieldsRenderEditModeProps
) {
  const { mode, fieldsArray, defaultValues, header, formInstance } = props;
  if (
    mode === 'answer' ||
    mode === 'force-preview' ||
    mode === 'force-preview-details'
  ) {
    return (
      <FormRendererAnswer
        fieldsArray={fieldsArray}
        defaultValues={defaultValues}
        header={header}
        stepByStep={mode === 'answer'}
        formInstance={formInstance}
        forcePreview={
          mode === 'force-preview' || mode === 'force-preview-details'
        }
        previewDetails={mode === 'force-preview-details'}
        onSubmit={props.onSubmit}
      />
    );
  }

  if (mode === 'edit') {
    const { setFieldsArray, setDefaultValues, header, setHeader } = props;
    return (
      <FormRendererEdit
        fieldsArray={fieldsArray}
        defaultValues={defaultValues}
        setFieldsArray={setFieldsArray}
        setDefaultValues={setDefaultValues}
        header={header}
        setHeader={setHeader}
        formInstance={formInstance}
        approvalData={props.approvalData}
      />
    );
  }

  return <></>;
}
