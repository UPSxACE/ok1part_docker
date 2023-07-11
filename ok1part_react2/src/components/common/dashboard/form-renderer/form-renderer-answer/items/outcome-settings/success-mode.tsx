import { ReactElement } from 'react';
import DetailItem, { IDetailItemProps } from '../../detail-item';
import { IDetailItemComponentProps } from '../interfaces';
import getSettingValueLabel from '@/components/common/dashboard/utils/get-setting-value-label';

export default function SuccessMode({
  fieldsArray,
  index,
}: IDetailItemComponentProps): ReactElement<IDetailItemProps> | null {
  const value = fieldsArray[index]?.outcomeConfig?.successMode || 'always';

  if (value === 'always') {
    return null;
  }

  return (
    <DetailItem
      title={'Success Mode'}
      value={getSettingValueLabel('success-mode', value)}
    />
  );
}
