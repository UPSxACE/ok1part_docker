import api from '@/api';
import useQuery from '@/utils/use-query';
import { useEffect, useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import { useTranslation } from 'next-i18next';

export type ShiftTableConfig = ReturnType<typeof useShiftTable>;

export default function useShiftTable() {
  const { t } = useTranslation();
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: t('common:Shift_Name'),
      },
    ],
    []
  );

  const [tableData, setTableData] = useState([]);

  const { response, isLoading, error, mutate } = useQuery(api.getShifts);

  useEffect(() => {
    // NOTE: This useEffect is necessary to avoid issues related to the rendering of the MaterialTable component when,
    // for example, going back a page
    if (response) {
      setTableData(response?.data);
    }
  }, [response]);

  return {
    shift_table_data: tableData,
    shift_set_table_data: setTableData,
    shift_table_columns: columns,
    shift_response: response,
    shift_is_loading: isLoading,
    shift_error: error,
    shift_mutate: mutate,
  };
}
