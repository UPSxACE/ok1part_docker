import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Dispatch, SetStateAction } from 'react';

export interface IFormHeaderBaseProps {
  form_name: string | null;
  form_description?: string | null;
}

export interface IFormHeaderAnswerProps extends IFormHeaderBaseProps {
  mode?: 'answer';
}
export interface IFormHeaderEditProps extends IFormHeaderBaseProps {
  mode: 'edit';
  setHeader: Dispatch<SetStateAction<IFormHeaderBaseProps | null>>;
}

export type FormHeaderProps = IFormHeaderAnswerProps | IFormHeaderEditProps;

export default function Header(props: FormHeaderProps) {
  const { form_name, form_description, mode = 'answer' } = props;
  if (mode === 'answer') {
    return (
      <Box>
        <Typography
          variant='h4'
          component={'h1'}
          sx={{ textAlign: 'left', paddingTop: 1, paddingBottom: 1.5 }}
        >
          {form_name || 'Untitled Form'}
        </Typography>
        {form_description && (
          <>
            <Divider variant='fullWidth' />
            <Typography
              variant='subtitle1'
              component={'h2'}
              sx={{ paddingTop: 1.5, paddingBottom: 1.5 }}
            >
              {form_description}
            </Typography>
          </>
        )}
      </Box>
    );
  }
  if (props.mode === 'edit') {
    return (
      <>
        <FormControl
          variant='standard'
          sx={{
            '&:not(:first-of-type)': { marginTop: 1.5 },
          }}
        >
          <TextField
            value={form_name || ''}
            variant='standard'
            id={'form_title'}
            sx={{ '& .MuiInputBase-input': { fontSize: 24 } }}
            label={'Form Title'}
            onChange={updateFormHeaderName}
          />
        </FormControl>
        <FormControl
          variant='standard'
          sx={{
            '&:not(:first-of-type)': { marginTop: 1.5 },
            marginBottom: 4,
          }}
        >
          <TextField
            value={form_description || ''}
            variant='standard'
            id={'form_description'}
            sx={{ '& .MuiInputBase-input': { fontSize: 24 } }}
            label={'Form Description'}
            onChange={updateFormHeaderDescription}
          />
        </FormControl>
      </>
    );
  }

  return <></>;

  // Functions...
  function updateFormHeaderName(e: React.ChangeEvent<HTMLInputElement>) {
    if (props.mode === 'edit') {
      const { setHeader } = props;
      const form_name: string = e.target.value;

      setHeader((headerObj) => Object.assign({}, headerObj, { form_name }));
    }
  }

  function updateFormHeaderDescription(e: React.ChangeEvent<HTMLInputElement>) {
    if (props.mode === 'edit') {
      const { setHeader } = props;
      const form_description: string = e.target.value;

      setHeader((headerObj) =>
        Object.assign({}, headerObj, { form_description })
      );
    }
  }
}
