import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DashboardWrapper from '@/components/common/dashboard/dashboard-wrapper';
import LoaderPrimary from '@/components/common/loader-primary';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import FormsAnswerContent from '@/components/forms-answer/forms-answer-content';
import { IFormHeaderBaseProps } from '@/components/common/dashboard/TForm/header';
import { FieldsArray } from '@/components/common/dashboard/form-renderer';
import useQuery from '@/utils/use-query';
import api, { instance } from '@/api';
import { useContext, useState } from 'react';
import DashboardLayout from '@/layouts/dashboard-layout';
import useQueryImmutable from '@/utils/use-query-immutable';
import DashboardMiniWrapper from '@/components/common/dashboard/dashboard-mini-wrapper';
import { Alert, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { AuthenticationContext } from '@/contexts/authentication-context';
import TForm from '@/components/common/dashboard/TForm';
import useInitForm from '@/components/common/dashboard/form-renderer/use-init-form';
import { useTranslation } from 'next-i18next';

export default function Forms() {
  const { t } = useTranslation();

  const { query, isReady } = useRouter();

  const layoutConfig = {
    header: Boolean(!query?.id && isReady)
      ? {
          title: 'Forms',
          rightText: 'Dashboard/Forms',
        }
      : undefined,
    sx: Boolean(!isReady || query?.id)
      ? { sx: { alignItems: 'center', paddingY: 8 } }
      : undefined,
  };

  function getContent() {
    if (!isReady) {
      return (
        <Box
          sx={{
            flex: 1,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DashboardMiniWrapper sx={{ flex: 0 }}>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                p: 6,
              }}
            >
              <LoaderPrimary />
            </Box>
          </DashboardMiniWrapper>
        </Box>
      );
    }

    if (!query?.id) {
      return <FormsIndex />;
    } else {
      return (
        <FormsAnswer id={query.id} reason={query.reason} shift={query.shift} />
      );
    }
  }

  return <DashboardLayout {...layoutConfig}>{getContent()}</DashboardLayout>;
}

function FormsIndex() {
  const { t } = useTranslation();

  const { error, isLoading, response } = useQuery(api.getFamily);
  const {
    error: reference_error,
    isLoading: reference_isLoading,
    response: reference_response,
  } = useQuery(api.getReferences('', ''));

  const {
    error: reason_error,
    isLoading: reason_isLoading,
    response: reason_response,
  } = useQuery(api.getReasons);

  const {
    error: shift_error,
    isLoading: shift_isLoading,
    response: shift_response,
  } = useQuery(api.getShifts);

  const [foundForm, setFoundForm] = useState<null | false | Number>(null);

  const { formData, errors, generateFieldProps, resetForm } = useInitForm({
    fieldsArray: [],
  });

  const router = useRouter();

  if (foundForm !== null) {
    if (!formData?.referenceName) {
      setFoundForm(null);
    }
  }

  const notReady =
    isLoading ||
    error ||
    reference_isLoading ||
    reference_error ||
    reason_isLoading ||
    reason_error ||
    shift_isLoading ||
    shift_error;

  if (notReady) {
    return (
      <DashboardWrapper>
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoaderPrimary />
        </Box>
      </DashboardWrapper>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //padding: { xs: 2, sm: 8, md: 14 },
      }}
    >
      <Box
        sx={{
          border: '1px solid #dadce0',
          minWidth: { xs: 0, sm: 500, lg: 600 },
          maxWidth: 600,
          padding: { xs: 4, sm: 6 },
          paddingY: { xs: 3, sm: 4 },
          backgroundColor: 'white',
          borderRadius: 2,
          position: 'relative',
        }}
      >
        <TForm.Form
          onSubmit={() => {
            router.push(
              `/forms/${foundForm}?reason=${formData.reasonName}&shift=${formData.shiftName}`
            );
          }}
        >
          <Box>
            <Typography
              sx={{ textAlign: 'center' }}
              variant='h4'
              component='h1'
            >
              {t('forms:title_select_form')}
            </Typography>
          </Box>
          {foundForm === false && (
            <Alert severity='error' sx={{ mt: 1.5 }}>
              {t('forms:alert_no_avaliable_form')}
            </Alert>
          )}
          <TForm.Select
            sx={{ paddingTop: 2 }}
            name='familyName'
            label={t('common:Family')}
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
            label={t('common:Reference')}
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
            custom={{
              getValueOnChange: (value) => {
                if (value) {
                  instance
                    .get(
                      api.getFormByFamilyReferenceState(
                        String(formData?.familyName),
                        value,
                        4
                      )
                    )
                    .then((res) => {
                      //Debug: console.log(res.data);
                      if (res?.data?.[0]) {
                        setFoundForm(res?.data[0]?.id);
                        return;
                      }
                      setFoundForm(false);
                    })
                    .catch(() => {});
                }
              },
            }}
            disabled={!formData?.familyName}
          />
          <TForm.Select
            sx={{ paddingTop: 2 }}
            name='shiftName'
            label={t('common:Shift')}
            mode='answer'
            errors={errors}
            propsFunction={generateFieldProps}
            options={
              shift_response?.data?.map((shiftObj: any) => {
                return {
                  id: shiftObj.name,
                  label: shiftObj.name,
                };
              }) || []
            }
            disabled={!foundForm}
          />
          <TForm.Select
            sx={{ paddingTop: 2 }}
            name='reasonName'
            label={t('common:Reason')}
            mode='answer'
            errors={errors}
            propsFunction={generateFieldProps}
            options={
              reason_response?.data?.map((reasonObj: any) => {
                return {
                  id: reasonObj.label,
                  label: reasonObj.label,
                };
              }) || []
            }
            disabled={!foundForm}
          />
          <TForm.Submit
            sx={{ width: '100%', height: 44, mt: 2.5 }}
            disabled={
              !foundForm || !formData?.reasonName || !formData?.shiftName
            }
            title={t('forms:submit_button_answer_form')}
          />
        </TForm.Form>
      </Box>
    </Box>
  );
}

