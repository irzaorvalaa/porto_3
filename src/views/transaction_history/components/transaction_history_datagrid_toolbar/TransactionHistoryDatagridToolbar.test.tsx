import * as React from 'react'
import { render } from '@testing-library/react'
import { DataGrid } from '@mui/x-data-grid'
import TransactionHistoryDatagridToolbar from './TransactionHistoryDatagridToolbar'

const Component = () => (
  <DataGrid
    columns={[]}
    rows={[]}
    components={{
      Toolbar: TransactionHistoryDatagridToolbar,
    }}
  />
)

test('renders without crash', () => {
  render(<Component />)
})
