import { Box, Modal } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import TableActionButton from '@/components/common/dashboard/table-action-button';
import useModal from '@/utils/use-modal';
import useInitForm from '../common/dashboard/form-renderer/use-init-form';
import TForm from '../common/dashboard/TForm';
import api, { instance } from '@/api';
import { FamilyTableConfig } from './use-family-table';
import { UapTableConfig } from './use-uap-table';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function FamilyTable(
  props: FamilyTableConfig & {
    uap_table_data: UapTableConfig['uap_table_data'];
  }
) {
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
                .post(api.postNewFamily, {
                  uapName: formData.uapName,
                  familyName: formData.familyName,
                })
                .then((res) => {
                  props.family_mutate();
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
            <TForm.Select
              sx={{ paddingTop: 2 }}
              mode='answer'
              name='uapName'
              label={t('common:Uap')}
              errors={errors}
              propsFunction={generateFieldProps}
              options={
                props.uap_table_data.map((uapObj: any) => {
                  return {
                    id: uapObj.name,
                    label: uapObj.name,
                  };
                }) || []
              }
            />
            <TForm.ShortAnswer
              sx={{ paddingTop: 2 }}
              name='familyName'
              label={t('common:Family_Name')}
              mode='answer'
              errors={errors}
              propsFunction={generateFieldProps}
              disabled={!formData?.uapName}
            />
            <TForm.Submit disabled={!formData?.familyName} />
          </TForm.Form>
        </Box>
      </Modal>
      <MaterialReactTable
        key={String(props.family_is_loading)}
        data={props.family_table_data}
        columns={props.family_table_columns}
        initialState={{ pagination: { pageSize: 7, pageIndex: 0 } }}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <Box>
              <TableActionButton
                onClick={() => {
                  openModal();
                }}
                title={t('settings:new_family_button')}
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
