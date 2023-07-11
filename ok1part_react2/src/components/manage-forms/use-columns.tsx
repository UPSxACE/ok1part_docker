import { useMemo } from 'react';
import TableActionButton from '../common/dashboard/table-action-button';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { type MRT_ColumnDef } from 'material-react-table';

export default function useColumns() {
  const { t } = useTranslation();

  return useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'title', //access nested data with dot notation
        header: t('common:Form_Name'),
      },
      {
        accessorKey: 'version', //access nested data with dot notation
        header: t('common:Version'),
        accessorFn: () => 'v1.0.0',
      },
      {
        accessorKey: 'reference.id.reference', //access nested data with dot notation
        header: t('common:Reference'),
      },

      {
        accessorKey: 'ownerForm.username', //access nested data with dot notation
        header: t('common:Editor'),
      },
      {
        accessorKey: 'state', //access nested data with dot notation
        header: t('common:Status'),
        accessorFn: (row) => {
          switch (row.state) {
            case 1:
              return 'In Creation';
            case 2:
              return 'Waiting for Approval';
            case 3:
              return 'Discarded';
            case 4:
              return 'Approved';
            case 5:
              return 'Obsolete';
          }
        },
      },
      {
        accessorKey: 'id', //access nested data with dot notation
        header: t('common:Action'),
        Cell: ({ cell, row }) => {
          return (
            <Link href={'/manage-forms/edit/' + cell.getValue()}>
              <TableActionButton title={t('manage-forms:edit_form_button')} />
            </Link>
          );
        },
      },
    ],
    []
  );
}
