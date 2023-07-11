import { Box, Divider, Typography } from '@mui/material';
import FadeBox from '../fade-box';
import { Dispatch, SetStateAction, useContext } from 'react';

import EditingMode from './editing-mode';
import ApprovalMode from './approval-mode';
import ApprovalUserIcon from './approval-user-icon';
import LoaderPrimary from '@/components/common/loader-primary';
import { ApprovalStateDataInstance } from './use-approval-state-data';
import { AuthenticationContext } from '@/contexts/authentication-context';
import useQuery from '@/utils/use-query';

export interface IAprovalStateProps {
  textfieldValue: string;
  setTextfieldValue: Dispatch<SetStateAction<string>>;
  commentsState: ReturnType<typeof useQuery>;
  mode: 'edit' | 'approve';
  data: ApprovalStateDataInstance;
  formId: string;
  // setScrollToEnd: Dispatch<SetStateAction<boolean>>; // FIXME - Deprecated concept
}

export default function ApprovalState(props: IAprovalStateProps) {
  const {
    mode,
    textfieldValue,
    setTextfieldValue,
    commentsState,
    data,
    formId,
    //setScrollToEnd, // FIXME - Deprecated concept
  } = props;
  const {
    response: comments_response,
    isLoading: comments_isLoading,
    error: comments_error,
    mutate: comments_mutate,
  } = commentsState;
  const auth = useContext(AuthenticationContext);

  if (data?.formStatus === null || data?.formStatus === 1) {
    return null;
  }

  function isOnApprovalCycle() {
    if (
      auth?.value?.permissions &&
      !(auth?.value?.permissions & 4) &&
      !(auth?.value?.permissions & 8) &&
      !(auth?.value?.permissions & 16)
    )
      return false;
    if (!auth || !data?.approvalStatus) {
      return false;
    }
    const indexOnApprovalCycle = data?.approvalStatus?.findIndex(
      (user) => user.username === auth?.value?.username
    );
    if (indexOnApprovalCycle === -1) return false;
    return true;
  }

  const editingPermissions = () => data?.isEditor() || data?.isAdmin();

  return (
    <Box sx={{ '&:not(:first-of-type)': { paddingTop: 2 } }}>
      <FadeBox
        style={{
          borderRadius: 4,
          border: '1px solid #e0e0e0',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            component='h1'
            variant='body1'
            sx={{
              fontWeight: 500,
              fontSize: '1.05rem',
              color: '#000000de',
              textAlign: 'center',
              mb: 0.5,
            }}
          >
            Approval Cycle
          </Typography>
          {data?.approvalStatus === null ? (
            <Box sx={{ display: 'flex', mt: 1, justifyContent: 'center' }}>
              <LoaderPrimary size={30} />
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              {(data?.approvalStatus || []).map((user, index) => {
                return (
                  <ApprovalUserIcon
                    key={index}
                    status={user.state}
                    username={user.username || ''}
                    self={
                      auth !== null &&
                      user !== null &&
                      user.username === auth?.value?.username
                    }
                    commentsState={commentsState}
                    data={data}
                  />
                );
              })}
            </Box>
          )}

          {data?.formStatus === 2 &&
            ((mode === 'edit' && editingPermissions()) ||
              (mode === 'approve' && isOnApprovalCycle())) && (
              <Divider sx={{ mt: 2, mb: 1 }} />
            )}
          {data?.formStatus === 2 &&
            mode === 'edit' &&
            editingPermissions() && <EditingMode {...props} />}
          {data?.formStatus === 2 &&
            mode === 'approve' &&
            isOnApprovalCycle() && <ApprovalMode {...props} />}

          {data?.formStatus === 3 && (
            <Typography
              component='span'
              variant='body1'
              sx={{
                fontWeight: 500,
                fontSize: '0.9rem',
                color: 'error.main',
                textAlign: 'center',
                mt: 0.5,
              }}
            >
              Form Discarded
            </Typography>
          )}
        </Box>
      </FadeBox>
    </Box>
  );
}
