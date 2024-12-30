import * as React from 'react'
import { render } from '@testing-library/react'
import HomeNewsEvent from './HomeNewsEvent'

test('renders without crash', () => {
  render(<HomeNewsEvent />)
})
