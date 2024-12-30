import * as React from 'react'
import { render } from '@testing-library/react'
import { DataGrid } from '@mui/x-data-grid'
import DatagridToolbar from './DatagridToolbar'

const Component = () => (
  <DataGrid
    columns={[]}
    rows={[]}
    components={{
      Toolbar: DatagridToolbar,
    }}
  />
)

test('renders without crash', () => {
  render(<Component />)
})
