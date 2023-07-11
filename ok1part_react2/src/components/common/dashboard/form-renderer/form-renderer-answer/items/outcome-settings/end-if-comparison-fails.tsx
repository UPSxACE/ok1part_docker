import { ReactElement } from 'react';
import DetailItem, { IDetailItemProps } from '../../detail-item';
import { IDetailItemComponentProps } from '../interfaces';

export default function EndIfComparisonFails({
  fieldsArray,
  index,
}: IDetailItemComponentProps): ReactElement<IDetailItemProps> | null {
  const value = fieldsArray[index]?.outcomeConfig?.endOnFail;

  if (value === true) {
    return <DetailItem title={'End Form If Comparison Fails'} value={'Yes'} />;
  }

  return null;
}
