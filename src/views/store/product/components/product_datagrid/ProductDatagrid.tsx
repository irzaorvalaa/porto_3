import * as React from 'react'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSelectionModel,
  GridValueFormatterParams,
} from '@mui/x-data-grid'
import { IProductDatagridProps } from './interfaces'
import { IProduct, IProductAuthor, IProductSubject } from '../../interfaces'
import { PAGE_SIZE, ROWS_PER_PAGE } from '../../../../../constants/Parameter'

// Components
import DatagridAction from '../../../../../components/datagrid_action'
import ProductDatagridToolbar from '../product_datagrid_toolbar'

const ProductDatagrid = ({
  loading = false,
  rows,
  onAdd,
  onEdit,
  onDelete,
  onDeleteBulk,
}: IProductDatagridProps) => {
  // State
  const [pageSize, setPageSize] = React.useState<number>(PAGE_SIZE)
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 3,
      minWidth: 300,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        return params.value || '-'
      },
    },
    {
      field: 'collectionType',
      headerName: 'Collection Type',
      flex: 3,
      minWidth: 200,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        return params.value || '-'
      },
    },
    {
      field: 'subject',
      headerName: 'Subject',
      flex: 3,
      minWidth: 200,
      valueFormatter: (params: GridValueFormatterParams<IProductSubject[]>) => {
        return params.value ? params.value.map((v) => v.collectionSubject).join(', ') : '-'
      },
    },
    {
      field: 'author',
      headerName: 'Author',
      flex: 3,
      minWidth: 200,
      valueFormatter: (params: GridValueFormatterParams<IProductAuthor[]>) => {
        return params.value ? params.value.map((v) => v.name).join(', ') : '-'
      },
    },
    {
      field: 'publisher',
      headerName: 'Publisher',
      flex: 3,
      minWidth: 200,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        return params.value || '-'
      },
    },
    {
      field: 'cataloger',
      headerName: 'Cataloger',
      flex: 3,
      minWidth: 200,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        return params.value || '-'
      },
    },
    {
      field: 'number',
      headerName: 'Action',
      disableColumnMenu: true,
      sortable: false,
      disableExport: true,
      renderCell: (params: GridRenderCellParams<any, IProduct>) => {
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
              Toolbar: ProductDatagridToolbar,
            }}
            componentsProps={{
              toolbar: {
                disabledDelete: selectionModel.length === 0,
                loading: loading,
                onAdd: onAdd,
                onDelete: () => onDeleteBulk?.(selectionModel),
              },
            }}
            getRowId={(row: IProduct) => row.id}
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

export default ProductDatagrid
