import * as React from 'react'
import { render } from '@testing-library/react'
import HomeMenu from './HomeMenu'

test('renders without crash', () => {
  render(<HomeMenu />)
})
