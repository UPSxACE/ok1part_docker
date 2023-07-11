import { Dispatch, SetStateAction, useState } from 'react';
import { FieldsArray, IFieldConfig } from '.';

export type FieldName = string;

export interface IInitFormConfig {
  fieldsArray: FieldsArray;
  setFieldsArray?: Dispatch<SetStateAction<FieldsArray>>;
  defaultValues?: {} | Promise<any>;
}

export interface IFormData {
  [key: FieldName]: string | number | boolean | { [key: string]: any } | null;
}

export interface IFormErrors {
  [key: FieldName]: string[];
}

export interface IValidate {
  name: string;
  message: string;
}

export interface IValidateExactLength extends IValidate {
  name: 'exactLength';
  value: number;
}

export interface IValidateMinLength extends IValidate {
  name: 'minLength';
  value: number;
}

export interface IValidateMinLengthEq extends IValidate {
  name: 'minLengthEq';
  value: number;
}

export interface IValidateMaxLength extends IValidate {
  name: 'maxLength';
  value: number;
}

export interface IValidateMaxLengthEq extends IValidate {
  name: 'maxLengthEq';
  value: number;
}

export interface IValidateMinValue extends IValidate {
  name: 'minValue';
  value: number;
}

export interface IValidateMinValueEq extends IValidate {
  name: 'minValueEq';
  value: number;
}

export interface IValidateMaxValue extends IValidate {
  name: 'maxValue';
  value: number;
}

export interface IValidateMaxValueEq extends IValidate {
  name: 'maxValueEq';
  value: number;
}

export interface IValidateExactValue extends IValidate {
  name: 'exactValue';
  value: number;
}

export interface IValidateRegex extends IValidate {
  name: 'regex';
  value: string;
}

export interface IValidateOnlyNumbers extends IValidate {
  // FIXME - Deprecated concept
  name: 'onlyNumbers';
}

interface FormatedCol {
  id: String;
  value: FormatedValue;
}

interface FormatedRow {
  id: String;
  value: FormatedValue;
  cols?: FormatedCol[];
}

export interface FormatedValue {
  text?: String;
  number?: Number;
  date?: String;
  datetime?: String;
  selected_toggle?: Boolean;
  selected_slider?: String;
  checkbox_is_checked?: Boolean;
  selected_option?: String;
  selected_col?: String;
  selected_row?: String;
  multiple?: String[];
  rows?: FormatedRow[];
}

export interface FormatedQuestion {
  id: String;
  typeOfQuestion: String;
  value: FormatedValue;
}

function formatDate(date: String) {
  return date
    .replaceAll('-', '')
    .replaceAll('T', '')
    .replaceAll(':', '')
    .substring(0, 13);
}

