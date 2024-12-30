import * as React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import TransactionHistory from './TransactionHistory'

const Component = () => (
  <BrowserRouter>
    <TransactionHistory />
  </BrowserRouter>
)

test('renders without crash', () => {
  render(<Component />)
})
