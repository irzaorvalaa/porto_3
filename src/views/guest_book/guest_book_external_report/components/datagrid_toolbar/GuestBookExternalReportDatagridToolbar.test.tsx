import * as React from 'react'
import { render } from '@testing-library/react'
import { DataGrid } from '@mui/x-data-grid'
import GuestBookExternalReportDatagridToolbar from './GuestBookExternalReportDatagridToolbar'

const Component = () => (
  <DataGrid
    columns={[]}
    rows={[]}
    components={{
      Toolbar: GuestBookExternalReportDatagridToolbar,
    }}
  />
)

test('renders without crash', () => {
  render(<Component />)
})
