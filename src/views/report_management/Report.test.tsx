import * as React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Report from './Report'

const Component = () => (
  <BrowserRouter>
    <Report />
  </BrowserRouter>
)

test('renders without crash', () => {
  render(<Component />)
})
