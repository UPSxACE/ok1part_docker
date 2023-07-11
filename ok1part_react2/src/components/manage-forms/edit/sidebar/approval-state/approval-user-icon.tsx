import { ApiFormComments } from '@/api';
import { AuthenticationContext } from '@/contexts/authentication-context';
import useQuery from '@/utils/use-query';
import { Avatar, Tooltip } from '@mui/material';
import { useContext } from 'react';
import { ApprovalStateDataInstance } from './use-approval-state-data';

export interface IApprovalUserIcon {
  username: string;
  status: number;
  self?: boolean;
  commentsState: ReturnType<typeof useQuery>;
  data: ApprovalStateDataInstance;
}

function getColor(status: number) {
  switch (status) {
    case 1:
      return 'grey';
    case 2:
      return '#d32f2f'; // mui-error red
    case 3:
      return '#2e7d32'; // mui-success green
    default:
      return;
  }
}

export default function ApprovalUserIcon({
  username,
  status,
  self,
  commentsState,
  data,
}: IApprovalUserIcon) {
  const commentsData =
    (commentsState?.response?.data as ApiFormComments | null) || [];
  const auth = useContext(AuthenticationContext);

  /*
  function userHasApproved() {
    const userOnApprovalCycle = data?.approvalStatus?.find(
      (user) => user.username === auth?.value?.username
    );
    if (userOnApprovalCycle?.status === 2) {
      return true;
    }
    return false;
  }

  function userHasRejectionActive() {
    let hasRejection = false;
    commentsData.forEach((section) => {
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
  */

  function userAlreadyRejectedSomething() {
    let alreadyRejected = false;
    commentsData.forEach((section) => {
      if (section.username === username) alreadyRejected = true;
    });
    return alreadyRejected;
  }

  function getVirtualStatus() {
    if (status === 1) {
      if (userAlreadyRejectedSomething()) {
        return 2;
      }
      return 1;
    }
    if (status === 2) {
      return 3;
    }
    console.log('Invalid Status From Database');
    return 1;
  }

  return (
    <Tooltip title={username} placement='top'>
      <Avatar
        sx={{
          border: `3px solid ${getColor(getVirtualStatus())}`,
          ':hover': { cursor: 'pointer' },
          backgroundColor: `${getColor(getVirtualStatus())}`,
          height: self ? 52 : undefined,
          width: self ? 52 : undefined,
          transitionProperty: 'height, width, background-color, border-color',
          transitionDuration: '1s',
        }}
      />
    </Tooltip>
  );
}
