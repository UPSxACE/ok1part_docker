import { ReactElement } from 'react';
import DetailItem, { IDetailItemProps } from '../../detail-item';
import { IDetailItemComponentProps } from '../interfaces';
import getSettingValueLabel from '@/components/common/dashboard/utils/get-setting-value-label';

export default function TypeOfValue({
  fieldsArray,
  index,
}: IDetailItemComponentProps): ReactElement<IDetailItemProps> | null {
  const typeOfQuestion = fieldsArray[index].type;
  let value = fieldsArray[index]?.fieldConfig?.valueType;

  if (typeOfQuestion === 'short-answer' && !value) {
    value = 'text'; // default value for short-answer
  }

  if (!(typeOfQuestion === 'short-answer') || !value) {
    return null;
  }

  return (
    <DetailItem
      title='Type of Value'
      value={getSettingValueLabel('type-of-value', value)}
    />
  );
}
