import * as React from 'react'
import { Button } from '@mui/material'
import { GridToolbarQuickFilter } from '@mui/x-data-grid'
import { IGuestBookBinusianReportDatagridToolbarProps } from './interfaces'
import './GuestBookBinusianReportDatagridToolbar.scss'

const GuestBookBinusianReportDatagridToolbar = ({
  loading = false,
  onExport,
}: IGuestBookBinusianReportDatagridToolbarProps) => {
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

export default GuestBookBinusianReportDatagridToolbar
