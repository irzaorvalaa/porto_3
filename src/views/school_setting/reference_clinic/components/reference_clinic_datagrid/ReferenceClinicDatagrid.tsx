import * as React from 'react'
import {
  DataGrid,
  GridColDef,
  GridSelectionModel,
  GridValueFormatterParams,
} from '@mui/x-data-grid'
import moment from 'moment'
import { IReferenceClinicDatagridProps } from './interfaces'
import {
  IReferenceClinic,
  IReferenceClinicParticipant,
  IReferenceClinicPIC,
} from '../../interfaces'
import { FORMAT_DATE_DDMMYYYY, FORMAT_DATE_TEXT, PAGE_SIZE, ROWS_PER_PAGE } from '../../../../../constants/Parameter'

// Components
import DatagridAction from '../../../../../components/datagrid_action'
import ReferenceClinicDatagridToolbar from '../reference_clinic_datagrid_toolbar'

const ReferenceClinicDatagrid = ({
  loading = false,
  rows,
  onAdd,
  onEdit,
  onDeleteBulk,
}: IReferenceClinicDatagridProps) => {
  // State
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE)
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])

  const columns: GridColDef<IReferenceClinic>[] = [
    {
      field: 'appointmentDate',
      headerName: 'Date',
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
      field: 'campus',
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
      field: 'referenceTopicName',
      headerName: 'Topic',
      flex: 3,
      minWidth: 350,
    },
    {
      field: 'picLibrarian',
      headerName: 'PIC Librarian',
      flex: 3,
      minWidth: 200,
      valueFormatter: (params: GridValueFormatterParams<IReferenceClinicPIC[]>) => {
        return params.value ? params.value.map((v) => v.name).join(', ') : '-'
      },
    },
    {
      field: 'participant',
      headerName: 'Participant',
      flex: 3,
      minWidth: 200,
      valueFormatter: (params: GridValueFormatterParams<IReferenceClinicParticipant[]>) => {
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
      valueFormatter: (params: GridValueFormatterParams<'T' | 'F'>) => {
        return params.value === 'T' ? 'Attended' : 'Not Attended'
      },
    },
    {
      field: 'appointmentStatus',
      headerName: 'Appointment Status',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'action',
      headerName: 'Action',
      disableColumnMenu: true,
      sortable: false,
      disableExport: true,
      renderCell: (params) => {
        return <DatagridAction value={params.row} onEdit={onEdit} showDeleteButton={false} />
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
              Toolbar: ReferenceClinicDatagridToolbar,
            }}
            componentsProps={{
              toolbar: {
                disabledDelete: selectionModel.length === 0,
                loading: loading,
                onAdd: onAdd,
                onDelete: () => onDeleteBulk?.(selectionModel),
              },
            }}
            getRowId={(row: IReferenceClinic) => row.id}
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

export default ReferenceClinicDatagrid
