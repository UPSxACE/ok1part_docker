import api from '@/api';
import useQuery from '@/utils/use-query';
import { useEffect, useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import { useTranslation } from 'next-i18next';

export type FamilyTableConfig = ReturnType<typeof useFamilyTable>;

export default function useFamilyTable() {
  const { t } = useTranslation();
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'family', //access nested data with dot notation
        header: t('common:Family_Name'),
      },
      {
        accessorKey: 'fkuap.name', //access nested data with dot notation
        header: t('common:Uap'),
      },
    ],
    []
  );

  const [tableData, setTableData] = useState([]);

  const { response, isLoading, error, mutate } = useQuery(api.getFamily);

  useEffect(() => {
    // NOTE: This useEffect is necessary to avoid issues related to the rendering of the MaterialTable component when,
    // for example, going back a page
    if (response) {
      setTableData(response?.data);
    }
  }, [response]);

  return {
    family_table_data: tableData,
    family_set_table_data: setTableData,
    family_table_columns: columns,
    family_response: response,
    family_is_loading: isLoading,
    family_error: error,
    family_mutate: mutate,
  };
}
