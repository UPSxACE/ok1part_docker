import { Box, Modal } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import TableActionButton from '@/components/common/dashboard/table-action-button';
import useModal from '@/utils/use-modal';
import useInitForm from '../common/dashboard/form-renderer/use-init-form';
import TForm from '../common/dashboard/TForm';
import api, { instance } from '@/api';
import { ShiftTableConfig } from './use-shift-table';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function ShiftTable(props: ShiftTableConfig) {
  const router = useRouter();
  const { t } = useTranslation();

  const { visible, openModal, closeModal, modalStyle } = useModal();

  const { formData, errors, generateFieldProps, resetForm } = useInitForm({
    fieldsArray: [],
  });

  return (
    <>
      <Modal open={visible} onClose={closeModal}>
        <Box sx={modalStyle}>
          <TForm.Form
            onSubmit={() => {
              instance
                .post(api.postNewShift, {
                  name: formData.shiftName,
                })
                .then((res) => {
                  props.shift_mutate();
                  closeModal();
                  resetForm();
                })
                .catch((err) => {
                  if (err?.response?.status === 401) {
                    router.push('/login');
                  }
                });
            }}
          >
            <TForm.ShortAnswer
              sx={{ paddingTop: 2 }}
              name='shiftName'
              label={t('common:Shift_Name')}
              mode='answer'
              errors={errors}
              propsFunction={generateFieldProps}
            />
            <TForm.Submit disabled={!formData?.shiftName} />
          </TForm.Form>
        </Box>
      </Modal>
      <MaterialReactTable
        key={String(props.shift_is_loading)}
        data={props.shift_table_data}
        columns={props.shift_table_columns}
        initialState={{ pagination: { pageSize: 7, pageIndex: 0 } }}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <Box>
              <TableActionButton
                onClick={() => {
                  openModal();
                }}
                title={t('settings:new_shift_button')}
              />
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
        muiBottomToolbarProps={{
          sx: {
            boxShadow: 'none',
            borderTop: '1px solid #cccccc',
          },
        }}
      />
    </>
  );
}
