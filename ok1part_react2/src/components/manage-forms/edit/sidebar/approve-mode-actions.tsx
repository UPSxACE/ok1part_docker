import useQuery from '@/utils/use-query';
import ApprovalState from './approval-state';
import { ApprovalStateDataInstance } from './approval-state/use-approval-state-data';
import useCommentSections, {
  ICommentsState,
} from './approval-state/use-comment-sections';
import CommentBox from './comment-box';
import { useState } from 'react';

export default function ApproveModeActions({
  commentsState,
  approvalData,
  formId,
}: {
  commentsState: ReturnType<typeof useQuery>;
  approvalData: ApprovalStateDataInstance;
  formId: string;
}) {
  const {
    response: comments_response,
    isLoading: comments_isLoading,
    error: comments_error,
    mutate: comments_mutate,
  } = commentsState;
  const [textfieldValue, setTextfieldValue] = useState<string>('');

  return (
    <>
      <ApprovalState
        textfieldValue={textfieldValue}
        setTextfieldValue={setTextfieldValue}
        mode='approve'
        commentsState={commentsState}
        data={approvalData}
        formId={formId}
        // setScrollToEnd={setScrollToEnd} // FIXME - Deprecated concept
      />
      <CommentBox
        mode='approve'
        commentsState={commentsState}
        data={approvalData}
        formId={formId}
      />
    </>
  );
}