function transformValue(
  valueObjectToPopulate: any,
  typeOfQuestion: String,
  value: any,
  fieldsArray: FieldsArray,
  currentFieldRows: any[],
  fieldConfig?: IFieldConfig // | Subfieldconfig ?
) {
  switch (typeOfQuestion) {
    case 'date':
      valueObjectToPopulate.date = formatDate(value as string);
      break;
    case 'datetime':
      valueObjectToPopulate.datetime = formatDate(value as string);
      break;
    case 'long-answer':
      if (
        fieldConfig?.valueType === 'integer' ||
        fieldConfig?.valueType === 'decimal'
      ) {
        valueObjectToPopulate.number = Number(value);
        break;
      }
      valueObjectToPopulate.text = String(value);
      break;
    case 'short-answer':
      if (
        fieldConfig?.valueType === 'integer' ||
        fieldConfig?.valueType === 'decimal'
      ) {
        valueObjectToPopulate.number = Number(value);
        break;
      }
      valueObjectToPopulate.text = String(value);
      break;
    case 'radio':
      valueObjectToPopulate.selected_option = String(value);
      break;
    case 'select':
      valueObjectToPopulate.selected_option = String(value);
      break;
    case 'radio-color':
      valueObjectToPopulate.selected_option = String(value);
      break;
    case 'radio-image':
      valueObjectToPopulate.selected_option = String(value);
      break;
    case 'range':
      valueObjectToPopulate.number = Number(value);
      break;
    case 'scale':
      valueObjectToPopulate.selected_option = String(value);
      break;
    case 'slider':
      valueObjectToPopulate.number = Number(value);
      break;
    case 'slider-label':
      valueObjectToPopulate.number = Number(value);
      break;
    case 'toggle-label':
      valueObjectToPopulate.selected_toggle = Boolean(value);
      break;
    case 'multiple-checkbox':
      valueObjectToPopulate.multiple = [];
      for (const [option_id, option_value] of Object.entries(value) as any[]) {
        if (option_value === true)
          valueObjectToPopulate.multiple.push(option_id);
      }
      break;
    case 'grid-radio':
      valueObjectToPopulate.rows = [];

      for (const [row_id, rowObjectWithCols] of Object.entries(
        value
      ) as any[]) {
        const rowObject: any = { id: row_id, cols: [] };

        for (const [col_id, col_value] of Object.entries(rowObjectWithCols)) {
          const col = { id: col_id, value: { selected_col: col_value } };
          rowObject.cols.push(col);
        }

        valueObjectToPopulate.rows.push(rowObject as any);
      }

      break;
    case 'grid-toggle':
      valueObjectToPopulate.rows = [];

      for (const [row_id, rowObjectWithCols] of Object.entries(
        value
      ) as any[]) {
        const rowObject: any = { id: row_id, cols: [] };

        for (const [col_id, col_value] of Object.entries(rowObjectWithCols)) {
          const col = { id: col_id, value: { selected_toggle: true } };
          if (col_value === true) rowObject.cols.push(col);
        }

        valueObjectToPopulate.rows.push(rowObject as any);
      }

      break;
    case 'grid-checkbox':
      valueObjectToPopulate.rows = [];

      for (const [row_id, rowObjectWithCols] of Object.entries(
        value
      ) as any[]) {
        const rowObject: any = { id: row_id, cols: [] };

        for (const [col_id, col_value] of Object.entries(rowObjectWithCols)) {
          const col = { id: col_id, value: { checkbox_is_checked: true } };
          if (col_value === true) rowObject.cols.push(col);
        }

        valueObjectToPopulate.rows.push(rowObject as any);
      }

      break;
    case 'grid-advanced':
      valueObjectToPopulate.rows = [];
      for (const [row_id, rowObjectWithCols] of Object.entries(
        value
      ) as any[]) {
        const currentRow = (currentFieldRows || []).find(
          (row) => row.id === row_id
        );

        const typeOfSubQuestion = currentRow?.type;
        // Debug: console.log(typeOfSubQuestion);

        const rowObject: any = {
          id: row_id,
          type: typeOfSubQuestion,
          cols: [],
        };

        if (typeOfSubQuestion === 'radio') {
          // NOTE: In this case, rowObjectWithCols is actually a string with the selected col ID
          const col = {
            id: rowObjectWithCols,
            value: { grid_is_checked: true },
          };
          rowObject.cols.push(col);
          valueObjectToPopulate.rows.push(rowObject as any);
          continue;
        }

        if (typeOfSubQuestion === 'multiple-checkbox') {
          for (const [col_id, col_value] of Object.entries(rowObjectWithCols)) {
            const col = { id: col_id, value: { checkbox_is_checked: true } };

            if (col_value === true) {
              rowObject.cols.push(col);
            }
          }
          valueObjectToPopulate.rows.push(rowObject as any);
          continue;
        }

        if (typeOfSubQuestion === 'toggle-label') {
          for (const [col_id, col_value] of Object.entries(rowObjectWithCols)) {
            const col = { id: col_id, value: { checkbox_is_checked: true } };

            if (col_value === true) {
              rowObject.cols.push(col);
            }
          }
          valueObjectToPopulate.rows.push(rowObject as any);
          continue;
        }

        for (const [col_id, col_value] of Object.entries(rowObjectWithCols)) {
          const col = { id: col_id, value: {} };

          //value: col_value
          transformValue(
            col.value,
            typeOfSubQuestion,
            col_value,
            fieldsArray,
            currentFieldRows
            //Subfield config?
          );
          rowObject.cols.push(col);
        }
        valueObjectToPopulate.rows.push(rowObject as any);
      }
      break;
  }
}

export type FormatedData = ReturnType<typeof formatData>;

function formatData(fieldsArray: FieldsArray, formData: IFormData) {
  const formatedFields = fieldsArray
    .map((field, index) => {
      if (formData[field.id_] !== undefined && formData[field.id_] !== null) {
        const obj: FormatedQuestion = {
          id: field.id_,
          typeOfQuestion: field.type,
          value: {},
        };

        try {
          transformValue(
            obj.value,
            field.type,
            formData[field.id_],
            fieldsArray,
            (fieldsArray[index] as any)?.fieldConfig?.rows,
            field.fieldConfig
          );
        } catch (err) {
          console.log('ERROR TRANSFORMING VALUE');
          console.log(err);
          return null;
        }

        return obj;
      }
      return null;
    })
    .filter((field) => field !== null);

  return formatedFields;
}

/* ANCHOR - Validation Types
To add validation types, create an interface, and then add it as a possibility to the ValidationType declaration
(for example, after creating the INewValidationType interface, add " | INewValidationType")

Also, don't forget to implement the actual validation in the 'validate' function (anchor below)
*/

