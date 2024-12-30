import * as React from 'react'
import { render } from '@testing-library/react'
import { DataGrid } from '@mui/x-data-grid'
import ProductDatagridToolbar from './ProductDatagridToolbar'

const Component = () => (
  <DataGrid
    columns={[]}
    rows={[]}
    components={{
      Toolbar: ProductDatagridToolbar,
    }}
  />
)

test('renders without crash', () => {
  render(<Component />)
})
