import { IFormHeaderBaseProps } from '../common/dashboard/TForm/header';
import FormRenderer, { FieldsArray } from '../common/dashboard/form-renderer';
import useInitForm, {
  FormInstance,
  FormatedData,
} from '../common/dashboard/form-renderer/use-init-form';

interface FormsAnswerContentProps {
  header: IFormHeaderBaseProps;
  fields: FieldsArray;
  defaultValues: { [key: string]: any };
  onSubmit?: (formInstance: FormInstance, formatedData: FormatedData) => any;
}

export default function FormsAnswerContent({
  header,
  fields,
  defaultValues,
  onSubmit,
}: FormsAnswerContentProps) {
  const formInstance: FormInstance = useInitForm({
    fieldsArray: fields,
    defaultValues: defaultValues,
  });

  return (
    <FormRenderer
      mode='answer'
      fieldsArray={fields}
      defaultValues={defaultValues}
      header={header}
      formInstance={formInstance}
      onSubmit={onSubmit}
    />
  );
}
