import * as React from 'react'
import { render } from '@testing-library/react'
import { DataGrid } from '@mui/x-data-grid'
import UserManagementDatagridToolbar from './UserManagementDatagridToolbar'

const Component = () => (
  <DataGrid
    columns={[]}
    rows={[]}
    components={{
      Toolbar: UserManagementDatagridToolbar,
    }}
  />
)

test('renders without crash', () => {
  render(<Component />)
})
