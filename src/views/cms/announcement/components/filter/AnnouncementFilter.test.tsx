import * as React from 'react'
import { render } from '@testing-library/react'
import AnnouncementFilter from './AnnouncementFilter'

test('renders without crash', () => {
  render(<AnnouncementFilter />)
})
