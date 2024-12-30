import * as React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Store from './Store'

const Component = () => (
  <BrowserRouter>
    <Store />
  </BrowserRouter>
)

test('renders without crash', () => {
  render(<Component />)
})
