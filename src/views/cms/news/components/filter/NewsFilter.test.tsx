import * as React from 'react'
import { render } from '@testing-library/react'
import NewsFilter from './NewsFilter'

test('renders without crash', () => {
  render(<NewsFilter />)
})
