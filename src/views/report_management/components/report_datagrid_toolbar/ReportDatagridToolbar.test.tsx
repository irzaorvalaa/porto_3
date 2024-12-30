import * as React from 'react'
import { render } from '@testing-library/react'
import { DataGrid } from '@mui/x-data-grid'
import ReportDatagridToolbar from './ReportDatagridToolbar'

const Component = () => (
  <DataGrid
    columns={[]}
    rows={[]}
    components={{
      Toolbar: ReportDatagridToolbar,
    }}
  />
)

test('renders without crash', () => {
  render(<Component />)
})
