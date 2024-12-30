import * as React from 'react'
import { render } from '@testing-library/react'
import CampusDetail from './CampusDetail'

test('renders without crash', () => {
  render(<CampusDetail />)
})
