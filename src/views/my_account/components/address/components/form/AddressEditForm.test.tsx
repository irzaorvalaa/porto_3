import * as React from 'react'
import { render } from '@testing-library/react'
import AddressEditForm from './AddressEditForm'

const Component = () => <AddressEditForm open={false} />

test('renders without crash', () => {
  render(<Component />)
})
