import * as React from 'react'
import { Button } from '@mui/material'
import { GridToolbarQuickFilter } from '@mui/x-data-grid'
import { IUserLoginReportDatagridToolbarProps } from './interfaces'
import './UserLoginReportDatagridToolbar.scss'

const UserLoginReportDatagridToolbar = ({
  loading = false,
  onExport,
}: IUserLoginReportDatagridToolbarProps) => {
  return (
    <div className="report-toolbar">
      <div>
        {/* <Button
          disableElevation
          variant="contained"
          color="secondary"
          className="button button--secondary"
          disabled={loading}
          onClick={onExport}
        >
          EXPORT TO EXCEL
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

export default UserLoginReportDatagridToolbar
