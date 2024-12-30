import * as React from 'react'
import { Button } from '@mui/material'
import { GridToolbarQuickFilter } from '@mui/x-data-grid'
import { IReportDatagridToolbarProps } from './interfaces'
import './ReportDatagridToolbar.scss'

const ReportDatagridToolbar = ({ loading = false, onExport }: IReportDatagridToolbarProps) => {
  return (
    <div className="reference-service-report-toolbar">
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

export default ReportDatagridToolbar
