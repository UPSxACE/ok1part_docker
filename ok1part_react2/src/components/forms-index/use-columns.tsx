import convertDateFromDb from '@/utils/convert-date-from-db';
import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';

export default function useColumns() {
  const { t } = useTranslation();

  return useMemo(
    () => [
      {
        accessorKey: 'fkform.title', //access nested data with dot notation
        header: t('common:Form_Name'),
      },
      {
        header: t('common:Operator_Username'),
        accessorFn: (row: any) =>
          row?.fkopreply ? row.fkopreply.username : 'anonymous',
      },
      {
        accessorKey: 'fkform.reference.id.fkfamily', //access nested data with dot notation
        header: t('common:Family'),
      },
      {
        accessorKey: 'fkform.reference.id.reference', //access nested data with dot notation
        header: t('common:Reference'),
      },
      {
        accessorKey: 'fkshift.name', //access nested data with dot notation
        header: t('common:Shift'),
      },
      {
        accessorKey: 'fkreason.label', //access nested data with dot notation
        header: t('common:Reason'),
      },
      {
        header: t('common:Date/Time'),
        accessorFn: (row: any) => convertDateFromDb(row.dcreation),
      },
      /*
      {
        accessorKey: 'id', //access nested data with dot notation
        header: 'Answer',
        Cell: ({ cell, row }) => {
          return (
            <Link href={'/forms/' + cell.getValue()}>
              <TableActionButton title='answer_form_button' />
            </Link>
          );
        },
      } as { Cell: (...args: any[]) => any },
      */
    ],
    []
  );
}
