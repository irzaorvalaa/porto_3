import * as React from 'react'
import { render } from '@testing-library/react'
import HomeCollection from './HomeCollection'

test('renders without crash', () => {
  render(<HomeCollection />)
})
