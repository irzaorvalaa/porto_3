import * as React from 'react'
import { render } from '@testing-library/react'
import Search from './Search'

test('renders without crash', () => {
  render(<Search />)
})
