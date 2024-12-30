import * as React from 'react'
import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
  GridValueFormatterParams,
} from '@mui/x-data-grid'
import moment from 'moment'
import { IUserLoginReportDatagridProps } from './interfaces'
import {
  IUserLoginReport
} from '../../interfaces'
import { FORMAT_DATE_DDMMYYYY, FORMAT_DATE_TEXT, PAGE_SIZE, ROWS_PER_PAGE } from '../../../../../constants/Parameter'

// Components
import UserLoginReportDatagridToolbar from '../toolbar'

const UserLoginReportDatagrid = ({
  loading = false,
  rows,
}: IUserLoginReportDatagridProps) => {
  // State
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE)
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])

  const columns: GridColDef<IUserLoginReport>[] = [
    {
      field: 'loginDate',
      headerName: 'Login Date',
      flex: 1,
      minWidth: 200,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        return moment(params.value).format('DD-MMM-YYYY hh:mm:ss')
      },
    },
    {
      field: 'binusianId',
      headerName: 'Binusian ID',
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
      field: 'email',
      headerName: 'Email / Username',
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
      field: 'campus',
      headerName: 'Campus',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'academicGroup',
      headerName: 'Academic Group',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'academicOrganization',
      headerName: 'Academic Organization',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'academicProgram',
      headerName: 'Academic Program',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'loginSource',
      headerName: 'Login Source',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'ipAddress',
      headerName: 'IP Address',
      flex: 3,
      minWidth: 350,
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
              Toolbar: UserLoginReportDatagridToolbar,
            }}
            componentsProps={{
              toolbar: {
                loading: loading,
              },
            }}
            getRowId={(row: IUserLoginReport) => row.id}
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

export default UserLoginReportDatagrid
