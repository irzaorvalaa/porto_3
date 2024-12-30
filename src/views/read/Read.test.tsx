import * as React from 'react'
import { render } from '@testing-library/react'
import Read from './Read'

test('renders without crash', () => {
  render(<Read />)
})
