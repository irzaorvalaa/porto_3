import * as React from 'react'
import { render } from '@testing-library/react'
import { DataGrid } from '@mui/x-data-grid'
import ProductCategoryDatagridToolbar from './ProductCategoryDatagridToolbar'

const Component = () => (
  <DataGrid
    columns={[]}
    rows={[]}
    components={{
      Toolbar: ProductCategoryDatagridToolbar,
    }}
  />
)

test('renders without crash', () => {
  render(<Component />)
})
