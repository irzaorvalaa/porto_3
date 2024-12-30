import * as React from 'react'
import { render } from '@testing-library/react'
import { DataGrid } from '@mui/x-data-grid'
import UserLoginReportDatagridToolbar from './UserLoginReportDatagridToolbar'

const Component = () => (
  <DataGrid
    columns={[]}
    rows={[]}
    components={{
      Toolbar: UserLoginReportDatagridToolbar,
    }}
  />
)

test('renders without crash', () => {
  render(<Component />)
})
