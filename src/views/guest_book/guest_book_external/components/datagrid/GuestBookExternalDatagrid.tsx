import * as React from 'react'
import { DataGrid, GridColDef, GridRenderCellParams, GridSelectionModel, GridValueFormatterParams } from '@mui/x-data-grid'
import { IGuestBookExternalDatagridProps } from './interfaces'
import { IGuestBookExternal } from '../../interfaces'
import { FORMAT_DATE_DDMMYYYY, FORMAT_DATE_TEXT, PAGE_SIZE, ROWS_PER_PAGE } from '../../../../../constants/Parameter'

// Components
import DatagridAction from '../../../../../components/datagrid_action'
import GuestBookExternalDatagridToolbar from '../datagrid_toolbar'
import moment from 'moment'

const GuestBookExternalDatagrid = ({
  loading = false,
  rows,
  onAdd,
  onEdit,
  onDelete,
  onDeleteBulk,
}: IGuestBookExternalDatagridProps) => {
  // State
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE)
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])

  const columns: GridColDef[] = [
    {
      field: 'recordDate',
      headerName: 'Visit Date',
      flex: 1,
      minWidth: 200,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        return moment(params.value).format('DD-MMM-YYYY hh:mm:ss')
      },
    },
    {
      field: 'campusName',
      headerName: 'Campus',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'identityNumber',
      headerName: 'Identity Number',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'identityType',
      headerName: 'Identity Type',
      flex: 3,
      minWidth: 100,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'institutionName',
      headerName: 'Institution',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'needs',
      headerName: 'Needs',
      flex: 3,
      minWidth: 200,
    },
    {
      field: '',
      headerName: 'Action',
      disableColumnMenu: true,
      sortable: false,
      disableExport: true,
      renderCell: (params: GridRenderCellParams<any, IGuestBookExternal>) => {
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
              Toolbar: GuestBookExternalDatagridToolbar,
            }}
            componentsProps={{
              toolbar: {
                disabledDelete: selectionModel.length === 0,
                loading: loading,
                onAdd: onAdd,
                onDelete: () => onDeleteBulk?.(selectionModel),
              },
            }}
            getRowId={(row: IGuestBookExternal) => row.id}
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

export default GuestBookExternalDatagrid
