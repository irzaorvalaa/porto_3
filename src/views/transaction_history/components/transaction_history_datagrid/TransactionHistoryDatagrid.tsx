import * as React from 'react'
import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
  GridValueFormatterParams,
} from '@mui/x-data-grid'
import moment from 'moment'
import { IReferenceServiceReportDatagridProps } from './interfaces'
import {
  IReferenceServiceReport,
  IReferenceServiceReportParticipant,
  IReferenceServiceReportPIC,
} from '../../interfaces'
import {
  FORMAT_DATE_DDMMYYYY,
  FORMAT_DATE_TEXT,
  PAGE_SIZE,
  ROWS_PER_PAGE,
} from '../../../../constants/Parameter'

// Components
import TransactionHistoryDatagridToolbar from '../transaction_history_datagrid_toolbar'

const TransactionHistoryDatagrid = ({
  loading = false,
  rows,
}: // onExport,
IReferenceServiceReportDatagridProps) => {
  // State
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE)
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])

  const columns: GridColDef<IReferenceServiceReport>[] = [
    {
      field: 'date',
      headerName: 'Appointment Date',
      flex: 1,
      minWidth: 200,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        return moment(params.value).format(FORMAT_DATE_TEXT)
      },
    },
    {
      field: 'timeSlot',
      headerName: 'Time Slot',
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
      field: 'requestorName',
      headerName: 'Requestor',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'topic',
      headerName: 'Topic',
      flex: 3,
      minWidth: 350,
    },
    {
      field: 'pic',
      headerName: 'PIC Librarian',
      flex: 3,
      minWidth: 200,
      valueFormatter: (params: GridValueFormatterParams<IReferenceServiceReportPIC[]>) => {
        return params.value ? params.value.map((v) => v.name).join(', ') : '-'
      },
    },
    {
      field: 'participant',
      headerName: 'Participant',
      flex: 3,
      minWidth: 200,
      valueFormatter: (params: GridValueFormatterParams<IReferenceServiceReportParticipant[]>) => {
        return params.value
          ? params.value
              .map(
                (v) =>
                  `${v.name}${v.academicOrganizatonDesc ? '-' + v.academicOrganizatonDesc : ''}`,
              )
              .join(', ')
          : '-'
      },
    },
    {
      field: 'attendStatus',
      headerName: 'Attend Status',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'appointmentStatus',
      headerName: 'Appointment Status',
      flex: 3,
      minWidth: 300,
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
              Toolbar: TransactionHistoryDatagridToolbar,
            }}
            componentsProps={{
              toolbar: {
                loading: loading,
                // onExport: onExport,
              },
            }}
            getRowId={(row: IReferenceServiceReport) => row.id}
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

export default TransactionHistoryDatagrid
