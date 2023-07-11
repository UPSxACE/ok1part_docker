import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
} from '@mui/material';
import React, { SetStateAction, memo, useEffect, useState } from 'react';
import {
  AutoFixHigh,
  LibraryBooks,
  PieChart,
  PublishedWithChanges,
} from '@mui/icons-material';
import EditModeActions from './edit-mode-actions';
import { motion } from 'framer-motion';
import { FieldsArray } from '@/components/common/dashboard/form-renderer';
import ApproveModeActions from './approve-mode-actions';
import { ICommentSection } from './approval-state/use-comment-sections';
import { ApprovalStateDataInstance } from './approval-state/use-approval-state-data';
import LoaderPrimary from '@/components/common/loader-primary';
import { IFormHeaderBaseProps } from '@/components/common/dashboard/TForm/header';
import useQuery from '@/utils/use-query';
import api from '@/api';

const toggleButtonStyle = {
  backgroundColor: 'white',
  borderLeftWidth: 1,
  borderColor: '#dadce0!important', //'#c3c3c3!important',
  '&:hover': {
    backgroundColor: 'rgb(238 238 238)',
  },
  flex: 1,
  '&.Mui-selected': {
    backgroundColor: (theme: any) => theme.palette.primary.main + '!important',
    color: 'white',
  },
};

const MotionToggleButton = motion(ToggleButton);
const MotionToggleButtonGroup = motion(ToggleButtonGroup);
const MotionBox = motion(Box);

const MemoizedTabs = memo(Tabs, (prev, next) => {
  return prev.mode === next.mode;
});

