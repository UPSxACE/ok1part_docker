import Box from '@mui/material/Box';
import MaterialReactTable from 'material-react-table';
import TableActionButton from '../common/dashboard/table-action-button';
import { useTranslation } from 'next-i18next';

export default function SimplifiedMaterialTable(props: {
  data: any;
  columns: any;
}) {
  const { t } = useTranslation();

  return (
    <MaterialReactTable
      {...props}
      data={props.data}
      columns={props.columns}
      initialState={{
        pagination: {
          // TODO - Later, check if this is updated and rerendered as data.length changes
          pageSize: props.data.length > 0 ? props.data.length : 1,
          pageIndex: 0,
        },
      }}
      renderTopToolbarCustomActions={({ table }) => {
        return (
          <Box>
            <TableActionButton title={t('forms:add_form_button')} />
          </Box>
        );
      }}
      muiTablePaperProps={{ sx: { boxShadow: 'none' } }}
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
          display: 'none',
        },
      }}
      muiBottomToolbarProps={{
        sx: {
          display: 'none',
        },
      }}
      muiTablePaginationProps={{
        rowsPerPageOptions: [props.data.length > 0 ? props.data.length : 1],
      }}
    />
  );
}
