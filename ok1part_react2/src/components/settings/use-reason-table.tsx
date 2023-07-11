import api from '@/api';
import useQuery from '@/utils/use-query';
import { useEffect, useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import { useTranslation } from 'next-i18next';

export type ReasonTableConfig = ReturnType<typeof useReasonTable>;

export default function useReasonTable() {
  const { t } = useTranslation();
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'label', //access nested data with dot notation
        header: t('common:Reason_Name'),
      },
    ],
    []
  );

  const [tableData, setTableData] = useState([]);

  const { response, isLoading, error, mutate } = useQuery(api.getReasons);

  useEffect(() => {
    // NOTE: This useEffect is necessary to avoid issues related to the rendering of the MaterialTable component when,
    // for example, going back a page
    if (response) {
      setTableData(response?.data);
    }
  }, [response]);

  return {
    reason_table_data: tableData,
    reason_set_table_data: setTableData,
    reason_table_columns: columns,
    reason_response: response,
    reason_is_loading: isLoading,
    reason_error: error,
    reason_mutate: mutate,
  };
}
