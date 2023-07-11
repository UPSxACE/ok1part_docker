import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MaterialReactTable from 'material-react-table';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import TableActionButton from '../../common/dashboard/table-action-button';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export default function MaterialTable(props: { data: any; columns: any }) {
  const { t } = useTranslation();

  return (
    <MaterialReactTable
      {...props}
      data={props.data}
      columns={props.columns}
      initialState={{ pagination: { pageSize: 7, pageIndex: 0 } }}
      renderTopToolbarCustomActions={({ table }) => {
        return (
          <Box>
            <Link href='/manage-forms/create'>
              <TableActionButton title={t('manage-forms:add_form_button')} />
            </Link>
          </Box>
        );

        return (
          <Box>
            <IconButton
              sx={{ p: 0, ml: 1.25, color: 'info.main' }}
              onClick={() => {}}
            >
              <Box
                sx={{
                  height: '40px',
                  width: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                  }}
                  variant={'h4'}
                  component='i'
                >
                  <FontAwesomeIcon icon={faFileCirclePlus} />
                </Typography>
              </Box>
            </IconButton>
          </Box>
        );
      }}
      muiTablePaperProps={{ sx: { boxShadow: 'none' } }}
      muiTablePaginationProps={{
        rowsPerPageOptions: [7, 10, 15, 20, 50, 75, 100],
      }}
      muiTableHeadRowProps={{
        sx: {
          boxShadow: 'none',
        },
      }}
      muiTableHeadCellProps={{
        sx: {
          borderBottomColor: '#cccccc',
        },
      }}
      muiTopToolbarProps={{
        sx: {
          height: '40px',
          minHeight: '40px',
          '& .MuiBox-root': {
            height: '40px',
            minHeight: '40px',
            padding: 0,
          },
          marginTop: 0.25,
          marginBottom: 1,
        },
      }}
      muiBottomToolbarProps={{
        sx: {
          boxShadow: 'none',
          borderTop: '1px solid #cccccc',
        },
      }}
    />
  );
}
