import DashboardMiniWrapper from '@/components/common/dashboard/dashboard-mini-wrapper';
import Box from '@mui/material/Box';

import React, { Dispatch, SetStateAction } from 'react';
import { IEditFormAction } from '../use-generate-actions';
import { FieldsArray } from '@/components/common/dashboard/form-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import QuestionOptions from './question-options';
import { ApprovalStateDataInstance } from '@/components/manage-forms/edit/sidebar/approval-state/use-approval-state-data';
import { Typography } from '@mui/material';

export interface IEditToolboxProps {
  children: React.ReactNode;
  id: number;
  focusedElement: number;
  setFocusedElement: Dispatch<SetStateAction<number>>;
  actions: IEditFormAction[];
  renderQuestionOptions?: true | false;
  fieldsArray: FieldsArray;
  setFieldsArray: Dispatch<SetStateAction<FieldsArray>>;
  approvalData: ApprovalStateDataInstance;
  isDep?: boolean;
  questionNumber?: string;
  depNumber?: number;
  resetForm: Function;
}

export default function EditToolbox(props: IEditToolboxProps) {
  const {
    children,
    id,
    focusedElement,
    setFocusedElement,
    actions,
    renderQuestionOptions = true,
    fieldsArray,
    setFieldsArray,
    approvalData,
    isDep = false,
    questionNumber,
    depNumber,
  } = props;

  function focus() {
    setFocusedElement(id);
  }

  const editingPermissions = () =>
    (approvalData.formStatus === 1 || approvalData.formStatus === 2) &&
    (approvalData?.isEditor() || approvalData?.isAdmin());

  const notFocused = focusedElement !== id || !editingPermissions();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '&:not(:first-of-type)': { paddingTop: 2 },
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <DashboardMiniWrapper
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            paddingRight: 2,

            padding: 0,
            overflow: 'hidden',
          }}
          wrapperProps={{ onFocus: focus }}
        >
          {editingPermissions() && id !== 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                flex: 0,
                justifyContent: 'center',
                padding: 0,
                marginRight: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                boxShadow: 'none',
                borderRight: 1,
                borderRightColor: '#e0e2e4',
                minWidth: '4.5rem',
              }}
            >
              <FontAwesomeIcon
                icon={faChevronUp}
                style={{
                  padding: 8,
                  paddingLeft: 12,
                  paddingRight: 12,
                  cursor: 'pointer',
                  color: 'black', //'#336677',
                }}
              />
              <Typography
                component='span'
                variant='body1'
                fontWeight='semi-bold'
                fontSize='1.2rem'
                textAlign='center'
              >
                {questionNumber}
              </Typography>
              <FontAwesomeIcon
                icon={faChevronDown}
                style={{
                  padding: 8,
                  paddingLeft: 12,
                  paddingRight: 12,
                  cursor: 'pointer',
                  color: 'black', //'#336677',
                }}
              />
            </Box>
          )}

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              padding: 3,
              paddingBottom: notFocused ? 3 : 1,

              cursor: notFocused ? 'pointer' : undefined,
            }}
            tabIndex={id}
          >
            {children}
            {editingPermissions() && focusedElement === id && (
              <Box
                sx={{
                  width: '100%',
                  //py: '10px',
                }}
              >
                {renderQuestionOptions && <QuestionOptions {...props} />}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    borderTop: '1px solid #e0e2e4',
                    //marginTop: 1,
                    paddingTop: 1,
                    marginX: -3,
                  }}
                >
                  {actions.map((action, index) => {
                    return (
                      <React.Fragment key={index}>
                        {action.render(id)}
                      </React.Fragment>
                    );
                  })}
                </Box>
              </Box>
            )}
          </Box>
        </DashboardMiniWrapper>
      </Box>
    </Box>
  );
}
