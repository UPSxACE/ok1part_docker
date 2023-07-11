import React from 'react';
import DetailItem from '../../detail-item';
import { IDetailItemComponentProps } from '../interfaces';
import getConditionLabels from '@/components/common/dashboard/utils/get-condition-labels';
import getReasonLabel from '@/components/common/dashboard/utils/get-reason-label';

export default function ConditionsItems({
  fieldsArray,
  index,
}: IDetailItemComponentProps) {
  let reason = fieldsArray[index]?.workflowConfig?.reason || 'any';
  let conditions = fieldsArray[index]?.deps || [];

  return (
    <React.Fragment>
      {reason !== 'any' ? (
        <DetailItem
          title='Show When Reason Is'
          value={getReasonLabel(reason)}
        />
      ) : null}

      {conditions.map((condition, index_) => {
        const [title, value] = getConditionLabels(
          condition,
          fieldsArray,
          index
        );

        return <DetailItem key={index_} title={title} value={value} />;
      })}
    </React.Fragment>
  );
}
