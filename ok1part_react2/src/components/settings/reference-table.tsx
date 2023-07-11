import { Box, Modal } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import TableActionButton from '@/components/common/dashboard/table-action-button';
import useModal from '@/utils/use-modal';
import useInitForm from '../common/dashboard/form-renderer/use-init-form';
import TForm from '../common/dashboard/TForm';
import api, { instance } from '@/api';
import { FamilyTableConfig } from './use-family-table';
import { UapTableConfig } from './use-uap-table';
import { ReferenceTableConfig } from './use-reference-table';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function ReferenceTable(
  props: ReferenceTableConfig & {
    uap_table_data: UapTableConfig['uap_table_data'];
  } & {
    family_table_data: FamilyTableConfig['family_table_data'];
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
                .post(api.postNewReference, {
                  uapName: formData.uapName,
                  familyName: formData.familyName,
                  referenceName: formData.referenceName,
                })
                .then((res) => {
                  props.reference_mutate();
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
              custom={{
                beforeUpdate: (updateField) => {
                  updateField('familyName', '', []);
                },
              }}
            />
            <TForm.Select
              sx={{ paddingTop: 2 }}
              name='familyName'
              label={t('common:Family')}
              mode='answer'
              errors={errors}
              propsFunction={generateFieldProps}
              options={
                props.family_table_data
                  .filter((familyObj: any) => {
                    return familyObj?.fkuap?.name === formData?.uapName;
                  })
                  .map((familyObj: any) => {
                    return {
                      id: familyObj.family,
                      label: familyObj.family,
                    };
                  }) || []
              }
              disabled={!formData?.uapName}
            />
            <TForm.ShortAnswer
              sx={{ paddingTop: 2 }}
              name='referenceName'
              label={t('common:Reference_Name')}
              mode='answer'
              errors={errors}
              propsFunction={generateFieldProps}
              disabled={!formData?.familyName}
            />
            <TForm.Submit disabled={!formData?.referenceName} />
          </TForm.Form>
        </Box>
      </Modal>
      <MaterialReactTable
        key={String(props.reference_is_loading)}
        data={props.reference_table_data}
        columns={props.reference_table_columns}
        initialState={{ pagination: { pageSize: 7, pageIndex: 0 } }}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <Box>
              <TableActionButton
                onClick={() => {
                  openModal();
                }}
                title={t('settings:new_reference_button')}
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
