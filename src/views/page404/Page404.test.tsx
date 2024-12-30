import * as React from 'react'
import { render } from '@testing-library/react'
import Page404 from './Page404'
import { BrowserRouter } from 'react-router-dom'

const Component = () => (
  <BrowserRouter>
    <Page404 />
  </BrowserRouter>
)

test('renders without crash', () => {
  render(<Component />)
})
