import * as React from 'react'
import { render } from '@testing-library/react'
import Dashboard from './Dashboard'

test('renders without crash', () => {
  render(<Dashboard />)
})
