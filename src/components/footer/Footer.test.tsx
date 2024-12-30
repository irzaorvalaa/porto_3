import * as React from 'react'
import { render } from '@testing-library/react'
import Footer from './Footer'
import { BrowserRouter } from 'react-router-dom'

const Component = () => (
  <BrowserRouter>
    <Footer />
  </BrowserRouter>
)

test('renders without crash', () => {
  render(<Component />)
})
