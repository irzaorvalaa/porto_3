import * as React from 'react'
import { render } from '@testing-library/react'
import GuestBookExternalDelete from './GuestBookExternalDelete'

const Component = () => <GuestBookExternalDelete open={false} />

test('renders without crash', () => {
  render(<Component />)
})
