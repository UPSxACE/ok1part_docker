import api from '@/api';
import useQuery from '@/utils/use-query';
import { useEffect, useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import { useTranslation } from 'next-i18next';

export type UapTableConfig = ReturnType<typeof useUapTable>;

export default function useUapTable() {
  const { t } = useTranslation();

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: t('common:Uap_Name'),
      },
    ],
    []
  );

  const [tableData, setTableData] = useState([]);

  const { response, isLoading, error, mutate } = useQuery(api.getUap);

  useEffect(() => {
    // NOTE: This useEffect is necessary to avoid issues related to the rendering of the MaterialTable component when,
    // for example, going back a page
    if (response) {
      setTableData(response?.data);
    }
  }, [response]);

  return {
    uap_table_data: tableData,
    uap_set_table_data: setTableData,
    uap_table_columns: columns,
    uap_response: response,
    uap_is_loading: isLoading,
    uap_error: error,
    uap_mutate: mutate,
  };
}