function FormsAnswer({
  id,
  reason,
  shift,
}: {
  id: string | string[];
  reason: string | string[] | undefined;
  shift: string | string[] | undefined;
}) {
  const { t } = useTranslation();

  const [submitState, setSubmitState] = useState<null | Boolean>(null); // false -> submiting, true -> submited
  const router = useRouter();

  const formId = typeof id === 'string' ? id : id?.[0] || null;
  const reason_ = typeof reason === 'string' ? reason : reason?.[0] || null;
  const shift_ = typeof shift === 'string' ? shift : shift?.[0] || null;

  const {
    response: info_response,
    isLoading: info_isLoading,
    error: info_error,
  } = useQueryImmutable(api.getFormInfo(formId || ''));

  const {
    response: questions_response,
    isLoading: questions_isLoading,
    error: questions_error,
  } = useQueryImmutable(api.getFormQuestions(formId || ''));

  const header: IFormHeaderBaseProps = {
    form_name: info_response?.data?.title,
    form_description: info_response?.data?.description,
  };

  const fields: FieldsArray = questions_response?.data;

  const defaultValues = {};

  const auth = useContext(AuthenticationContext);

  if (
    info_isLoading ||
    questions_isLoading ||
    info_error ||
    questions_error ||
    !reason_ ||
    !shift_ ||
    !formId
  ) {
    return (
      <Box
        sx={{
          flex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <DashboardMiniWrapper sx={{ flex: 0 }}>
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              p: 6,
            }}
          >
            <LoaderPrimary />
          </Box>
        </DashboardMiniWrapper>
      </Box>
    );
  }

  if (submitState === false) {
    return (
      <Box
        sx={{
          flex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <DashboardMiniWrapper sx={{ flex: 0 }}>
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              p: 6,
            }}
          >
            <LoaderPrimary />
          </Box>
        </DashboardMiniWrapper>
      </Box>
    );
  }

  if (submitState === true) {
    return (
      <Box
        sx={{
          flex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <DashboardMiniWrapper sx={{ flex: 'initial' }}>
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              p: 4,
              pb: 3,
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <CheckCircle sx={{ fontSize: 150, color: 'success.main' }} />
            </Box>

            <Typography
              sx={{ textAlign: 'center', mb: 2 }}
              variant='h4'
              component='h1'
            >
              {t('forms:message_answer_submitted_success')}
            </Typography>

            <a
              href=''
              onClick={() => {
                router.reload();
              }}
            >
              <Typography
                sx={{ textAlign: 'center', mb: 2 }}
                variant='body1'
                component='p'
                color='#107715'
              >
                {t('forms:button_submit_another_answer')}
              </Typography>
            </a>
          </Box>
        </DashboardMiniWrapper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <DashboardWrapper
        sx={{
          maxWidth: 900,
          alignItems: 'center',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          border: 'none',
        }}
      >
        <FormsAnswerContent
          header={header}
          fields={fields}
          defaultValues={defaultValues}
          onSubmit={(formInstance, formatedData) => {
            setSubmitState(false);
            instance
              .post(api.postFormAnswer(formId), {
                reasonName: reason_,
                shiftName: shift_,
                formResult: true,
                formData: formatedData,
              })
              .then(() => {
                setSubmitState(true);
              })
              .catch((err) => {
                if (err?.response?.status === 401) {
                  router.push('/login');
                }
              });
          }}
        />
      </DashboardWrapper>
    </Box>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // not compatible with getInitialProps
      ...(await serverSideTranslations(locale, ['common', 'forms'])),
      // Will be passed to the page component as props
    },
  };
}
