import {
  Box,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import SidebarAccordion from './sidebar-accordion';
import ButtonDashboard from '@/components/common/dashboard/button-dashboard';
import React, { SetStateAction, useContext, useState } from 'react';
import useGenerateSideBarActions from '@/components/common/dashboard/FormBuilder/use-generate-sidebar-actions';
import { FieldsArray } from '@/components/common/dashboard/form-renderer';
import { AddCircle, Settings } from '@mui/icons-material';
import FadeBox from './fade-box';
import CommentBox from './comment-box';
import ApprovalState from './approval-state';
import { ApprovalStateDataInstance } from './approval-state/use-approval-state-data';
import api, { ApiFormIdInfo, instance } from '@/api';
import { IFormHeaderBaseProps } from '@/components/common/dashboard/TForm/header';
import LoadingModal from '@/components/common/loading-modal';
import { AuthenticationContext } from '@/contexts/authentication-context';
import useQuery from '@/utils/use-query';
import { useRouter } from 'next/router';

export default function EditModeActions({
  id,
  versionState,
  fields,
  setFields,
  header,
  setDefaultValues,
  commentsState,
  approvalData,
  previewMode,
  setPreviewMode,
  testMode: editMode,
  setTestMode: setEditMode,
}: {
  id: string;
  versionState: {
    version: any;
    setVersion: any;
  };
  fields: FieldsArray;
  setFields: React.Dispatch<SetStateAction<FieldsArray>>;
  header: IFormHeaderBaseProps | null;
  setDefaultValues: React.Dispatch<SetStateAction<any>>;
  commentsState: ReturnType<typeof useQuery>;
  approvalData: ApprovalStateDataInstance;
  previewMode: boolean;
  setPreviewMode: React.Dispatch<SetStateAction<boolean>>;
  testMode: boolean;
  setTestMode: React.Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const formInfo = approvalData.info_response?.data as ApiFormIdInfo;

  const [panel, setPanel] = useState<number | false>(0);
  const { version, setVersion } = versionState;

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setPanel(newExpanded ? panel : false);
    };

  const panelState = {
    state: panel,
    handleChange: handleChange,
  };

  const { actionButtons } = useGenerateSideBarActions(
    setFields,
    setDefaultValues
  );

  const {
    response: comments_response,
    isLoading: comments_isLoading,
    error: comments_error,
    mutate: comments_mutate,
  } = commentsState;
  const [textfieldValue, setTextfieldValue] = useState<string>('');

  function getStatus() {
    switch (formInfo.state) {
      case 1:
        return 'In Creation';
      case 2:
        return 'Waiting for Approval';
      case 3:
        return 'Discarded';
      case 4:
        return 'Approved';
      case 5:
        return 'Obsolete';
      default:
        return '(unknown status)';
    }
  }

  const [loadingModalVisible, setLoadingModalVisible] = useState(false);

  const openLoadingModal = () => setLoadingModalVisible(true);
  const closeLoadingModal = () =>
    setTimeout(() => setLoadingModalVisible(false), 500);

  const auth = useContext(AuthenticationContext);

  const editingPermissions = () =>
    approvalData?.isEditor() || approvalData?.isAdmin();

  return (
    <>
      <LoadingModal open={loadingModalVisible} />
      <FadeBox style={{ borderRadius: 4 }}>
        <SidebarAccordion id={0} title={'Form Setup'} panelState={panelState}>
          <Box sx={{ display: 'flex', mb: 0.5 }}>
            <Typography
              variant='body1'
              component='h2'
              sx={{ fontWeight: '500' }}
            >
              Status
            </Typography>
            <Typography
              variant='body1'
              component='h2'
              sx={{ marginLeft: 'auto' }}
            >
              {getStatus()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mb: 0.5 }}>
            <Typography
              variant='body1'
              component='h2'
              sx={{ fontWeight: '500' }}
            >
              Reference
            </Typography>
            <Typography
              variant='body1'
              component='h2'
              sx={{ marginLeft: 'auto' }}
            >
              {formInfo.reference.id.reference}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Typography
              variant='body1'
              component='h2'
              sx={{ fontWeight: '500' }}
            >
              Start Date
            </Typography>
            <IconButton
              sx={{ marginLeft: 'auto', p: 0, mr: 0.25 }}
              disableRipple
            >
              <Settings
                sx={{
                  fontSize: '1.25rem',
                  color: 'info.main',
                }}
              />
            </IconButton>
            <Typography
              variant='body1'
              component='h2'
              sx={{ textDecoration: 'underline' }}
            >
              Immediately
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Typography
              variant='body1'
              component='h2'
              sx={{ fontWeight: '500' }}
            >
              Links
            </Typography>
            <IconButton
              sx={{
                marginLeft: 'auto',
                p: '0',
              }}
              disableRipple
            >
              <AddCircle
                sx={{
                  fontSize: '1.25rem',
                  color: 'info.main',
                }}
              />
            </IconButton>
          </Box>
          {editingPermissions() &&
            (approvalData.formStatus === 1 ||
              approvalData.formStatus === 2) && (
              <Box sx={{ display: 'flex' }}>
                <ButtonDashboard
                  size='small'
                  variant='contained'
                  sx={{
                    flex: 1,
                  }}
                  color={approvalData?.formStatus === 1 ? 'info' : 'error'}
                  onClick={() => {
                    if (approvalData?.formStatus === 1) {
                      openLoadingModal();
                      instance
                        .post(api.postFormIdSendForApproval(id), {})
                        .then((res) => {
                          closeLoadingModal();
                          approvalData.info_mutate();
                        })
                        .catch((err) => {
                          if (err?.response?.status === 401) {
                            router.push('/login');
                          }
                        });
                    }

                    if (approvalData?.formStatus === 2) {
                      openLoadingModal();
                      instance
                        .post(api.postFormDiscard(id), {})
                        .then((res) => {
                          closeLoadingModal();
                          approvalData.info_mutate();
                        })
                        .catch((err) => {
                          if (err?.response?.status === 401) {
                            router.push('/login');
                          }
                        });
                    }
                  }}
                >
                  {approvalData?.formStatus === 1
                    ? 'Send for Approval'
                    : 'Discard Form'}
                </ButtonDashboard>
              </Box>
            )}
        </SidebarAccordion>

        <SidebarAccordion
          id={1}
          title={'Past Versions'}
          panelState={panelState}
          detailsStyle={{ paddingY: 0 }}
        >
          <List disablePadding>
            <ListItemButton
              sx={{
                mx: -2,
                backgroundColor:
                  version === 0 ? '#999999!important' : 'transparent',
                color: version === 0 ? 'white' : 'black',
              }}
              onClick={() => {
                setVersion(0);
              }}
            >
              <Typography variant='body2' component='span'>
                Version 1.2
              </Typography>
            </ListItemButton>
            <ListItemButton
              sx={{
                mx: -2,
                backgroundColor:
                  version === 1 ? '#999999!important' : 'transparent',
                color: version === 1 ? 'white' : 'black',
              }}
              onClick={() => {
                setVersion(1);
              }}
            >
              <Typography variant='body2' component='span'>
                Version 1.1
              </Typography>
            </ListItemButton>
            <ListItemButton
              sx={{
                mx: -2,
                backgroundColor:
                  version === 2 ? '#999999!important' : 'transparent',
                color: version === 2 ? 'white' : 'black',
              }}
              onClick={() => {
                setVersion(2);
              }}
            >
              <Typography variant='body2' component='span'>
                Version 1.0
              </Typography>
            </ListItemButton>
          </List>
        </SidebarAccordion>

        {editingPermissions() &&
          (approvalData.formStatus === 1 || approvalData.formStatus === 2) && (
            <SidebarAccordion
              id={2}
              title='Add Questions'
              panelState={panelState}
            >
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {actionButtons.map((button, index) => {
                  return (
                    <React.Fragment key={index}>
                      {button.render()}
                    </React.Fragment>
                  );
                })}
              </Box>
            </SidebarAccordion>
          )}
      </FadeBox>
      <ApprovalState
        textfieldValue={textfieldValue}
        setTextfieldValue={setTextfieldValue}
        mode='edit'
        commentsState={commentsState}
        data={approvalData}
        formId={id}
        // setScrollToEnd={setScrollToEnd} // FIXME - Deprecated concept
      />
      <CommentBox
        mode='edit'
        commentsState={commentsState}
        data={approvalData}
        formId={id}
      />

      <Box
        sx={{ paddingTop: 2, display: 'flex', gap: 1.5 }}
        //ref={divToScrollRef} // FIXME - Deprecated concept
      >
        {!previewMode && (
          <>
            {editingPermissions() &&
              (approvalData?.formStatus === 1 ||
                approvalData?.formStatus === 2) && (
                <ButtonDashboard
                  variant='contained'
                  sx={{
                    flex: 1,
                    boxShadow:
                      '0 0 5px 0 rgb(43 43 43 / 10%), 0 11px 6px -7px rgb(43 43 43 / 10%)',
                  }}
                  onClick={() => {
                    openLoadingModal();
                    instance
                      .patch(api.patchFormQuestions(id), {
                        questions: fields,
                      })
                      .then((res) => {
                        instance
                          .patch(api.patchFormHeader(id), {
                            //uapName: 'FirstUAP',
                            //familyName: 'Family1',
                            //referenceName: 'newReference',

                            title: header?.form_name,
                            description: header?.form_description,
                          })
                          .then((res) => {
                            closeLoadingModal();
                          })
                          .catch((err) => {});
                      })
                      .catch((err) => {});
                  }}
                >
                  Save
                </ButtonDashboard>
              )}
          </>
        )}

        {previewMode && (
          <ButtonDashboard
            variant='contained'
            sx={{
              flex: 1,
              boxShadow:
                '0 0 5px 0 rgb(43 43 43 / 10%), 0 11px 6px -7px rgb(43 43 43 / 10%)',
            }}
            grey={false}
            color='primary'
            onClick={() => {
              setEditMode((current) => !current);
            }}
          >
            {editMode ? 'Preview Mode' : 'Test Form'}
          </ButtonDashboard>
        )}
        <ButtonDashboard
          variant='outlined'
          sx={{
            flex: 1,
            boxShadow:
              '0 0 5px 0 rgb(43 43 43 / 10%), 0 11px 6px -7px rgb(43 43 43 / 10%)',
          }}
          color={'primary'}
          onClick={() => {
            setPreviewMode((current) => {
              if (current) setEditMode(false);
              return !current;
            });
          }}
        >
          {previewMode ? 'Edit Mode' : 'Preview Mode'}
        </ButtonDashboard>
      </Box>
    </>
  );
}
