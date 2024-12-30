import * as React from 'react'
import { render } from '@testing-library/react'
import CalendarFilter from './CalendarFilter'

test('renders without crash', () => {
  render(<CalendarFilter />)
})
