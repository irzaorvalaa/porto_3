import * as React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SchoolSetting from './SchoolSetting'

const Component = () => (
  <BrowserRouter>
    <SchoolSetting />
  </BrowserRouter>
)

test('renders without crash', () => {
  render(<Component />)
})
