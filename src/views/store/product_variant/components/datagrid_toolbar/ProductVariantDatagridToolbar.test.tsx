import * as React from 'react'
import { render } from '@testing-library/react'
import { DataGrid } from '@mui/x-data-grid'
import ProductVariantDatagridToolbar from './ProductVariantDatagridToolbar'

const Component = () => (
  <DataGrid
    columns={[]}
    rows={[]}
    components={{
      Toolbar: ProductVariantDatagridToolbar,
    }}
  />
)

test('renders without crash', () => {
  render(<Component />)
})
