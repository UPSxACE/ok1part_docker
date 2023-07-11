import { ReactElement } from 'react';
import DetailItem, { IDetailItemProps } from '../../detail-item';
import { IDetailItemComponentProps } from '../interfaces';

export default function Required({
  fieldsArray,
  index,
}: IDetailItemComponentProps): ReactElement<IDetailItemProps> | null {
  const value = fieldsArray[index].required;

  if (!value) {
    return null;
  }

  return <DetailItem title='Required' value={'Yes'} />;
}
