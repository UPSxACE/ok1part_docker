import { CheckCircle, Error } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'next-i18next';
import { styled } from '@mui/system';

const StyledForm = styled('form')((props) => ({
  maxWidth: props.fullWidth ? '100%' : 600,
  width: props.fullWidth ? '100%' : 'auto',
  padding: 25,
  paddingTop: 25,
  paddingBottom: 25,
  [props.theme.breakpoints.up('sm')]: {
    minWidth: 500,
  },
  [props.theme.breakpoints.up('md')]: {
    padding: 50,
    paddingTop: 50,
    paddingBottom: 50,
  },
  border: '1px solid #dadce0',
  borderRadius: 10,
  ...props.style,
}));

const Form = ({
  formDataState,
  autoFinalize,
  fullWidth = false,
  style = {},
  defaultValues = {},
  children,
  resetOnSuccess,
}) => {
  const { formData, setFormData } = formDataState;
  const [initialized, setInitialized] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const { t } = useTranslation();

  /* 
      Form status meanings:
      null = yet to be submited; 
      true = submited and success;
      other = submited and error(the error is set in the state);
    */

  useEffect(() => {
    if (!initialized) {
      let newFormData = { ...formData };

      // Initialize the "_filledFields" property if it didn't exist yet
      if (!newFormData['_filledFields']) newFormData['_filledFields'] = {};

      // Check if every field was initialized already
      Children.map(children, (formControl) => {
        // Check if children(that is supposed to be a Form Control component) has the prop field
        const field = formControl.props && formControl.props.field;

        // If it has the prop field defined, proceed to checking if its initialized
        if (field) {
          // If that field wasn't initialized yet, initialize it

          if (!formData[field]) {
            const newObject = {};
            newObject[field] = {
              value: defaultValues[field] ? defaultValues[field] : null, // Check if a default value was specified
              error: null,
              required: formControl.props.required ? true : false,
              matches: formControl.props.matches
                ? formControl.props.matches
                : null,
              matchesPassword: formControl.props.matchesPassword
                ? formControl.props.matchesPassword
                : null,
            };

            newFormData = { ...newFormData, ...newObject };
          }

          // Check if that field is already in the _filledFields object
          if (!newFormData['_filledFields'][field])
            newFormData['_filledFields'][field] = newFormData[field]['value']
              ? true
              : null;
        }
      });

      setFormData(newFormData);
    }
    setInitialized(true);
  }, []);

  if (formLoading) {
    return <StyledForm>LOADING...</StyledForm>;
  }

  if (initialized && formStatus === null) {
    return (
      <StyledForm fullWidth={fullWidth} style={style}>
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              // Pass down props
              formDataState,
              formStatusState: { formStatus, setFormStatus },
              formLoadingState: { formLoading, setFormLoading },
              autoFinalize,
              resetOnSuccess,
            });
          }
          return child;
        })}
      </StyledForm>
    );
  }

  if (initialized && formStatus === true) {
    return (
      <StyledForm fullWidth={fullWidth} style={style}>
        <Typography
          sx={{ textAlign: 'center', mb: 2 }}
          variant='h4'
          component='h1'
        >
          {t('register_submit_success_title')}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <CheckCircle sx={{ fontSize: 150, color: 'success.main' }} />
        </Box>

        <Typography
          sx={{ textAlign: 'center', mb: 2 }}
          variant='body'
          component='p'
        >
          {t('register_submit_success')}
        </Typography>
      </StyledForm>
    );
  }

  if (initialized) {
    // Error submitting form
    return (
      <StyledForm fullWidth={fullWidth} style={style}>
        <Typography
          sx={{ textAlign: 'center', mb: 2 }}
          variant='h4'
          component='h1'
        >
          {t('error_occurred')}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 2,
            minWidth: { sm: 150 },
          }}
        >
          <Error sx={{ fontSize: 150, color: 'error.main' }} />
        </Box>

        {typeof formStatus === 'string' ? (
          <Typography
            sx={{ textAlign: 'center', mb: 2 }}
            variant='body'
            component='p'
          >
            {formStatus}
          </Typography>
        ) : (
          <Typography
            sx={{ textAlign: 'center', mb: 2 }}
            variant='body'
            component='p'
          >
            {t('UNHANDLED_ERROR_DESCRIPTION')}
          </Typography>
        )}
        <Link
          href='#'
          onClick={() => {
            setFormStatus(null);
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            textDecoration: 'none',
          }}
        >
          <Typography variant='body1' component={'span'}>
            {t('form_try_again')}
          </Typography>
        </Link>
      </StyledForm>
    );
  }
};

export default Form;
