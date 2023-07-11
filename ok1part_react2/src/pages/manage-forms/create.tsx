import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getDashboardLayout from '@/utils/get-dashboard-layout';
import Box from '@mui/material/Box';
import DashboardWrapper from '@/components/common/dashboard/dashboard-wrapper';
import TForm from '@/components/common/dashboard/TForm';
import useInitForm from '@/components/common/dashboard/form-renderer/use-init-form';
import { useRouter } from 'next/router';
import api, { instance } from '@/api';
import useQuery from '@/utils/use-query';
import { useContext } from 'react';
import { AuthenticationContext } from '@/contexts/authentication-context';

export default function CreateForm() {
  const {
    formData,
    errors,
    addError,
    validation,
    generateFieldProps,
    generateTextHelperProps,
    onSubmit,
    currentQuestion,
    nextQuestion,
    previousQuestion,
    updateField,
  } = useInitForm({ fieldsArray: [], defaultValues: {} });

  const router = useRouter();

  const { error, isLoading, response } = useQuery(api.getFamily);
  const {
    error: reference_error,
    isLoading: reference_isLoading,
    response: reference_response,
  } = useQuery(api.getReferences('', ''));

  /*
  function getReferenceOptions() {
    return ((response?.data as ApiReferenceAll) || []).map((reference) => ({
      id: reference.id.reference,
      label: reference.id.reference,
    }));
  }*/

  const auth = useContext(AuthenticationContext);

  return (
    <DashboardWrapper>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          paddingX: 1,
        }}
      >
        <TForm.Form
          onSubmit={() => {
            instance
              .post(api.postNewForm, {
                familyName: formData?.familyName,
                referenceName: formData?.referenceName,
                title: formData.formName,
                //description: formData.formDescription,
              })
              .then((res) => {
                onSubmit();
                if (res?.data?.id) {
                  router.push(`/manage-forms/edit/${res.data.id}`);
                } else {
                  // Debug: console.log(res);
                }
              })
              .catch((err) => {
                if (err?.response?.status === 401) {
                  router.push('/login');
                }
              });
          }}
        >
          <TForm.Header form_name={'Setup a new form'} />
          <TForm.ShortAnswer
            sx={{ paddingTop: 2 }}
            name='formName'
            label='Form Name'
            mode='answer'
            errors={errors}
            propsFunction={generateFieldProps}
          />
          <TForm.Select
            sx={{ paddingTop: 2 }}
            name='familyName'
            label='Family'
            mode='answer'
            errors={errors}
            propsFunction={generateFieldProps}
            custom={{
              beforeUpdate: (updateField) => {
                updateField('referenceName', '', []);
              },
            }}
            options={
              response?.data?.map((familyObj: any) => {
                return {
                  id: familyObj.family,
                  label: familyObj.family,
                };
              }) || []
            }
          />
          <TForm.Select
            sx={{ paddingTop: 2 }}
            name='referenceName'
            label='Reference'
            mode='answer'
            errors={errors}
            propsFunction={generateFieldProps}
            options={
              reference_response?.data
                ?.filter((referenceObj: any) => {
                  return referenceObj?.id?.fkfamily === formData?.familyName;
                })
                .map((referenceObj: any) => {
                  return {
                    id: referenceObj.id.reference,
                    label: referenceObj.id.reference,
                  };
                }) || []
            }
            disabled={!formData?.familyName}
          />
          {/* <TForm.Select
            sx={{ paddingTop: 2 }}
            mode='answer'
            name='reason'
            label='Reason'
            errors={errors}
            propsFunction={generateFieldProps}
            options={[
              { name: 'reason1', label: 'Reason 1' },
              { name: 'reason2', label: 'Reason 2' },
              { name: 'reason3', label: 'Reason 3' },
              { name: 'reason4', label: 'Reason 4' },
            ]}
          />*/}
          <TForm.Submit />
        </TForm.Form>
      </Box>
    </DashboardWrapper>
  );
}

CreateForm.getLayout = (page: any) =>
  getDashboardLayout(page, {
    /*
    header: {
      title: 'Create Form',
      rightText: 'Dashboard/Manage Forms/Create Form',
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
