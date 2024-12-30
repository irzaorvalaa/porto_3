import * as React from 'react'
import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
  GridValueFormatterParams,
} from '@mui/x-data-grid'
import moment from 'moment'
import { IGuestBookBinusianReportDatagridProps } from './interfaces'
import {
  IGuestBookBinusianReport,
} from '../../interfaces'
import { FORMAT_DATE_DDMMYYYY, FORMAT_DATE_TEXT, PAGE_SIZE, ROWS_PER_PAGE } from '../../../../../constants/Parameter'

// Components
import GuestBookBinusianReportDatagridToolbar from '../datagrid_toolbar'

const GuestBookBinusianReportDatagrid = ({
  loading = false,
  rows,
  // onExport,
}: IGuestBookBinusianReportDatagridProps) => {
  // State
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE)
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])

  const columns: GridColDef<IGuestBookBinusianReport>[] = [
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
      field: 'campus',
      headerName: 'Campus',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'binusianID',
      headerName: 'Binusian ID',
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
      field: 'memberCode',
      headerName: 'Member Code',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'sourceCampusName',
      headerName: 'Source Campus',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'academicGroupDesc',
      headerName: 'Academic Group',
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
      field: 'borrowLocker',
      headerName: 'Borrow Locker',
      flex: 3,
      minWidth: 100,
    },
    {
      field: 'lockerNumber',
      headerName: 'Locker Number',
      flex: 3,
      minWidth: 100,
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
              Toolbar: GuestBookBinusianReportDatagridToolbar,
            }}
            componentsProps={{
              toolbar: {
                loading: loading,
                // onExport: onExport,
              },
            }}
            getRowId={(row: IGuestBookBinusianReport) => row.id}
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

export default GuestBookBinusianReportDatagrid
