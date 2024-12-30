import * as React from 'react'
import { Button } from '@mui/material'
import { GridToolbarQuickFilter } from '@mui/x-data-grid'
import { ICustomerDatagridToolbarProps } from './interfaces'
import './CustomerDatagridToolbar.scss'

// Components
import { ReactComponent as DeleteIcon } from '../../../../../assets/svg/icons/delete.svg'

const CustomerDatagridToolbar = ({
  disabledDelete = false,
  loading = false,
  onAdd,
  onDelete,
}: ICustomerDatagridToolbarProps) => {
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
          ADD COLLECTION SUPLEMENT
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

export default CustomerDatagridToolbar
