import * as React from 'react'
import { render } from '@testing-library/react'
import TransactionHistoryFilter from './TransactionHistoryFilter'

test('renders without crash', () => {
  render(<TransactionHistoryFilter />)
})
