import * as React from 'react'
import { render } from '@testing-library/react'
import GuestBookExternalForm from './GuestBookExternalForm'

const Component = () => <GuestBookExternalForm open={false} />

test('renders without crash', () => {
  render(<Component />)
})
