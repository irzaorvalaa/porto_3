import * as React from 'react'
import { render } from '@testing-library/react'
import BookTypeFilter from './BookTypeFilter'

test('renders without crash', () => {
  render(<BookTypeFilter />)
})
