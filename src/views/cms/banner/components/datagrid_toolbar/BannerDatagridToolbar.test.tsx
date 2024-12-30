import * as React from 'react'
import { render } from '@testing-library/react'
import { DataGrid } from '@mui/x-data-grid'
import BannerDatagridToolbar from './BannerDatagridToolbar'

const Component = () => (
  <DataGrid
    columns={[]}
    rows={[]}
    components={{
      Toolbar: BannerDatagridToolbar,
    }}
  />
)

test('renders without crash', () => {
  render(<Component />)
})
