import * as React from 'react'
import { render } from '@testing-library/react'
import AnnouncementDelete from './AnnouncementDelete'

const Component = () => <AnnouncementDelete open={false} />

test('renders without crash', () => {
  render(<Component />)
})
