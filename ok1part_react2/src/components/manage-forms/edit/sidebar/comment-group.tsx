import { Avatar, Box, Chip, Typography } from '@mui/material';

import FadeBox from './fade-box';
import { ApprovalStateDataInstance } from './approval-state/use-approval-state-data';
import useQuery from '@/utils/use-query';
import { ApiFormComments } from '@/api';

export default function CommentGroup({
  commentsState,
  id,
  data,
}: {
  commentsState: ReturnType<typeof useQuery>;
  id: number;
  data: ApprovalStateDataInstance;
}) {
  const {
    response: comments_response,
    isLoading: comments_isLoading,
    error: comments_error,
    mutate: comments_mutate,
  } = commentsState;

  const comments_data_parse = comments_response?.data
    ? (comments_response?.data as ApiFormComments) // NOTE: Apparently either axios or spring automatically parses the string to JSON
    : null;

  const comments_data = comments_data_parse || null || [];

  return (
    <FadeBox style={{ boxShadow: 'none' }}>
      {(comments_data[id]?.comments || []).map((comment, index) => {
        return (
          <Box
            sx={{
              display: 'flex',
              p: 1,
              '&:not(:last-of-type)': {
                borderBottom: '1px solid #0000003b',
              },
            }}
            key={index}
          >
            <Box>
              <Avatar />
            </Box>
            <Box sx={{ pl: 1, width: '100%' }}>
              <Box sx={{ display: 'flex', width: '100%' }}>
                <Typography component='h2' variant='body2' fontWeight={500}>
                  {comment.username}
                </Typography>
                <Typography
                  component='h2'
                  variant='body2'
                  fontWeight={500}
                  sx={{ marginLeft: 'auto' }}
                >
                  16/05/2023, 09:47
                </Typography>
              </Box>
              <Typography component='p' variant='body2' sx={{ mb: 0.5 }}>
                {comment.message}
              </Typography>
              <Box sx={{ display: 'flex' }}>
                {comment.status === 1 && false && (
                  <Chip
                    variant='filled'
                    size='small'
                    label={'Comment'}
                    color={'info'}
                    sx={{ ml: 'auto' }}
                  />
                )}
                {comment.status === 2 && (
                  <Chip
                    variant='filled'
                    size='small'
                    label={'Rejection'}
                    color={'error'}
                    sx={{ ml: 'auto' }}
                  />
                )}
                {comment.status === 3 && (
                  <Chip
                    variant='filled'
                    size='small'
                    label={'Reviewed'}
                    color={'warning'}
                    sx={{ ml: 'auto' }}
                  />
                )}

                {comment.status === 4 && (
                  <Chip
                    variant='filled'
                    size='small'
                    label={'Approved'}
                    color={'success'}
                    sx={{ ml: 'auto' }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        );
      })}
    </FadeBox>
  );
}
