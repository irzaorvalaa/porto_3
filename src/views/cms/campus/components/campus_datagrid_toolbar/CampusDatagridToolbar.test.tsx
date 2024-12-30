import * as React from 'react'
import { render } from '@testing-library/react'
import { DataGrid } from '@mui/x-data-grid'
import CampusDatagridToolbar from './CampusDatagridToolbar'

const Component = () => (
  <DataGrid
    columns={[]}
    rows={[]}
    components={{
      Toolbar: CampusDatagridToolbar,
    }}
  />
)

test('renders without crash', () => {
  render(<Component />)
})
