import ButtonDashboard from '@/components/common/dashboard/button-dashboard';
import { Box, TextField } from '@mui/material';
import FadeBox from './fade-box';
import { useContext, useState } from 'react';
import { Check, Close } from '@mui/icons-material';

import CommentGroup from './comment-group';
import { IAprovalStateProps } from './approval-state';
import generateRandomHash from '@/utils/generate-random-hash';
import useQuery from '@/utils/use-query';
import { AuthenticationContext } from '@/contexts/authentication-context';
import api, { ApiFormComments, ICommentSectionObj, instance } from '@/api';

export interface ICommentBoxProps {
  mode: IAprovalStateProps['mode'];
  commentsState: ReturnType<typeof useQuery>;
  data: IAprovalStateProps['data'];
  formId: string;
}

export default function CommentBox(props: ICommentBoxProps) {
  const { mode, commentsState, data } = props;
  const {
    response: comments_response,
    isLoading: comments_isLoading,
    error: comments_error,
    mutate: comments_mutate,
  } = commentsState;

  const auth = useContext(AuthenticationContext);

  function userParticipatesInSection(section: ICommentSectionObj) {
    if (data === null || auth === null) return false;
    if (data?.formEditor === auth?.value?.username) return true;
    if (section.username === auth?.value?.username) return true;
    return false;
  }

  const comments_data_parse = comments_response?.data
    ? (comments_response?.data as ApiFormComments) // NOTE: Apparently either axios or spring automatically parses the string to JSON
    : null;

  const comments_data = comments_data_parse || null || [];

  return (
    <Box>
      {comments_data.map((section, index) => {
        return (
          <FadeBox
            style={{
              borderRadius: 4,
              border: '1px solid #e0e0e0',
              overflow: 'hidden',
              marginTop: 16,
            }}
            key={section.id}
            slower
          >
            <Box
              sx={{
                backgroundColor: 'white',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  mx: -2,
                  px: 2,
                }}
              >
                <Box
                  sx={{
                    border: '1px solid #0000003b',
                    borderRadius: 1,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CommentGroup
                    data={data}
                    commentsState={commentsState}
                    id={index}
                  />
                </Box>

                {userParticipatesInSection(section) && (
                  <ReplyBox section={section} index={index} {...props} />
                )}
              </Box>
            </Box>
          </FadeBox>
        );
      })}
    </Box>
  );
}

function ReplyBox(
  props: ICommentBoxProps & { section: ICommentSectionObj; index: number }
) {
  const [textfieldValue, setTextfieldValue] = useState('');

  const { section, index, mode, commentsState, data } = props;
  const {
    response: comments_response,
    isLoading: comments_isLoading,
    error: comments_error,
    mutate: comments_mutate,
  } = commentsState;

  const comments_data_parse = comments_response?.data
    ? (comments_response?.data as ApiFormComments) // NOTE: Apparently either axios or spring automatically parses the string to JSON
    : null;

  const comments_data = comments_data_parse || null || [];

  const auth = useContext(AuthenticationContext);

  function isOnApprovalCycle() {
    if (!auth || !data?.approvalStatus) {
      return false;
    }
    const indexOnApprovalCycle = data?.approvalStatus?.findIndex(
      (user) => user.username === auth?.value?.username
    );
    if (indexOnApprovalCycle === -1) return false;
    return true;
  }

  function addRejectionSubComment(sectionId: number) {
    const value = textfieldValue.trimStart() || '';
    if (value) {
      comments_mutate().then(() => {
        if (comments_data) {
          const newCommentsData: ApiFormComments = Object.assign(
            [],
            comments_data
          );

          newCommentsData[sectionId].status = 2;

          newCommentsData[sectionId].comments.push({
            id: generateRandomHash('message_by_' + auth?.value?.username, 8),
            username: auth?.value?.username || '',
            date: new Date(),
            status: 2,
            message: value,
          });
          instance
            .patch(api.patchFormComments(props.formId), {
              comments: JSON.stringify(newCommentsData),
            })
            .then((res) => {
              comments_mutate();
            })
            .catch((err) => {});
        }
      });
    }
  }

  function addApprovalSubComment(sectionId: number) {
    const value = textfieldValue.trimStart() || '';

    comments_mutate().then(() => {
      if (comments_data) {
        const newCommentsData: ApiFormComments = Object.assign(
          [],
          comments_data
        );
        newCommentsData[sectionId].status = 4;
        newCommentsData[sectionId].comments.push({
          id: generateRandomHash('message_by_' + auth?.value?.username, 8),
          username: auth?.value?.username || '',
          date: new Date(),
          status: 4,
          message: value.trimStart() || '',
        });
        instance
          .patch(api.patchFormComments(props.formId), {
            comments: JSON.stringify(newCommentsData),
          })
          .then((res) => {
            comments_mutate();
          })
          .catch((err) => {});
      }
    });
  }

  function addReviewSubComment(sectionId: number) {
    const value = textfieldValue.trimStart() || '';
    if (value) {
      comments_mutate().then(() => {
        if (comments_data) {
          const newCommentsData: ApiFormComments = Object.assign(
            [],
            comments_data
          );
          newCommentsData[sectionId].status = 3;
          newCommentsData[sectionId].comments.push({
            id: generateRandomHash('message_by_' + auth?.value?.username, 8),
            username: auth?.value?.username || '',
            date: new Date(),
            status: 3,
            message: value,
          });
          instance
            .patch(api.patchFormComments(props.formId), {
              comments: JSON.stringify(newCommentsData),
            })
            .then((res) => {
              comments_mutate();
            })
            .catch((err) => {});
        }
      });
    }
  }

  if (mode === 'edit' && data && !data.isEditor() && !data.isAdmin()) {
    return null;
  }

  if (mode === 'approve' && !isOnApprovalCycle()) {
    return null;
  }

  return (
    <>
      {(section.status === 2 ||
        (section.status !== 1 && section.status !== 4 && mode !== 'edit')) && (
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <TextField
            value={textfieldValue}
            onChange={(e) => {
              const value = e.target.value;
              setTextfieldValue(value);
            }}
            multiline
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-input': {
                minHeight: '56px',
              },
            }}
          />
          {(mode !== 'edit' || section.status === 2) && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              {mode !== 'edit' && (
                <ButtonDashboard
                  size='small'
                  variant='contained'
                  color='error'
                  sx={{ height: '40px' }}
                  onClick={() => addRejectionSubComment(index)}
                >
                  <Close />
                </ButtonDashboard>
              )}

              <ButtonDashboard
                sx={{ height: mode === 'edit' ? '88px' : '40px' }}
                size='small'
                variant='contained'
                color='success'
                onClick={() =>
                  mode === 'edit'
                    ? addReviewSubComment(index)
                    : addApprovalSubComment(index)
                }
              >
                <Check />
              </ButtonDashboard>
            </Box>
          )}
        </Box>
      )}
    </>
  );
}
