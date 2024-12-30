import * as React from 'react'
import { render } from '@testing-library/react'
import { DataGrid } from '@mui/x-data-grid'
import AnnouncementDatagridToolbar from './AnnouncementDatagridToolbar'

const Component = () => (
  <DataGrid
    columns={[]}
    rows={[]}
    components={{
      Toolbar: AnnouncementDatagridToolbar,
    }}
  />
)

test('renders without crash', () => {
  render(<Component />)
})
