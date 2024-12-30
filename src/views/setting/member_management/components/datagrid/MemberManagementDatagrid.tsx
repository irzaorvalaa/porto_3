import * as React from 'react'
import { DataGrid, GridColDef, GridRenderCellParams, GridSelectionModel } from '@mui/x-data-grid'
import { IMemberManagementDatagridProps } from './interfaces'
import { IMemberManagement } from '../../interfaces'
import { PAGE_SIZE, ROWS_PER_PAGE } from '../../../../../constants/Parameter'

// Components
import DatagridAction from '../../../../../components/datagrid_action'
import MemberManagementDatagridToolbar from '../datagrid_toolbar'

const MemberManagementDatagrid = ({
  loading = false,
  rows,
  onAdd,
  onEdit,
  onDelete,
  onDeleteBulk,
}: IMemberManagementDatagridProps) => {
  // State
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE)
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])
  const showDelete = false

  const columns: GridColDef[] = [
    {
      field: 'memberCode',
      headerName: 'Member Code',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'campusName',
      headerName: 'Campus',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'academicProgramDesc',
      headerName: 'Academic Program',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'academicOrganizationDesc',
      headerName: 'Academic Organization',
      flex: 3,
      minWidth: 200,
    },
    {
      field: '',
      headerName: 'Action',
      disableColumnMenu: true,
      sortable: false,
      disableExport: true,
      renderCell: (params: GridRenderCellParams<any, IMemberManagement>) => {
        return <DatagridAction value={params.row} onEdit={onEdit} onDelete={onDelete} showDeleteButton={showDelete} />
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
              Toolbar: MemberManagementDatagridToolbar,
            }}
            componentsProps={{
              toolbar: {
                disabledDelete: selectionModel.length === 0,
                loading: loading,
                onAdd: onAdd,
                onDelete: () => onDeleteBulk?.(selectionModel),
              },
            }}
            getRowId={(row: IMemberManagement) => row.id}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 1 ? 'datagrid__row--even' : ''
            }
            loading={loading}
            selectionModel={selectionModel}
            onSelectionModelChange={(newSelectionModel) => setSelectionModel(newSelectionModel)}
            autoHeight
            disableSelectionOnClick
            disableColumnSelector
          />
        </div>
      </div>
    </div>
  )
}

export default MemberManagementDatagrid
