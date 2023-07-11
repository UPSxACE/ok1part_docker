import React from 'react';
import DetailItem from '../../detail-item';
import { IDetailItemComponentProps } from '../interfaces';
import getOutcomeComparisonLabels from '@/components/common/dashboard/utils/get-outcome-comparison-labels';

export default function OutcomeItems({
  fieldsArray,
  index,
}: IDetailItemComponentProps) {
  let outcomeComparisons = fieldsArray[index]?.outcomeConfig?.comparisons || [];

  return (
    <React.Fragment>
      {outcomeComparisons.map((comparison, index_) => {
        const [title, value] = getOutcomeComparisonLabels(
          comparison,
          fieldsArray,
          index
        );

        return <DetailItem key={index_} title={title} value={value} />;
      })}
    </React.Fragment>
  );
}
