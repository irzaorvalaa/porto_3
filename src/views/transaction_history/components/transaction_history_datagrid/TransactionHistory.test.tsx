import * as React from 'react'
import { render } from '@testing-library/react'
import TransactionHistoryDatagrid from './TransactionHistoryDatagrid'

const Component = () => <TransactionHistoryDatagrid loading={false} rows={[]} />

test('renders without crash', () => {
  render(<Component />)
})
