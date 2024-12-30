import * as React from 'react'
import { render } from '@testing-library/react'
import { DataGrid } from '@mui/x-data-grid'
import CalendarDatagridToolbar from './CalendarDatagridToolbar'

const Component = () => (
  <DataGrid
    columns={[]}
    rows={[]}
    components={{
      Toolbar: CalendarDatagridToolbar,
    }}
  />
)

test('renders without crash', () => {
  render(<Component />)
})
