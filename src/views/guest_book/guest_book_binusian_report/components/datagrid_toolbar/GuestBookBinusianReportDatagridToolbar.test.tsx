import * as React from 'react'
import { render } from '@testing-library/react'
import { DataGrid } from '@mui/x-data-grid'
import GuestBookBinusianReportDatagridToolbar from './GuestBookBinusianReportDatagridToolbar'

const Component = () => (
  <DataGrid
    columns={[]}
    rows={[]}
    components={{
      Toolbar: GuestBookBinusianReportDatagridToolbar,
    }}
  />
)

test('renders without crash', () => {
  render(<Component />)
})