export type ValidationType =
  | IValidateExactLength
  | IValidateMinLength
  | IValidateMinLengthEq
  | IValidateMaxLength
  | IValidateMaxLengthEq
  | IValidateMinValue
  | IValidateMinValueEq
  | IValidateMaxValueEq
  | IValidateMaxValue
  | IValidateExactValue // FIXME - Does it make sense here?
  | IValidateRegex;
//   | IValidateOnlyNumbers // FIXME - Deprecated, now that responsability is given to the "valueType" key in IFieldObject.fieldConfig
export interface IValidation {
  [key: FieldName]: ValidationType[];
}

export type FormInstance = ReturnType<typeof useInitForm>;

export default function useInitForm({
  fieldsArray,
  setFieldsArray,
  defaultValues, //FIXME - Missing defaultValues implementation?
}: IInitFormConfig) {
  // : IFormInstance
  // TODO - Add code to validate AFTER submit
  const [formData, setFormData] = useState<IFormData>({});
  const [errors, setErrors] = useState<IFormErrors>({});
  const [validation, setValidation] = useState<IValidation>(
    initializeValidation()
  );
  const [currentQuestion, setQuestion] = useState<number>(0);
  const [blocked, setBlocked] = useState(false); // FIXME - Finish the implementation of this state: it will be used
  // to block the form when "endOnFail" is on true

  function isValid() {
    let hasErrors = false;
    Object.values(errors).forEach((errorArray) => {
      if (errorArray && errorArray.length > 0) hasErrors = true;
    });
    return !hasErrors;
  }

  function nextQuestion(question_number: number | null = null) {
    if (question_number !== null) {
      setQuestion(question_number);
    } else {
      setQuestion((q) => q + 1);
    }
  }
  function previousQuestion() {
    setQuestion((q) => q - 1);
  }

  function initializeValidation() {
    let validation_obj: IValidation = {};

    fieldsArray.forEach((field) => {
      if (field.rules) validation_obj[field.id_] = field.rules;
    });

    return validation_obj;
  }

  function refreshValidation() {
    let validation_obj: IValidation = {};

    fieldsArray.forEach((field) => {
      if (field.rules) validation_obj[field.id_] = field.rules;
    });

    setValidation(validation_obj);
  }

  function addError(fieldName: FieldName, error_message: string) {
    console.log('ADD ERROR');
    setErrors((c_errors) => {
      const current_errors = c_errors[fieldName] || [];
      return Object.assign({}, c_errors, {
        [fieldName]: [...current_errors, error_message],
      });
    });
  }

  type updateFieldType = typeof updateField;

  function updateField(
    fieldName: FieldName,
    valueOrCallback: any | Function,
    errors: any = []
  ) {
    setErrors((c_errors) =>
      Object.assign({}, c_errors, { [fieldName]: errors })
    );
    if (typeof valueOrCallback === 'function') {
      setFormData((c_data) => {
        const current_value = c_data[fieldName];
        const new_data = valueOrCallback(current_value);
        return Object.assign({}, c_data, { [fieldName]: new_data });
      });
    } else {
      setFormData((c_data) =>
        Object.assign({}, c_data, { [fieldName]: valueOrCallback })
      );
    }
  }

  function isArray(value: unknown) {
    if (Object.prototype.toString.call(value) === '[object Array]') {
      return true;
    }
    return false;
  }

  function validate(validation: ValidationType, fieldValue: unknown) {
    // ANCHOR - Validate function
    // NOTE - In case a validation type doesn't fit the value given, it must return TRUE(valid) as result.
    // TODO - Add required verification
    // TODO - Add empty form verification
    switch (validation.name) {
      case 'minLength': {
        if (
          (typeof fieldValue === 'string' || isArray(fieldValue)) &&
          ((fieldValue as string | any[]).length < Number(validation.value) ||
            (fieldValue as string | any[]).length === Number(validation.value))
        ) {
          return false;
        }
        return true;
      }
      case 'exactLength': {
        if (
          (typeof fieldValue === 'string' || isArray(fieldValue)) &&
          (fieldValue as string | any[]).length !== Number(validation.value)
        ) {
          return false;
        }
        return true;
      }
      case 'maxLength': {
        if (
          (typeof fieldValue === 'string' || isArray(fieldValue)) &&
          ((fieldValue as string | any[]).length > Number(validation.value) ||
            (fieldValue as string | any[]).length === Number(validation.value))
        ) {
          return false;
        }
        return true;
      }
      case 'maxLengthEq': {
        if (
          (typeof fieldValue === 'string' || isArray(fieldValue)) &&
          (fieldValue as string | any[]).length > Number(validation.value)
        ) {
          return false;
        }
        return true;
      }
      case 'minLengthEq': {
        if (
          (typeof fieldValue === 'string' || isArray(fieldValue)) &&
          (fieldValue as string | any[]).length < Number(validation.value)
        ) {
          return false;
        }
        return true;
      }
      case 'exactValue': {
        if (
          (typeof fieldValue === 'string' || typeof fieldValue === 'number') &&
          String(fieldValue) !== String(validation.value)
        ) {
          return false;
        }
        return true;
      }
      case 'maxValue': {
        if (
          (typeof fieldValue === 'string' || typeof fieldValue === 'number') &&
          (Number(fieldValue) > Number(validation.value) ||
            Number(fieldValue) === Number(validation.value))
        ) {
          return false;
        }
        return true;
      }
      case 'minValue': {
        if (
          (typeof fieldValue === 'string' || typeof fieldValue === 'number') &&
          (Number(fieldValue) < Number(validation.value) ||
            Number(fieldValue) === Number(validation.value))
        ) {
          return false;
        }
        return true;
      }
      case 'maxValueEq': {
        if (
          (typeof fieldValue === 'string' || typeof fieldValue === 'number') &&
          Number(fieldValue) > Number(validation.value)
        ) {
          return false;
        }
        return true;
      }
      case 'minValueEq': {
        if (
          (typeof fieldValue === 'string' || typeof fieldValue === 'number') &&
          Number(fieldValue) < Number(validation.value)
        ) {
          return false;
        }
        return true;
      }
      case 'regex': {
        const regexp = new RegExp(validation.value);
        if (
          (typeof fieldValue === 'string' || typeof fieldValue === 'number') &&
          !regexp.test(String(fieldValue))
        ) {
          return false;
        }
        return true;
      }
      default:
        return true;
    }
  }

  function generateFieldProps(
    fieldName: FieldName,
    regexp: RegExp | false,
    forcePreviewMode: boolean = false,
    type?: string,
    custom?: {
      beforeUpdate?: (updateField: updateFieldType) => void;
      getValueOnChange?: (
        value: React.ChangeEvent<HTMLInputElement>['target']['value']
      ) => void;
    }
  ) {
    //Debug: console.log(fieldName, forcePreviewMode);
    return {
      value: forcePreviewMode ? '' : formData[fieldName] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        if (forcePreviewMode) return;
        const newValue = e.target.value;
        if (custom?.getValueOnChange) custom?.getValueOnChange(newValue);
        if (!regexp || regexp.test(newValue)) {
          let newErrors: string[] = [];

          switch (type) {
            case 'text':
              break;
            case 'integer':
              if (!/^[0-9]*$/.test(newValue)) {
                newErrors.push('The value for this field must be an integer.');
              }
              break;
            case 'decimal':
              if (!/^\d*\.?\d+$/.test(newValue)) {
                newErrors.push('The value for this field must be a number.');
              }
              break;
            default:
              break;
          }

          if (validation[fieldName]) {
            validation[fieldName].forEach((validation) => {
              if (!validate(validation, newValue)) {
                // Debug: console.log('failed', validation.name);
                newErrors.push(validation.message);
              }
            });
          }
          if (custom?.beforeUpdate) custom?.beforeUpdate(updateField);
          updateField(fieldName, newValue, newErrors);
        }
      },
    };
  }

  function generateTextHelperProps(fieldName: FieldName) {
    return { error: errors[fieldName] ? true : false };
  }

  function updateLabel(fieldName: FieldName, newLabel: string) {
    if (!setFieldsArray) {
      throw new Error(
        'You must pass the setFieldsArray in the useInitForm hook call if you want to use the form in Edit mode.'
      );
    } else {
      setFieldsArray((c_fields) => {
        const el = fieldsArray.find((field) => field.id_ === fieldName);

        const index = el && fieldsArray.indexOf(el);

        if (typeof index === 'number' && index >= 0) {
          const newArray: FieldsArray = Object.assign([], fieldsArray);

          newArray[index]['label'] = newLabel;

          return newArray;
        }

        return c_fields;
      });
    }
  }

  // Debug: console.log(formData, errors, validation);

  function resetForm() {
    if (!formData) {
      return null;
    }
    setFormData({});
    setErrors({});
    setValidation(initializeValidation());
    setQuestion(0);
    setBlocked(false);
  }

  return {
    formData,
    errors,
    addError,
    validation,
    isValid,
    generateFieldProps,
    generateTextHelperProps,
    onSubmit: () => {
      // Debug: console.log(formData);
      // Debug: console.log('Formated Data', formatData(fieldsArray, formData));

      /*Debug:
      console.log(
        'FormData: ',
        formData,
        'Errors: ',
        errors,
        'Validation: ',
        validation
      );
      */

      return formatData(fieldsArray, formData);
    },
    updateLabel,
    currentQuestion,
    nextQuestion,
    previousQuestion,
    updateField,
    refreshValidation,
    resetForm,
  };
}
