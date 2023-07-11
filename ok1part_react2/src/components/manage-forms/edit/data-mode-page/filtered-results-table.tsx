import MaterialReactTable from 'material-react-table';

const data = [
  {
    name: 'John',
    version: 1.1,
    reason: 'Change of Shift',
    date: '01/05/2023 14:39',
    accinacc: 'Accurate',
    approved: 'Yes',
  },
  {
    name: 'Joe',
    version: 1.1,
    reason: 'Change of Shift',
    date: '01/05/2023 14:35',
    accinacc: 'Inaccurate',
    approved: 'Yes',
  },
  {
    name: 'Rita',
    version: 1.1,
    reason: 'Change of Shift',
    date: '01/05/2023 14:32',
    accinacc: 'Accurate',
    approved: 'Yes',
  },
  {
    name: 'Rui',
    version: 1.1,
    reason: 'Change of Shift',
    date: '01/05/2023 14:22',
    accinacc: 'Accurate',
    approved: 'Yes',
  },
  {
    name: 'Nathaniel',
    version: 1.1,
    reason: 'Change of Shift',
    date: '01/05/2023 14:10',
    accinacc: 'Inaccurate',
    approved: 'Yes',
  },
];
const columns = [
  {
    accessorKey: 'name', //access nested data with dot notation
    header: 'Operator Name',
  },
  {
    accessorKey: 'version', //access nested data with dot notation
    header: 'Form Version',
  },
  {
    accessorKey: 'reason', //access nested data with dot notation
    header: 'Reason',
  },
  {
    accessorKey: 'date', //access nested data with dot notation
    header: 'Date',
  },

  {
    accessorKey: 'accinacc', //access nested data with dot notation
    header: 'Accurate/Inaccurate',
  },
  {
    accessorKey: 'approved', //access nested data with dot notation
    header: 'Approved',
  },
];

export default function FilteredResultsTable() {
  const ready = true;

  return (
    <MaterialReactTable
      muiTableHeadRowProps={{ sx: { boxShadow: 'none' } }}
      muiTablePaperProps={{
        sx: { marginTop: 2, boxShadow: 'none' }, // , width: 0, flex: 1
      }}
      //    muiTableContainerProps={{
      //sx: { maxWidth: '100%', overflow: 'auto' },
      //}}
      key={String(ready)}
      data={data}
      columns={columns as any} // FIXME - figure out why typescript is pointing a type error
      enableRowSelection
    ></MaterialReactTable>
  );
}
