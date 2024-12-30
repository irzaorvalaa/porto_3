import * as React from 'react'
import { render } from '@testing-library/react'
import GuestBookExternalFilter from './GuestBookExternalFilter'

test('renders without crash', () => {
  render(<GuestBookExternalFilter />)
})
