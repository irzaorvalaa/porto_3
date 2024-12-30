import * as React from 'react'
import { DataGrid, GridColDef, GridRenderCellParams, GridSelectionModel } from '@mui/x-data-grid'
import { IProductCategoryDatagridProps } from './interfaces'
import { IProductCategory } from '../../interfaces'
import {
  FORMAT_DATE_EVENT_HEADLINE,
  PAGE_SIZE,
  ROWS_PER_PAGE,
} from '../../../../../constants/Parameter'

// Components
import DatagridAction from '../../../../../components/datagrid_action'
import ProductCategoryDatagridToolbar from '../datagrid_toolbar'
import moment from 'moment'

const ProductCategoryDatagrid = ({
  loading = false,
  rows,
  onAdd,
  onEdit,
  onDelete,
  onDeleteBulk,
}: IProductCategoryDatagridProps) => {
  // State
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE)
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ProductCategory No.',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'label',
      headerName: 'Name',
      flex: 3,
      minWidth: 200,
    },
    {
      field: 'topic',
      headerName: 'Topic',
      flex: 3,
      minWidth: 300,
    },
    {
      field: '',
      headerName: 'Action',
      disableColumnMenu: true,
      sortable: false,
      disableExport: true,
      renderCell: (params: GridRenderCellParams<any, IProductCategory>) => {
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
              Toolbar: ProductCategoryDatagridToolbar,
            }}
            componentsProps={{
              toolbar: {
                disabledDelete: selectionModel.length === 0,
                loading: loading,
                onAdd: onAdd,
                onDelete: () => onDeleteBulk?.(selectionModel),
              },
            }}
            getRowId={(row: IProductCategory) => row.id}
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

export default ProductCategoryDatagrid
