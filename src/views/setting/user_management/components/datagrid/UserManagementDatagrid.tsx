import * as React from 'react'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSelectionModel,
  GridValueFormatterParams,
} from '@mui/x-data-grid'
import { IUserManagementDatagridProps } from './interfaces'
import { IUserManagement } from '../../interfaces'
import { PAGE_SIZE, ROWS_PER_PAGE } from '../../../../../constants/Parameter'

// Components
import DatagridAction from '../../../../../components/datagrid_action'
import UserManagementDatagridToolbar from '../datagrid_toolbar'
import { ICampusAssignation, IRoleAssignation } from '../../../../../interfaces/IResponse'
import { Chip, List, ListItem, ListItemText, Stack } from '@mui/material'

const UserManagementDatagrid = ({
  loading = false,
  rows,
  onAdd,
  onEdit,
  onDelete,
  onDeleteBulk,
}: IUserManagementDatagridProps) => {
  // State
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE)
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'userType',
      headerName: 'User Type',
      flex: 3,
      minWidth: 100,
    },
    {
      field: 'roleAssignation',
      headerName: 'Role',
      minWidth: 200,
      renderCell: (params: GridRenderCellParams<any, IRoleAssignation[]>) => {
        return (
          <Stack>
            {params.value
              ? params.value.map((v: IRoleAssignation) => (
                  <Chip key={v.roleId} label={v.roleName} size="small" />
                ))
              : '-'}
          </Stack>
        )
      },
    },
    {
      field: 'campusAssignation',
      headerName: 'Campus',
      minWidth: 200,
      renderCell: (params: GridRenderCellParams<any, ICampusAssignation[]>) => {
        return (
          <Stack>
            {params.value
              ? params.value.map((v: ICampusAssignation) => (
                  <Chip key={v.campusId} label={v.campusName} size="small" />
                ))
              : '-'}
          </Stack>
        )
      },
    },
    {
      field: '',
      headerName: 'Action',
      disableColumnMenu: true,
      sortable: false,
      disableExport: true,
      renderCell: (params: GridRenderCellParams<any, IUserManagement>) => {
        return <DatagridAction value={params.row} onEdit={onEdit} onDelete={onDelete} />
      },
    },
  ]

  return (
    <div className="datagrid">
      <div className="datagrid__container">
        <div className="datagrid__content">
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={pageSize}
            onPageSizeChange={(value) => setPageSize(value)}
            rowsPerPageOptions={ROWS_PER_PAGE}
            components={{
              Toolbar: UserManagementDatagridToolbar,
            }}
            componentsProps={{
              toolbar: {
                disabledDelete: selectionModel.length === 0,
                loading: loading,
                onAdd: onAdd,
                onDelete: () => onDeleteBulk?.(selectionModel),
              },
            }}
            getRowId={(row: IUserManagement) => row.id}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 1 ? 'datagrid__row--even' : ''
            }
            loading={loading}
            selectionModel={selectionModel}
            onSelectionModelChange={(newSelectionModel) => setSelectionModel(newSelectionModel)}
            autoHeight
            getRowHeight={() => 'auto'}
            disableSelectionOnClick
            disableColumnSelector
          />
        </div>
      </div>
    </div>
  )
}

export default UserManagementDatagrid
