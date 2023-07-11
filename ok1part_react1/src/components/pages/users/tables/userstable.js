import LoadingModalWrapper from '@/components/loading-modal-wrapper';
import { Cancel, Edit, PersonAdd, Save } from '@mui/icons-material';
import { Box, Button, IconButton } from '@mui/material';
import axios from 'axios';
import MaterialReactTable from 'material-react-table';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import NewUserFormModal from '../forms/newuserformmodal';
import Image from 'next/image';
import useHandle403 from '@/utils/handle-403';
import api from '@/api';
import LoaderPrimary from '@/components/loader-primary';
import BulkAddRoleModal from '../forms/bulkaddrolemodal';
import {
  useWarningListModal,
  WarningListModal,
} from '@/components/warning-list-modal';
import BulkRemoveRoleModal from '../forms/bulkremoverolemodal';

export default function UsersTable() {
  const [open, setOpen] = useState(false);
  const [closeable, setCloseable] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openWaiting, setOpenWaiting] = useState(false);
  const handleOpenWaiting = () => setOpenWaiting(true);
  const handleCloseWaiting = () => setOpenWaiting(false);

  const [bulkAddOpen, setBulkAddOpen] = useState(false);
  const handleOpenBulkAdd = () => setBulkAddOpen(true);
  const handleCloseBulkAdd = () => setBulkAddOpen(false);

  const [bulkRemoveOpen, setBulkRemoveOpen] = useState(false);
  const handleOpenBulkRemove = () => setBulkRemoveOpen(true);
  const handleCloseBulkRemove = () => setBulkRemoveOpen(false);

  const tableRef = useRef(null);

  const { t } = useTranslation();

  const [data, setData] = useState(false); // false means the data needed didn't arrive yet

  const [dataChanges, setDataChanges] = useState(false);

  const [dataArrived, setDataArrived] = useState(false);

  const handle403 = useHandle403();

  const warningListModalProps = useWarningListModal();
  const { addWarning, addSuccess, openWarnings } = warningListModalProps;
  const bulkProps = { addWarning, addSuccess, openWarnings };

  const [rolesData, setRolesData] = useState(0);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const sendRequest = async () => {
      await api
        .getUsers({
          cancelToken: source.token,
        })
        .then((response) => {
          const data = response?.data;
          if (data) {
            setData(data);
          }
        })
        .catch((error) => {
          handle403(error);

          if (error?.response?.status === 404) {
            setData([]);
            setDataChanges([]);
          }
        });
    };

    sendRequest();

    return () => {
      source.cancel('Component Unmounted', { silent: 'true' }); // Component Unmounted
    };
  }, []);

  useEffect(() => {
    if (data !== false) {
      setDataArrived(true);
    }
  }, [data]);

  function handleNewCellEdit(cell, value) {
    //cell.column.id = the name of the field that is being edited

    const updateDataChanges = [...dataChanges];
    updateDataChanges[cell.row.index][cell.column.id] = value;
    setDataChanges([...updateDataChanges]);
  }

  function saveEdits(row_index, exitEditMode) {
    // set WAIT modal
    handleOpenWaiting();

    setData(dataChanges);
    // use row_index to know which row was edited, and send a request to update ONLY that entry(by accessing data[row_index].id)
    // ...

    // send request

    const sendRequest = async () => {
      await axios.post('http://localhost:9000/test/formdata', data[row_index], {
        //headers: { 'Content-Type': 'multipart/form-data' },
      });
    };

    sendRequest()
      .then(() => {
        // if successeful close edit mode
        exitEditMode();
      })
      .catch((err) => {})
      .finally(() => {
        // set WAIT modal false
        handleCloseWaiting();
      });
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'username', //access nested data with dot notation
        header: 'Username',
      },
      {
        accessorKey: 'profile.firstName', //access nested data with dot notation
        header: 'Name',
      },
      {
        accessorKey: 'email', //access nested data with dot notation
        header: 'Email',
      },
      {
        // accessorKey: 'role', //access nested data with dot notation
        header: 'Permissions',
        accessorFn: (row) => {
          let rolesArray = [];
          for (const [key, val] of Object.entries(row.permissions)) {
            if (key != 'id' && key != 'canFrontend' && val === true) {
              rolesArray.push(t(key));
            }
          }

          let roles = '';
          rolesArray.forEach((role, index) => {
            if (index !== 0) {
              roles += ', ' + role;
              return;
            }
            roles += role;
          });
          return roles;
        },
      },
      /*valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,*/
      //{const rolesArray = [] let roles = "" rolesArray.forEach((role, index) => if(index !== 0){roles+=", " + role return;} roles+=role)}
    ],
    []
  );

  const [rowSelection, setRowSelection] = useState({});
  const [secondaryButtonsEnabled, setSecondaryButtonsEnabled] = useState(false);

  useEffect(() => {
    if (Object.keys(rowSelection).length > 0) {
      setSecondaryButtonsEnabled(true);
    } else {
      if (secondaryButtonsEnabled) setSecondaryButtonsEnabled(false);
    }
  }, [rowSelection]);

  if (!dataArrived) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 2,
        }}
      >
        <LoaderPrimary />
      </Box>
    );
  }

  return (
    <LoadingModalWrapper open={openWaiting}>
      <WarningListModal {...warningListModalProps} />

      <NewUserFormModal
        open={open}
        handleClose={handleClose}
        closeable={closeable}
        setCloseable={setCloseable}
        dataState={{ data, setData }}
        dataChangesState={{ dataChanges, setDataChanges }}
      />

      <BulkAddRoleModal
        open={bulkAddOpen}
        handleClose={handleCloseBulkAdd}
        closeable={closeable}
        setCloseable={setCloseable}
        dataState={{ data, setData }}
        dataChangesState={{ dataChanges, setDataChanges }}
        selectedRows={rowSelection}
        {...bulkProps}
      />

      <BulkRemoveRoleModal
        open={bulkRemoveOpen}
        handleClose={handleCloseBulkRemove}
        closeable={closeable}
        setCloseable={setCloseable}
        dataState={{ data, setData }}
        dataChangesState={{ dataChanges, setDataChanges }}
        selectedRows={rowSelection}
        {...bulkProps}
      />

      <MaterialReactTable
        key={dataArrived}
        // Row selection code
        enableRowSelection
        onRowSelectionChange={setRowSelection}
        state={{ rowSelection }}
        //
        autoResetPageIndex={false} // must keep an eye on this
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <Box>
              <IconButton
                color='green'
                sx={{ pl: 1.25, color: 'info.main' }}
                onClick={() => handleOpen()}
              >
                <PersonAdd />
              </IconButton>

              <IconButton
                sx={{ color: 'success.main' }}
                onClick={() => handleOpenBulkAdd()}
                disabled={!secondaryButtonsEnabled}
                //disableRipple={!secondaryButtonsEnabled}
              >
                <Image
                  height={20}
                  width={20}
                  alt='Add permissions button'
                  style={{
                    filter: secondaryButtonsEnabled
                      ? 'brightness(0) saturate(100%) invert(36%) sepia(57%) saturate(507%) hue-rotate(74deg) brightness(98%) contrast(95%)'
                      : 'brightness(0) saturate(100%) invert(45%) sepia(3%) saturate(29%) hue-rotate(321deg) brightness(101%) contrast(89%)',
                  }}
                  src={'/add-permission.svg'}
                />
              </IconButton>
              <IconButton
                sx={{ color: 'error.main' }}
                onClick={() => handleOpenBulkRemove()}
                disabled={!secondaryButtonsEnabled}
                //disableRipple={!secondaryButtonsEnabled}
              >
                <Image
                  height={20}
                  width={20}
                  alt='Remove permissions button'
                  style={{
                    filter: secondaryButtonsEnabled
                      ? 'brightness(0) saturate(100%) invert(29%) sepia(61%) saturate(3943%) hue-rotate(347deg) brightness(88%) contrast(86%)'
                      : 'brightness(0) saturate(100%) invert(45%) sepia(3%) saturate(29%) hue-rotate(321deg) brightness(101%) contrast(89%)',
                  }}
                  src={'/permission-deletion.svg'}
                />
              </IconButton>
            </Box>
          );

          // Old Code
          return (
            <Button variant='contained' onClick={() => handleOpen()}>
              {t('users_table_add_user')}
            </Button>
          );
        }}
        initialState={{ pagination: { pageSize: 7 } }}
        muiTablePaperProps={{
          style: { borderRadius: 4, overflow: 'hidden' },
        }}
        muiTableHeadCellProps={{ sx: { color: 'text.secondary' } }}
        muiTableBodyCellProps={{ sx: { color: 'text.secondary' } }}
        muiTablePaginationProps={{
          sx: { color: 'text.secondary' },
          rowsPerPageOptions: [7, 10, 15, 20, 50, 75, 100],
        }}
        data={data}
        columns={columns}
        muiTableBodyCellEditTextFieldProps={({ cell }) => {
          return {
            disabled: cell.column.columnDef.readOnly,
            onChange: (event) => {
              if (!cell.column.columnDef.readOnly) {
                handleNewCellEdit(cell, event.target.value);
              }
            },
          };
        }}
        editingMode='row'
        // Editing disabled for now
        // enableEditing={(rowData) => rowData.editable !== false}
        onEditingRowSave={({ row, exitEditingMode }) => {
          saveEdits(row.index, exitEditingMode);
        }}
        onEditingRowCancel={() => {
          setDataChanges(data);
        }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Actions',
            Cell: ({ row, table }) => {
              //console.log(table.getState().editingRow.original);
              //console.log(table.getState().editingRow.index);

              const row_index = row.index;

              if (
                tableRef.current.getState().editingRow &&
                tableRef.current.getState().editingRow.index === row_index
              ) {
                //console.log(tableRef.current.getState().editingRow.original);
                return (
                  <>
                    <IconButton
                      onClick={() =>
                        saveEdits(row_index, () => {
                          table.setEditingRow(null);
                        })
                      }
                    >
                      <Save />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setDataChanges(data);
                        table.setEditingRow(null);
                      }}
                    >
                      <Cancel />
                    </IconButton>
                  </>
                );
              }

              return (
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              );
            },
          },
        }}
        tableInstanceRef={tableRef}
      />
    </LoadingModalWrapper>
  );
}
