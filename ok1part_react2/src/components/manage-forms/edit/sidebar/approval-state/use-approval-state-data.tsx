import api, { ApiFormIdApprovalStatus, ApiFormIdInfo } from '@/api';
import { AuthenticationContext } from '@/contexts/authentication-context';
import useQuery from '@/utils/use-query';
import { useContext } from 'react';

export default function useApprovalStateData(id: string) {
  const {
    response: info_response,
    isLoading: info_isLoading,
    error: info_error,
    mutate: info_mutate,
  } = useQuery(api.getFormInfo(id));

  const {
    response: approval_response,
    isLoading: approval_isLoading,
    error: approval_error,
    mutate: approval_mutate,
  } = useQuery(api.getFormApprovalStatus(id));

  const formInfo = (info_response?.data as ApiFormIdInfo) || null;
  const formStatus = formInfo?.state;
  const formEditor = formInfo?.ownerForm?.username;

  const approvalStatusData =
    (approval_response?.data as ApiFormIdApprovalStatus) || null;
  const approvalStatusDataTransformed = approvalStatusData
    ? approvalStatusData.map((opInCycle) => {
        return {
          username: opInCycle.fkoperator.username,
          state: opInCycle.state,
        };
      })
    : null;
  const approvalStatus = approvalStatusDataTransformed || null;

  const approvalMutate = approval_mutate;
  // const [usersApprovalStatus, setUsersApprovalStatus] =
  //   useState<ApiFormIdApprovalStatus | null>(null);

  const auth = useContext(AuthenticationContext);

  function isEditor() {
    if (formEditor === null || auth === null) return false;
    return (
      Number(auth?.value?.permissions) & 2 &&
      formInfo?.ownerForm?.username === auth?.value?.username
    );
  }

  function isAdmin() {
    return (
      auth?.value?.permissions &&
      (auth?.value?.permissions & 8 || auth?.value?.permissions & 16)
    );
  }

  /* FIXME - Deprecated code
  useEffect(() => {
    // fetch form status
    setTimeout(() => {
      !formStatus && setFormStatus(1);
      !formEditor && setFormEditor(6);
    }, 300);
    // fetch users participating in the approval cycle
    setTimeout(
      () =>
        !usersApprovalStatus &&
        setUsersApprovalStatus([
          { id: 1, status: 1 },
          { id: 2, status: 1 },
          { id: 3, status: 1 },
          { id: 4, status: 1 },
          { id: 5, status: 1 },
        ]),
      500
    );
    // fetch self user id
    setTimeout(() => !selfUserId && setSelfUserId(6), 1000);
  }, []);
  */

  /*if (formStatus === 1 || formStatus === null) {
    return null;
  }*/

  return {
    info_response,
    info_isLoading,
    info_error,
    info_mutate,
    approvalStatus,
    approvalMutate,
    formStatus,
    formEditor,
    isEditor,
    isAdmin,
  };
}

export type ApprovalStateDataInstance = ReturnType<typeof useApprovalStateData>;
