import * as React from 'react'
import { render } from '@testing-library/react'
import HomeLibrary from './HomeLibrary'

test('renders without crash', () => {
  render(<HomeLibrary />)
})
