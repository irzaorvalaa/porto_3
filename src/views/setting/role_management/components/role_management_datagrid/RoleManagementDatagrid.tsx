import * as React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { IRoleManagementDatagridProps } from './interfaces'
import { IRoleManagement } from '../../interfaces'
import { PAGE_SIZE, ROWS_PER_PAGE } from '../../../../../constants/Parameter'

// Components
import DatagridToolbar from '../../../../../components/datagrid_toolbar'
import DatagridAction from '../../../../../components/datagrid_action'

const RoleManagementDatagrid = ({
  loading = false,
  rows,
  onAdd,
  onEdit,
  onDelete,
}: IRoleManagementDatagridProps) => {
  // State
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE)

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 300,
    },
    {
      field: 'action',
      headerName: 'Action',
      disableColumnMenu: true,
      sortable: false,
      disableExport: true,
      renderCell: (params) => {
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
              Toolbar: DatagridToolbar,
            }}
            componentsProps={{
              toolbar: {
                labelAddButton: 'Add Role',
                loading: loading,
                onAdd: onAdd,
              },
            }}
            getRowId={(row: IRoleManagement) => row.id}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 1 ? 'datagrid__row--even' : ''
            }
            loading={loading}
            autoHeight
            disableSelectionOnClick
            disableColumnSelector
          />
        </div>
      </div>
    </div>
  )
}

export default RoleManagementDatagrid
