import * as React from 'react'
import { render } from '@testing-library/react'
import { DataGrid } from '@mui/x-data-grid'
import SicepatPickupDatagridToolbar from './SicepatPickupDatagridToolbar'

const Component = () => (
  <DataGrid
    columns={[]}
    rows={[]}
    components={{
      Toolbar: SicepatPickupDatagridToolbar,
    }}
  />
)

test('renders without crash', () => {
  render(<Component />)
})
