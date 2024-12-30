import * as React from 'react'
import { render } from '@testing-library/react'
import { DataGrid } from '@mui/x-data-grid'
import MappingProductDatagridToolbar from './MappingProductDatagridToolbar'

const Component = () => (
  <DataGrid
    columns={[]}
    rows={[]}
    components={{
      Toolbar: MappingProductDatagridToolbar,
    }}
  />
)

test('renders without crash', () => {
  render(<Component />)
})
