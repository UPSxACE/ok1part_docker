import { Box, TextField } from '@mui/material';
import ButtonDashboard from '@/components/common/dashboard/button-dashboard';
import { Check, Close, FastRewind } from '@mui/icons-material';
import { IAprovalStateProps } from '.';
import generateRandomHash from '@/utils/generate-random-hash';
import React, { useContext } from 'react';
import api, { ApiFormComments, instance } from '@/api';
import { AuthenticationContext } from '@/contexts/authentication-context';
import { useRouter } from 'next/router';

export default function ApprovalMode(props: IAprovalStateProps) {
  const router = useRouter();
  const {
    data,
    textfieldValue,
    setTextfieldValue,
    commentsState,
    // setScrollToEnd, // FIXME - Deprecated concept
  } = props;

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

  function unapprove() {
    instance
      .post(api.postFormUnapprove(props.formId), {})
      .then((res) => {
        data?.approvalMutate();
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          router.push('/login');
        }
      });

    return;
  }

  function userApproves() {
    instance
      .post(api.postFormApprove(props.formId), {})
      .then((res) => {
        data?.approvalMutate();
        data?.info_mutate();
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          router.push('/login');
        }
      });
  }

  function userHasApproved() {
    const userOnApprovalCycle = data?.approvalStatus?.find(
      (user) => user.username === auth?.value?.username
    );
    if (userOnApprovalCycle?.state === 2) {
      return true;
    }
    return false;
  }

  function userHasRejectionActive() {
    let hasRejection = false;
    comments_data.forEach((section) => {
      const sectionLength = section.comments.length;
      if (
        section.comments[sectionLength - 1].username ===
          auth?.value?.username &&
        section.comments[sectionLength - 1].status === 2
      ) {
        hasRejection = true;
      } else if (section.comments[sectionLength - 1].status === 3) {
        if (
          section.comments[sectionLength - 2].username ===
            auth?.value?.username &&
          section.comments[sectionLength - 2].status === 2
        ) {
          hasRejection = true;
        }
      }
    });
    return hasRejection;
  }

  function userAlreadyRejectedSomething() {
    let alreadyRejected = false;
    comments_data.forEach((section) => {
      if (section.username === auth?.value?.username) alreadyRejected = true;
    });
    return alreadyRejected;
  }

  function rejectionComment() {
    const value = textfieldValue?.trimStart() || '';
    if (value) {
      comments_mutate().then(() => {
        if (comments_data) {
          const newCommentsData: ApiFormComments = Object.assign(
            [],
            comments_data
          );

          newCommentsData.unshift({
            id: generateRandomHash('section_by_' + auth?.value?.username, 8),
            username: auth?.value?.username || '',
            status: 2,
            comments: [
              {
                id: generateRandomHash(
                  'message_by_' + auth?.value?.username,
                  8
                ),
                username: auth?.value?.username || '',
                date: new Date(),
                message: value,
                status: 2,
              },
            ],
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
      setTextfieldValue('');
    }
  }

  function approvalComment() {
    const value = textfieldValue?.trimStart() || '';

    if (value) {
      comments_mutate().then(() => {
        if (comments_data) {
          const newCommentsData: ApiFormComments = Object.assign(
            [],
            comments_data
          );

          newCommentsData.unshift({
            id: generateRandomHash('section_by_' + auth?.value?.username, 8),
            username: auth?.value?.username || '',
            status: 4,
            comments: [
              {
                id: generateRandomHash(
                  'message_by_' + auth?.value?.username,
                  8
                ),
                username: auth?.value?.username || '',
                date: new Date(),
                message: value,
                status: 4,
              },
            ],
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
      setTextfieldValue('');
    }

    userApproves();
  }

  if (userHasApproved()) {
    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <ButtonDashboard
          size='small'
          variant='contained'
          sx={{ height: '88px', width: '100%' }}
          onClick={unapprove}
          color='info'
        >
          <FastRewind />
        </ButtonDashboard>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <React.Fragment>
          <ButtonDashboard
            size='small'
            variant='contained'
            color='error'
            sx={{ height: userHasRejectionActive() ? '88px' : '40px' }}
            onClick={rejectionComment}
          >
            <Close />
          </ButtonDashboard>

          {!userHasRejectionActive() && (
            <ButtonDashboard
              sx={{ height: '40px' }}
              size='small'
              variant='contained'
              color='success'
              onClick={approvalComment}
            >
              <Check />
            </ButtonDashboard>
          )}
        </React.Fragment>
      </Box>
    </Box>
  );
}
