import * as React from 'react'
import { Button } from '@mui/material'
import { GridToolbarQuickFilter } from '@mui/x-data-grid'
import { IProductDatagridToolbarProps } from './interfaces'
import './ProductDatagridToolbar.scss'

// Components
import { ReactComponent as DeleteIcon } from '../../../../../assets/svg/icons/delete.svg'

const ProductDatagridToolbar = ({
  disabledDelete = false,
  loading = false,
  onAdd,
  onDelete,
}: IProductDatagridToolbarProps) => {
  return (
    <div className="collection-management-toolbar">
      <div>
        <Button
          disableElevation
          variant="contained"
          color="secondary"
          className="button button--secondary"
          disabled={loading}
          onClick={onAdd}
        >
          ADD COLLECTION
        </Button>
        {/* <Button
          disableElevation
          variant="contained"
          className="button collection-management-toolbar__delete"
          disabled={loading || disabledDelete}
          onClick={onDelete}
        >
          <DeleteIcon />
          <span>DELETE</span>
        </Button> */}
      </div>
      <div>
        <GridToolbarQuickFilter
          variant="outlined"
          size="small"
          className="datagrid__toolbar--quickfilter"
        />
      </div>
    </div>
  )
}

export default ProductDatagridToolbar