export default function Sidebar({
  mode,
  setMode,
  fields,
  setFields,
  header,
  setDefaultValues,
  previewMode,
  setPreviewMode,
  testMode,
  setTestMode,
  id,
  approvalData,
}: {
  id: string;
  mode: any;
  setMode: React.Dispatch<SetStateAction<any>>;
  fields: FieldsArray;
  setFields: React.Dispatch<SetStateAction<FieldsArray>>;
  header: IFormHeaderBaseProps | null;
  setDefaultValues: React.Dispatch<SetStateAction<any>>;
  previewMode: boolean;
  setPreviewMode: React.Dispatch<SetStateAction<boolean>>;
  testMode: boolean;
  setTestMode: React.Dispatch<SetStateAction<boolean>>;
  approvalData: ApprovalStateDataInstance;
}) {
  const handleMode = (
    event: React.MouseEvent<HTMLElement>,
    newMode: number | null
  ) => {
    window.scrollTo(0, 0);
    if (newMode === null) {
      return;
    }
    setMode(newMode);
  };

  // This is used to enable the layout prop (responsible for animations) only on small screens)
  const isBigScreen = useMediaQuery('(min-width:900px)');

  // This is necessary, because the prop "layout" can't be false when page is loaded, otherwise resizing won't enable animations
  const [notReady, setNotReady] = useState(true);

  useEffect(() => {
    setNotReady(false);
  }, []);

  const [version, setVersion] = useState(0);

  const versionState = {
    version,
    setVersion,
  };

  // Comments state
  const [commentSections, setCommentSections] = useState<ICommentSection[]>([]);

  const commentsState = useQuery(api.getFormComments(id));

  const rightReady = approvalData
    ? !approvalData.info_isLoading && !approvalData.info_error
    : false;

  return (
    <Box
      sx={{
        //display: 'flex',
        // FIXME - only above 900px
        flex: 'initial',
        ml: 2,
        position: 'sticky',
        top: 102,
        padding: 0,
        height: 'calc(100vh - 70px - 32px - 32px)',
        //width: '25vw', // FIXME - needs more testing
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {rightReady ? (
        <React.Fragment>
          <MemoizedTabs
            mode={mode}
            handleMode={handleMode}
            notReady={notReady}
            isBigScreen={isBigScreen}
          />
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleMode}
            sx={{
              mb: 2,
              display: { xs: mode === 3 ? 'none' : 'flex', md: 'none' },
              rowGap: 2,
              boxShadow:
                '0 0 5px 0 rgb(43 43 43 / 10%), 0 11px 6px -7px rgb(43 43 43 / 10%)',
            }}
          >
            <MotionToggleButton
              sx={{
                ...toggleButtonStyle,
              }}
              value={2}
              layout={notReady || isBigScreen}
            >
              <motion.div
                layout={notReady || isBigScreen}
                style={{ display: 'flex' }}
              >
                <LibraryBooks />
              </motion.div>
            </MotionToggleButton>
            <MotionToggleButton
              sx={{
                ...toggleButtonStyle,
              }}
              value={3}
              layout={notReady || isBigScreen}
            >
              <motion.div
                layout={notReady || isBigScreen}
                style={{ display: 'flex' }}
              >
                <PieChart />
              </motion.div>
            </MotionToggleButton>
          </ToggleButtonGroup>
          <MotionBox
            //layout={notReady || isBigScreen}

            sx={{
              width: mode === 3 ? 60 : '25vw',
              maxWidth: 400,
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'scroll',
              MsOverflowStyle: 'none',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              marginBottom: -1,
              paddingBottom: 1,
            }}
          >
            {mode === 0 && (
              <EditModeActions
                id={id}
                versionState={versionState}
                fields={fields}
                setFields={setFields}
                header={header}
                setDefaultValues={setDefaultValues}
                commentsState={commentsState}
                approvalData={approvalData}
                previewMode={previewMode}
                setPreviewMode={setPreviewMode}
                testMode={testMode}
                setTestMode={setTestMode}
              />
            )}
            {mode === 1 && (
              <ApproveModeActions
                commentsState={commentsState}
                approvalData={approvalData}
                formId={id}
              />
            )}
          </MotionBox>
          <Box sx={{ paddingTop: 1 }} />
        </React.Fragment>
      ) : (
        <Box
          sx={{
            flex: 1,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            width: mode === 3 ? 60 : '25vw',
            maxWidth: 400,
          }}
        >
          <LoaderPrimary />
        </Box>
      )}
    </Box>
  );
}

// Functions...
function Tabs({ mode, handleMode, notReady, isBigScreen }: any) {
  // Debug: console.log(notReady, isBigScreen);
  return (
    <MotionToggleButtonGroup
      value={mode}
      exclusive
      onChange={handleMode}
      sx={{
        display: 'flex',
        mb: 2,
        rowGap: mode === 3 ? 0 : 2,
        width: mode === 3 ? 60 : '25vw',
        maxWidth: 400,
        flexDirection: mode === 3 ? 'column' : 'row',
        filter: 'drop-shadow(0px 5px 4px rgb(43 43 43 / 15%))!important',

        '& .MuiToggleButton-root': {
          marginLeft: mode === 3 ? '-1px' : undefined,
          borderRadius: mode === 3 ? '0' : undefined,
          '&:nth-of-type(2)': {
            borderBottomRightRadius: { xs: mode !== 3 ? 4 : 0, md: 0 },
            borderTopRightRadius: { xs: mode !== 3 ? 4 : 0, md: 0 },
          },
          '&:first-of-type': {
            borderTopLeftRadius: mode === 3 ? 4 : undefined,
            borderTopRightRadius: mode === 3 ? 4 : undefined,
          },
          '&:last-of-type': {
            borderBottomLeftRadius: mode === 3 ? 4 : undefined,
            borderBottomRightRadius: mode === 3 ? 4 : undefined,
          },
        },
      }}
      layout={notReady || isBigScreen}
    >
      <MotionToggleButton
        sx={{
          ...toggleButtonStyle,
        }}
        value={0}
        layout={notReady || isBigScreen}
      >
        <motion.div
          layout={notReady || isBigScreen}
          style={{
            display: 'flex',
          }}
        >
          <AutoFixHigh />
        </motion.div>
      </MotionToggleButton>

      <MotionToggleButton
        sx={{
          ...toggleButtonStyle,
        }}
        value={1}
        layout={notReady || isBigScreen}
      >
        <motion.div
          layout={notReady || isBigScreen}
          style={{ display: 'flex' }}
        >
          <PublishedWithChanges />
        </motion.div>
      </MotionToggleButton>
      <MotionToggleButton
        sx={{
          ...toggleButtonStyle,
          display: { xs: mode === 3 ? 'flex' : 'none', md: 'flex' },
        }}
        value={2}
        layout={notReady || isBigScreen}
      >
        <motion.div
          layout={notReady || isBigScreen}
          style={{ display: 'flex' }}
        >
          <LibraryBooks />
        </motion.div>
      </MotionToggleButton>
      <MotionToggleButton
        sx={{
          ...toggleButtonStyle,
          display: { xs: mode === 3 ? 'flex' : 'none', md: 'flex' },
        }}
        value={3}
        layout={notReady || isBigScreen}
      >
        <motion.div
          layout={notReady || isBigScreen}
          style={{ display: 'flex' }}
        >
          <PieChart />
        </motion.div>
      </MotionToggleButton>
    </MotionToggleButtonGroup>
  );
}
