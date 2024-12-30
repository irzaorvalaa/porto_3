import * as React from 'react'
import { render } from '@testing-library/react'
import AnnouncementDetail from './AnnouncementDetail'

test('renders without crash', () => {
  render(<AnnouncementDetail />)
})
