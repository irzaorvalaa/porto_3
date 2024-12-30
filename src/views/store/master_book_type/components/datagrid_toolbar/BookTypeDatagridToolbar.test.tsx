import * as React from 'react'
import { render } from '@testing-library/react'
import { DataGrid } from '@mui/x-data-grid'
import BookTypeDatagridToolbar from './BookTypeDatagridToolbar'

const Component = () => (
  <DataGrid
    columns={[]}
    rows={[]}
    components={{
      Toolbar: BookTypeDatagridToolbar,
    }}
  />
)

test('renders without crash', () => {
  render(<Component />)
})
