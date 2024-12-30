import * as React from 'react'
import { DataGrid, GridColDef, GridRenderCellParams, GridSelectionModel } from '@mui/x-data-grid'
import { IMerchantDatagridProps } from './interfaces'
import { IMerchant } from '../../interfaces'
import {
  FORMAT_DATE_EVENT_HEADLINE,
  PAGE_SIZE,
  ROWS_PER_PAGE,
} from '../../../../../constants/Parameter'

// Components
import DatagridAction from '../../../../../components/datagrid_action'
import MerchantDatagridToolbar from '../datagrid_toolbar'
import moment from 'moment'

const MerchantDatagrid = ({
  loading = false,
  rows,
  onAdd,
  onEdit,
  onDelete,
  onDeleteBulk,
}: IMerchantDatagridProps) => {
  // State
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE)
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'city',
      headerName: 'City',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 3,
      minWidth: 100,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 3,
      minWidth: 200,
    },
    {
      field: '',
      headerName: 'Action',
      disableColumnMenu: true,
      sortable: false,
      disableExport: true,
      renderCell: (params: GridRenderCellParams<any, IMerchant>) => {
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
              Toolbar: MerchantDatagridToolbar,
            }}
            componentsProps={{
              toolbar: {
                disabledDelete: selectionModel.length === 0,
                loading: loading,
                onAdd: onAdd,
                onDelete: () => onDeleteBulk?.(selectionModel),
              },
            }}
            getRowId={(row: IMerchant) => row.id}
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

export default MerchantDatagrid
