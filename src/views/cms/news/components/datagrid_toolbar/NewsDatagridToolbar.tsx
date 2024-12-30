import * as React from 'react'
import { Button } from '@mui/material'
import { GridToolbarQuickFilter } from '@mui/x-data-grid'
import { INewsDatagridToolbarProps } from './interfaces'
import './NewsDatagridToolbar.scss'

// Components
import { ReactComponent as DeleteIcon } from '../../../../../assets/svg/icons/delete.svg'

const NewsDatagridToolbar = ({
  disabledDelete = false,
  loading = false,
  onAdd,
  onDelete,
}: INewsDatagridToolbarProps) => {
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
          ADD NEWS
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

export default NewsDatagridToolbar
