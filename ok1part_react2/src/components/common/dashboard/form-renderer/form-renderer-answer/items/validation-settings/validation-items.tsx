import React from 'react';
import DetailItem from '../../detail-item';
import { IDetailItemComponentProps } from '../interfaces';
import getConditionLabels from '@/components/common/dashboard/utils/get-condition-labels';
import getReasonLabel from '@/components/common/dashboard/utils/get-reason-label';
import getValidationLabels from '@/components/common/dashboard/utils/get-validation-labels';

export default function ValidationItems({
  fieldsArray,
  index,
}: IDetailItemComponentProps) {
  let validations = fieldsArray[index]?.rules || [];

  return (
    <React.Fragment>
      {validations.map((validation, index) => {
        const [title, value] = getValidationLabels(validation);

        return <DetailItem key={index} title={title} value={value} />;
      })}
    </React.Fragment>
  );
}
