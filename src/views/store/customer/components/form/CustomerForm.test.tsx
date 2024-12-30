import * as React from 'react'
import { render } from '@testing-library/react'
import CustomerForm from './CustomerForm'

const Component = () => <CustomerForm open={false} />

test('renders without crash', () => {
  render(<Component />)
})
