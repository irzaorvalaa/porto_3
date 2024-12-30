import * as React from 'react'
import { render } from '@testing-library/react'
import CustomerFilter from './CustomerFilter'

test('renders without crash', () => {
  render(<CustomerFilter />)
})
