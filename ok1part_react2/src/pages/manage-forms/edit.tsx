import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getDashboardLayout from '@/utils/get-dashboard-layout';
import { Box } from '@mui/material';
import LoaderPrimary from '@/components/common/loader-primary';
import { useRouter } from 'next/router';
import FormRenderer, {
  FieldsArray,
} from '@/components/common/dashboard/form-renderer';
import React, { useEffect, useState } from 'react';
import { IFormHeaderBaseProps } from '@/components/common/dashboard/TForm/header';
import useInitForm, {
  FormInstance,
} from '@/components/common/dashboard/form-renderer/use-init-form';
import Sidebar from '@/components/manage-forms/edit/sidebar';
import DataModePage from '@/components/manage-forms/edit/data-mode-page';
import api from '@/api';
import useQueryImmutable from '@/utils/use-query-immutable';
import useQuery from '@/utils/use-query';
import useApprovalStateData from '@/components/manage-forms/edit/sidebar/approval-state/use-approval-state-data';

/*
 * ANCHOR - STEPS TO CREATE A NEW TYPE OF QUESTION:
 *
 * 1. In use-generate-sidebar-actions":
 *    Create a question button AND add a question switch case
 *    LINK: src/components/common/dashboard/FormBuilder/use-generate-sidebar-actions.tsx
 *
 * 2. In TForm component folder:
 *    If needed, create a new TForm subcomponent AND import it in the index file
 *    Make sure the component is prepared for both "answer" and "edit" mode
 *    LINK: src/components/common/dashboard/TForm/index.tsx
 *
 * 3. In form-renderer/index:
 *    Add the new type of question to the FieldType type declaration
 *    LINK: src/components/common/dashboard/form-renderer/index.tsx
 *
 * 4. In form-renderer/form-renderer-edit/index
 *    Add the if case to render the new type of question scenario (Edit Mode)
 *    LINK: src/components/common/dashboard/form-renderer/form-renderer-edit/index.tsx
 *
 * 5. In form-renderer/form-renderer-answer/index
 *    Add the if case to render the new type of question scenario (Answer Mode)
 *    LINK: src/components/common/dashboard/form-renderer/form-renderer-answer/index.tsx
 *
 * 6. In edit-toolbox/question-options/index:
 *    Add the necessary components to configure the question to the interface of question configuration
 *    LINK: src/components/common/dashboard/FormBuilder/edit-toolbox/question-options/index.tsx
 *
 * 7. In edit-toolbox/question-options/options/type-of-question:
 *    Add the new type of question to the type of question menu options
 *    If needed, also, add the necessary dependencies of that new type of question to the handleChange function
 *    LINK: src/components/common/dashboard/FormBuilder/edit-toolbox/question-options/options/type-of-question.tsx
 */

export default function Edit() {
  const { query, isReady, push } = useRouter();

  if (isReady && !query?.id) {
    push('/404');
  }

  if (isReady && query?.id && typeof query.id === 'string') {
    return <EditReady id={query.id} />;
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoaderPrimary />
    </Box>
  );
}

function EditReady({ id }: { id: string }) {
  const approvalData = useApprovalStateData(id);

  const [fields, setFields] = useState<FieldsArray>([]);
  const [defaultValues, setDefaultValues] = useState({});
  const [header, setHeader] = useState<IFormHeaderBaseProps | null>(null);

  const {
    response: header_response,
    isLoading: header_isLoading,
    error: header_error,
  } = useQueryImmutable(api.getFormInfo(id));

  const {
    response: info_response,
    isLoading: info_isLoading,
    error: info_error,
  } = useQuery(api.getFormInfo(id));

  const {
    response: questions_response,
    isLoading: questions_isLoading,
    error: questions_error,
  } = useQueryImmutable(api.getFormQuestions(id));

  //Debug: console.log(questions_response);

  useEffect(() => {
    if (questions_response?.data) {
      setFields(questions_response.data);
    }
  }, [questions_response]);

  useEffect(() => {
    if (header_response?.data && header === null) {
      setHeader({
        form_name: header_response.data?.title || '',
        form_description: header_response.data?.description || '',
      });
    }
  }, [header_response, header]);

  const formInstance: FormInstance = useInitForm({
    fieldsArray: fields,
    setFieldsArray: setFields,
    defaultValues: defaultValues,
  });

  const [tab, setTab] = useState<number>(0);
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [testMode, setTestMode] = useState<boolean>(false);

  const leftReady =
    !questions_isLoading &&
    !header_isLoading &&
    !questions_error &&
    !header_error;

  // Debug: console.log(questions_isLoading, header_isLoading, questions_error, header_error);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box sx={{ width: 'calc(100% - 60px)' }}>
        {leftReady ? (
          <React.Fragment>
            {tab === 0 && (
              <FormRenderer
                mode={
                  previewMode ? (testMode ? 'answer' : 'force-preview') : 'edit'
                }
                fieldsArray={fields}
                defaultValues={defaultValues}
                setFieldsArray={setFields}
                setDefaultValues={setDefaultValues}
                header={header}
                setHeader={setHeader}
                formInstance={formInstance}
                approvalData={approvalData}
              />
            )}
            {tab === 1 && (
              <FormRenderer
                mode={testMode ? 'answer' : 'force-preview-details'}
                fieldsArray={fields}
                defaultValues={defaultValues}
                header={header}
                formInstance={formInstance}
              />
            )}
            {tab === 3 && <DataModePage />}
          </React.Fragment>
        ) : (
          <Box
            sx={{
              flex: 1,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <LoaderPrimary />
          </Box>
        )}
      </Box>
      <Sidebar
        id={id}
        mode={tab}
        setMode={setTab}
        fields={fields}
        setFields={setFields}
        header={header}
        setDefaultValues={setDefaultValues}
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        testMode={testMode}
        setTestMode={setTestMode}
        approvalData={approvalData}
      />
    </Box>
  );
}

Edit.getLayout = (page: any) =>
  getDashboardLayout(page, {
    /*
    header: {
      title: 'Edit Form',
      rightText: 'Dashboard/Manage Forms/Edit Form',
    },
    */
  });

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // not compatible with getInitialProps
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}
