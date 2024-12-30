import * as React from 'react'
import { DataGrid, GridColDef, GridRenderCellParams, GridSelectionModel } from '@mui/x-data-grid'
import { ICalendarDatagridProps } from './interfaces'
import { ICalendar } from '../../interfaces'
import { FORMAT_DATE_EVENT_HEADLINE, FORMAT_DATE_TEXT, PAGE_SIZE, ROWS_PER_PAGE } from '../../../../../constants/Parameter'

// Components
import DatagridAction from '../../../../../components/datagrid_action'
import CalendarDatagridToolbar from '../datagrid_toolbar'
import moment from 'moment'
import { ICampusAssignation } from '../../../../../interfaces/IResponse'
import { Chip, Stack } from '@mui/material'

const CalendarDatagrid = ({
  loading = false,
  rows,
  onAdd,
  onEdit,
  onDelete,
  onDeleteBulk,
}: ICalendarDatagridProps) => {
  // State
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE)
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])

  const columns: GridColDef[] = [
    {
      field: 'effDateStart',
      headerName: 'Start Date',
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return (
          moment(params.row.effDateStart).format(FORMAT_DATE_TEXT)
        )
      },
    },
    {
      field: 'effDateEnd',
      headerName: 'End Date',
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return (
          moment(params.row.effDateEnd).format(FORMAT_DATE_TEXT)
        )
      },
    },
    {
      field: 'label',
      headerName: 'Name',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'campusLocation',
      headerName: 'Campus',
      minWidth: 200,
      renderCell: (params: GridRenderCellParams<any, ICampusAssignation[]>) => {
        return <Stack>{(params.value ? params.value.map((v: ICampusAssignation) => <Chip key={v.campusId} label={v.campusName} size="small" />) : '-')}</Stack>
      },
    },
    {
      field: '',
      headerName: 'Action',
      disableColumnMenu: true,
      sortable: false,
      disableExport: true,
      renderCell: (params: GridRenderCellParams<any, ICalendar>) => {
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
              Toolbar: CalendarDatagridToolbar,
            }}
            componentsProps={{
              toolbar: {
                disabledDelete: selectionModel.length === 0,
                loading: loading,
                onAdd: onAdd,
                onDelete: () => onDeleteBulk?.(selectionModel),
              },
            }}
            getRowId={(row: ICalendar) => row.id}
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

export default CalendarDatagrid
