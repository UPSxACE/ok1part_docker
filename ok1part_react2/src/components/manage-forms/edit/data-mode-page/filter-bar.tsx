import TForm from '@/components/common/dashboard/TForm';
import DashboardMiniWrapper from '@/components/common/dashboard/dashboard-mini-wrapper';
import { FieldsArray } from '@/components/common/dashboard/form-renderer';
import useInitForm from '@/components/common/dashboard/form-renderer/use-init-form';
import { ArrowForwardIosSharp } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import FilteredResultsTable from './filtered-results-table';

export default function FilterBar() {
  const fieldsArray: FieldsArray = [
    // NOTE - This is probably not necessary to be filled, since this form won't be rendered by a FormRenderer component
  ];
  const defaultValues = {};

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
  } = useInitForm({ fieldsArray: fieldsArray, defaultValues: defaultValues });

  return (
    <Accordion sx={{ boxShadow: 'none' }}>
      <AccordionSummary
        sx={{
          height: 48,
          minHeight: '0!important',
          '& .MuiAccordionSummary-expandIconWrapper': {
            transform: 'rotate(-90deg)',
          },
          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
          },
        }}
        expandIcon={
          <ArrowForwardIosSharp
            sx={{
              fontSize: '0.9rem',
              stroke: 'black',
              strokeWidth: '0.25px',
            }}
          />
        }
      >
        <Typography variant='body1' component='span'>
          FILTERS (0)
        </Typography>
      </AccordionSummary>
      <Divider sx={{ borderColor: '#cbcbcb' }} />
      <AccordionDetails>
        <TForm.Form id='search'>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minWidth: 300,
              }}
            >
              <TForm.Date
                small
                name='since'
                label='Since'
                mode='answer'
                errors={errors}
                currentValue={formData['since'] as string}
                updateFieldFunc={updateField}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minWidth: 300,
              }}
            >
              <TForm.Date
                small
                name='until'
                label='Until'
                mode='answer'
                errors={errors}
                currentValue={formData['until'] as string}
                updateFieldFunc={updateField}
              />
            </Box>
          </Box>
        </TForm.Form>
        {/*<Divider
              sx={{ borderColor: '#cbcbcb', marginX: -2, marginTop: 2 }}
            /> */}
        <FilteredResultsTable />
      </AccordionDetails>
    </Accordion>
  );
}
