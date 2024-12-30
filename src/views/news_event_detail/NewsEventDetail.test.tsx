import * as React from 'react'
import { render } from '@testing-library/react'
import NewsEventDetail from './NewsEventDetail'

test('renders without crash', () => {
  render(<NewsEventDetail />)
})
