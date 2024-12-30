import * as React from 'react'
import { Button } from '@mui/material'
import { GridToolbarQuickFilter } from '@mui/x-data-grid'
import { ICalendarDatagridToolbarProps } from './interfaces'
import './CalendarDatagridToolbar.scss'

// Components
import { ReactComponent as DeleteIcon } from '../../../../../assets/svg/icons/delete.svg'

const CalendarDatagridToolbar = ({
  disabledDelete = false,
  loading = false,
  onAdd,
  onDelete,
}: ICalendarDatagridToolbarProps) => {
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
          ADD OFF DAY
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

export default CalendarDatagridToolbar
