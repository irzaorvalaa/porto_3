import * as React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Setting from './Setting'

const Component = () => (
  <BrowserRouter>
    <Setting />
  </BrowserRouter>
)

test('renders without crash', () => {
  render(<Component />)
})
