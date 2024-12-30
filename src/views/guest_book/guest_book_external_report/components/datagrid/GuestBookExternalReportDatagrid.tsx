import * as React from 'react'
import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
  GridValueFormatterParams,
} from '@mui/x-data-grid'
import moment from 'moment'
import { IGuestBookExternalReportDatagridProps } from './interfaces'
import {
  IGuestBookExternalReport,
} from '../../interfaces'
import { FORMAT_DATE_DDMMYYYY, FORMAT_DATE_TEXT, PAGE_SIZE, ROWS_PER_PAGE } from '../../../../../constants/Parameter'

// Components
import GuestBookExternalReportDatagridToolbar from '../datagrid_toolbar'

const GuestBookExternalReportDatagrid = ({
  loading = false,
  rows,
  // onExport,
}: IGuestBookExternalReportDatagridProps) => {
  // State
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE)
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])

  const columns: GridColDef<IGuestBookExternalReport>[] = [
    {
      field: 'entryDate',
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
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'identityType',
      headerName: 'Identity Type',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'identityNumber',
      headerName: 'Identity Number',
      flex: 3,
      minWidth: 200,
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
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'needs',
      headerName: 'Needs',
      flex: 3,
      minWidth: 200,
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
              Toolbar: GuestBookExternalReportDatagridToolbar,
            }}
            componentsProps={{
              toolbar: {
                loading: loading,
                // onExport: onExport,
              },
            }}
            getRowId={(row: IGuestBookExternalReport) => row.id}
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

export default GuestBookExternalReportDatagrid
