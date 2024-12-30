import * as React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import GuestBook from './GuestBook'

const Component = () => (
  <BrowserRouter>
    <GuestBook />
  </BrowserRouter>
)

test('renders without crash', () => {
  render(<Component />)
})
