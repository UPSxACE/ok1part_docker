import api from '@/api';
import useQuery from '@/utils/use-query';
import { useEffect, useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import { useTranslation } from 'next-i18next';

export type ReferenceTableConfig = ReturnType<typeof useReferenceTable>;

export default function useReferenceTable() {
  const { t } = useTranslation();
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'id.reference', //access nested data with dot notation
        header: t('common:Reference_Name'),
      },
      {
        accessorKey: 'id.fkfamily', //access nested data with dot notation
        header: t('common:Family'),
      },
    ],
    []
  );

  const [tableData, setTableData] = useState([]);

  const { response, isLoading, error, mutate } = useQuery(
    api.getReferences('', '')
  );

  useEffect(() => {
    // NOTE: This useEffect is necessary to avoid issues related to the rendering of the MaterialTable component when,
    // for example, going back a page
    if (response) {
      setTableData(response?.data);
    }
  }, [response]);

  return {
    reference_table_data: tableData,
    reference_set_table_data: setTableData,
    reference_table_columns: columns,
    reference_response: response,
    reference_is_loading: isLoading,
    reference_error: error,
    reference_mutate: mutate,
  };
}
