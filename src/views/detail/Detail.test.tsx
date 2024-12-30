import * as React from 'react'
import { render } from '@testing-library/react'
import Detail from './Detail'

test('renders without crash', () => {
  render(<Detail />)
})
