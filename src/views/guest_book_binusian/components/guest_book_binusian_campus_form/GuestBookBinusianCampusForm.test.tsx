import * as React from 'react'
import { render } from '@testing-library/react'
import GuestBookBinusianCampusForm from './GuestBookBinusianCampusForm'

const Component = () => <GuestBookBinusianCampusForm open={false} />

test('renders without crash', () => {
  render(<Component />)
})
