import * as React from 'react'
import { render } from '@testing-library/react'
import { DataGrid } from '@mui/x-data-grid'
import MemberManagementDatagridToolbar from './MemberManagementDatagridToolbar'

const Component = () => (
  <DataGrid
    columns={[]}
    rows={[]}
    components={{
      Toolbar: MemberManagementDatagridToolbar,
    }}
  />
)

test('renders without crash', () => {
  render(<Component />)
})
