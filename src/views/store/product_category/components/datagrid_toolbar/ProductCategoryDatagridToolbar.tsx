import * as React from 'react'
import { Button } from '@mui/material'
import { GridToolbarQuickFilter } from '@mui/x-data-grid'
import { IProductCategoryDatagridToolbarProps } from './interfaces'
import './ProductCategoryDatagridToolbar.scss'

// Components
import { ReactComponent as DeleteIcon } from '../../../../../assets/svg/icons/delete.svg'

const ProductCategoryDatagridToolbar = ({
  disabledDelete = false,
  loading = false,
  onAdd,
  onDelete,
}: IProductCategoryDatagridToolbarProps) => {
  return (
    <div className="datagrid--toolbar">
      <div>
        <Button
          disableElevation
          variant="contained"
          color="secondary"
          className="button button--secondary"
          disabled={loading}
          onClick={onAdd}
        >
          ADD ProductCategory
        </Button>
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

export default ProductCategoryDatagridToolbar
