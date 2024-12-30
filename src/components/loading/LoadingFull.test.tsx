import * as React from 'react'
import { render } from '@testing-library/react'
import LoadingFull from './LoadingFull'

test('renders without crash', () => {
  render(<LoadingFull />)
})
