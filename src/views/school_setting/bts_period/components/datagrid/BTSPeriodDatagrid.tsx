import * as React from 'react'
import { DataGrid, GridColDef, GridRenderCellParams, GridSelectionModel } from '@mui/x-data-grid'
import { IBTSPeriodDatagridProps } from './interfaces'
import { IBTSPeriod } from '../../interfaces'
import {
  FORMAT_DATE_EVENT_HEADLINE,
  PAGE_SIZE,
  ROWS_PER_PAGE,
} from '../../../../../constants/Parameter'

// Components
import DatagridAction from '../../../../../components/datagrid_action'
import BTSPeriodDatagridToolbar from '../datagrid_toolbar'
import moment from 'moment'
import { ICampusAssignation } from '../../../../../interfaces/IResponse'
import { Chip, Stack } from '@mui/material'

const BTSPeriodDatagrid = ({
  loading = false,
  rows,
  onAdd,
  onEdit,
  onDelete,
  onDeleteBulk,
}: IBTSPeriodDatagridProps) => {
  // State
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE)
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])

  const columns: GridColDef[] = [
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
        return (
          <Stack>
            {params.value
              ? params.value.map((v: ICampusAssignation) => (
                  <Chip key={v.campusId} label={v.campusName} size="small" />
                ))
              : '-'}
          </Stack>
        )
      },
    },
    {
      field: '',
      headerName: 'Action',
      disableColumnMenu: true,
      sortable: false,
      disableExport: true,
      renderCell: (params: GridRenderCellParams<any, IBTSPeriod>) => {
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
              Toolbar: BTSPeriodDatagridToolbar,
            }}
            componentsProps={{
              toolbar: {
                disabledDelete: selectionModel.length === 0,
                loading: loading,
                onAdd: onAdd,
                onDelete: () => onDeleteBulk?.(selectionModel),
              },
            }}
            getRowId={(row: IBTSPeriod) => row.id}
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

export default BTSPeriodDatagrid
