import {
  Box,
  Button,
  FormHelperText,
  InputLabel,
  Typography,
} from '@mui/material';
import BootstrapInput from './bootstrap-input';
import { styled } from '@mui/system';
import { useState } from 'react';

const StyledForm = styled('form')((props) => ({
  maxWidth: '100%',
  width: '100%',
  padding: 25,
  paddingTop: 25,
  paddingBottom: 25,
  [props.theme.breakpoints.up('md')]: {
    padding: 50,
    paddingTop: 50,
    paddingBottom: 50,
  },
  border: '1px solid #dadce0',
  borderRadius: 10,
  display: 'flex',
  flexDirection: 'column',
  '&.success': {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  '&.error': {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  ...props.style,
}));

export default function BootstrapSingleInput({
  label,
  field,
  required = false,
  text,
}) {
  const [error, setError] = useState(false);

  return (
    <StyledForm>
      <InputLabel
        shrink
        color='info'
        htmlFor={field}
        sx={{
          '&': {
            position: 'initial',
            transform: 'none',
            paddingBottom: '2px',
          },
        }}
      >
        {required ? label + ' *' : label}
      </InputLabel>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <BootstrapInput id={field} field={field} />
        {error && <FormHelperText>{error}</FormHelperText>}
        {text && (
          <Typography sx={{ pl: 1 }} variant='h6' component='span'>
            {text}
          </Typography>
        )}
        <Button
          variant='contained'
          sx={{
            height: 45,
            fontSize: '1rem',
            width: 'auto',
            ml: 'auto',
          }}
          fullWidth
          onClick={() => {
            /*
            LOGIC YET TO BE IMPLEMENTED HERE 
            if (onSubmit) {
              async function handleSubmit() {
                await onSubmit(getFormDataValues());
              }

              setFormLoading(true);
              handleSubmit()
                .then((result) => {
                  if (onSuccess) onSuccess(result, setFormStatus);
                  if (autoFinalize) setFormStatus(true);
                  setFormLoading(false);
                })
                .catch((error) => {
                  if (onError) onError(error, setFormStatus);
                  if (autoFinalize) setFormStatus(error);
                  setFormLoading(false);
                });
            }*/
          }}
        >
          Save
        </Button>
      </Box>
    </StyledForm>
  );
}
