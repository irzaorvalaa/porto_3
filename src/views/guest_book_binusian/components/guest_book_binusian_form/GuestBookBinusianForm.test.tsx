import * as React from 'react'
import { render } from '@testing-library/react'
import GuestBookBinusianForm from './GuestBookBinusianForm'

const Component = () => <GuestBookBinusianForm />

test('renders without crash', () => {
  render(<Component />)
})
