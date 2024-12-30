import * as React from 'react'
import { Button } from '@mui/material'
import { GridToolbarQuickFilter } from '@mui/x-data-grid'
import { ICampusDatagridToolbarProps } from './interfaces'
import './CampusDatagridToolbar.scss'

// Components
import { ReactComponent as DeleteIcon } from '../../../../../assets/svg/icons/delete.svg'

const CampusDatagridToolbar = ({
  disabledDelete = false,
  loading = false,
  onAdd,
  onDelete,
}: ICampusDatagridToolbarProps) => {
  return (
    <div className="campus-location-toolbar">
      <div>
        <Button
          disableElevation
          variant="contained"
          color="secondary"
          className="button button--secondary"
          disabled={loading}
          onClick={onAdd}
        >
          ADD CAMPUS
        </Button>
        {/* <Button
          disableElevation
          variant="contained"
          className="button campus-location-toolbar__delete"
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

export default CampusDatagridToolbar
