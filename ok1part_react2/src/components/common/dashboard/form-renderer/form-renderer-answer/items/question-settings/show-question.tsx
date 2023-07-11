import { ReactElement } from 'react';
import DetailItem, { IDetailItemProps } from '../../detail-item';
import { IDetailItemComponentProps } from '../interfaces';
import getSettingValueLabel from '@/components/common/dashboard/utils/get-setting-value-label';

export default function ShowQuestion({
  fieldsArray,
  index,
}: IDetailItemComponentProps): ReactElement<IDetailItemProps> | null {
  let value = fieldsArray[index]?.showQuestion || 'always';

  return (
    <DetailItem
      title='Show Question'
      value={getSettingValueLabel('show-question', value)}
    />
  );
}
