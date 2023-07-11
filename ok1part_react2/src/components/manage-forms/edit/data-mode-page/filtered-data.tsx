import { Box } from '@mui/material';
import ReasonPercentageChart from './graphs/reason-percentage-chart';
import AnswersByDateChart from './graphs/answers-by-date-chart';

export default function FilteredData() {
  return (
    <Box
      sx={{
        '& text': {
          fill: 'black!important',
          fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        },
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        mt: 2,
      }}
    >
      {/* NOTE: Experimental ClientSideGauge 
      // TODO: Test it better later
      <ClientSideGauge delay={150} randomizer={3} />
      */}
      <ReasonPercentageChart />
      <ReasonPercentageChart />
      <AnswersByDateChart />
    </Box>
  );
}
