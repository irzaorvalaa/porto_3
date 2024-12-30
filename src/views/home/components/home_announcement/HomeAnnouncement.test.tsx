import * as React from 'react'
import { render } from '@testing-library/react'
import HomeAnnouncement from './HomeAnnouncement'

test('renders without crash', () => {
  render(<HomeAnnouncement />)
})
