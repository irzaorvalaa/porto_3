import * as React from 'react'
import { render } from '@testing-library/react'
import { DataGrid } from '@mui/x-data-grid'
import CustomerDatagridToolbar from './CustomerDatagridToolbar'

const Component = () => (
  <DataGrid
    columns={[]}
    rows={[]}
    components={{
      Toolbar: CustomerDatagridToolbar,
    }}
  />
)

test('renders without crash', () => {
  render(<Component />)
})
