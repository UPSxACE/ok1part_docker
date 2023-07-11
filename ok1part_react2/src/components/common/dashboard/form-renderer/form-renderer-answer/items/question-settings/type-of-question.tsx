import { ReactElement } from 'react';
import DetailItem, { IDetailItemProps } from '../../detail-item';
import { IDetailItemComponentProps } from '../interfaces';
import getSettingValueLabel from '@/components/common/dashboard/utils/get-setting-value-label';

export default function TypeOfQuestion({
  fieldsArray,
  index,
}: IDetailItemComponentProps): ReactElement<IDetailItemProps> | null {
  const value = fieldsArray[index].type;

  return (
    <DetailItem
      title='Type of Question'
      value={getSettingValueLabel('type-of-question', value)}
    />
  );
}
