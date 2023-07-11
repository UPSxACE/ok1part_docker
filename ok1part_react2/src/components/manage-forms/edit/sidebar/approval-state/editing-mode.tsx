import { Box, TextField, Typography } from '@mui/material';
import ButtonDashboard from '@/components/common/dashboard/button-dashboard';
import { Add } from '@mui/icons-material';
import { IAprovalStateProps } from '.';
import generateRandomHash from '@/utils/generate-random-hash';
import api, { ApiFormComments, instance } from '@/api';
import { useContext } from 'react';
import { AuthenticationContext } from '@/contexts/authentication-context';

export default function EditingMode(props: IAprovalStateProps) {
  const {
    data,
    textfieldValue,
    setTextfieldValue,
    commentsState,
    // setScrollToEnd, // FIXME - Deprecated concept
  } = props;

  const {
    response: comments_response,
    isLoading: comments_isLoading,
    error: comments_error,
    mutate: comments_mutate,
  } = commentsState;

  // Debug: console.log(comments_response);

  const comments_data_parse = comments_response?.data
    ? (comments_response?.data as ApiFormComments) // NOTE: Apparently either axios or spring automatically parses the string to JSON
    : null;

  const comments_data = comments_data_parse || null || [];

  const auth = useContext(AuthenticationContext);

  function newComment() {
    const value = textfieldValue?.trimStart() || '';
    if (value) {
      comments_mutate().then(() => {
        if (comments_data) {
          const newCommentsData: ApiFormComments = Object.assign(
            [],
            comments_data
          );

          newCommentsData.unshift({
            id: generateRandomHash('section_by_' + auth?.value?.username, 8),
            username: auth?.value?.username || '',
            status: 1,
            comments: [
              {
                id: generateRandomHash(
                  'message_by_' + auth?.value?.username,
                  8
                ),
                username: auth?.value?.username || '',
                date: new Date(),
                message: value,
                status: 1,
              },
            ],
          });

          instance
            .patch(api.patchFormComments(props.formId), {
              comments: JSON.stringify(newCommentsData),
            })
            .then((res) => {
              comments_mutate();
            })
            .catch((err) => {});
        }
      });
      setTextfieldValue('');
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant='body1'
        component='h1'
        sx={{ fontWeight: 500, fontSize: '1.05rem', mb: 0.25 }}
      >
        Add Comment
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          value={textfieldValue}
          onChange={(e) => {
            const value = e.target.value;
            setTextfieldValue(value);
          }}
          multiline
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-input': {
              minHeight: '56px',
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',

            gap: 1,
          }}
        >
          <ButtonDashboard
            size='small'
            variant='contained'
            color='info'
            sx={{ height: '88px' }}
            onClick={newComment}
          >
            <Add />
          </ButtonDashboard>
        </Box>
      </Box>
    </Box>
  );
}
