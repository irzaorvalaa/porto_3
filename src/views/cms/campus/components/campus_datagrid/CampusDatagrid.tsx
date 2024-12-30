import * as React from 'react'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSelectionModel,
  GridValueFormatterParams,
} from '@mui/x-data-grid'
import { IBECampus } from '../../../../../interfaces/ICampus'
import { ICampusDatagridProps } from './interfaces'
import { PAGE_SIZE, ROWS_PER_PAGE } from '../../../../../constants/Parameter'
import './CampusLocationDatagrid.scss'

// Components
import DatagridAction from '../../../../../components/datagrid_action'
import CampusDatagridToolbar from '../campus_datagrid_toolbar'
import { ReactComponent as CheckIcon } from '../../../../../assets/svg/icons/check.svg'
import { ReactComponent as CloseIcon } from '../../../../../assets/svg/icons/close.svg'

const CampusDatagrid = ({
  loading = false,
  rows,
  onAdd,
  onEdit,
  onDelete,
  onDeleteBulk,
}: ICampusDatagridProps) => {
  // State
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE)
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Campus ID',
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'name',
      headerName: 'Campus Name',
      flex: 3,
      minWidth: 250,
    },
    {
      field: 'phoneNumberWA',
      headerName: 'Phone Number (WA)',
      flex: 3,
      minWidth: 150,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        return params.value || '-'
      },
    },
    {
      field: 'phoneNumberExt',
      headerName: 'Phone Number (Ext)',
      flex: 3,
      minWidth: 150,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        return params.value || '-'
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 3,
      minWidth: 200,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        return params.value || '-'
      },
    },
    {
      field: 'picCampus',
      headerName: 'PIC Campus',
      flex: 3,
      minWidth: 200,
      // valueFormatter: (params: GridValueFormatterParams<ICampusAssignedPIC[]>) => {
      //   const value = params.value.map((pic) => pic.name).join(', ')
      //   return value
      // },
    },
    {
      field: 'provideLockerBorrowing',
      headerName: 'Provide Locker Borrowing',
      flex: 1,
      minWidth: 200,
      align: 'center',
      renderCell: (params: GridRenderCellParams<'T' | 'F', IBECampus>) => {
        return params.value === 'T' ? (
          'Yes'
        ) : (
          'No'
        )
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      disableColumnMenu: true,
      sortable: false,
      disableExport: true,
      renderCell: (params: GridRenderCellParams<any, IBECampus>) => {
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
              Toolbar: CampusDatagridToolbar,
            }}
            componentsProps={{
              toolbar: {
                disabledDelete: selectionModel.length === 0,
                loading: loading,
                onAdd: onAdd,
                onDelete: () => onDeleteBulk?.(selectionModel),
              },
            }}
            getRowId={(row: IBECampus) => row.id}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 1 ? 'datagrid__row--even' : ''
            }
            loading={loading}
            selectionModel={selectionModel}
            onSelectionModelChange={(newSelectionModel) => setSelectionModel(newSelectionModel)}
            autoHeight
            // checkboxSelection
            disableSelectionOnClick
            disableColumnSelector
          />
        </div>
      </div>
    </div>
  )
}

export default CampusDatagrid
