import * as React from 'react'
import { render } from '@testing-library/react'
import CampusForm from './CampusForm'

const Component = () => <CampusForm open={false} />

test('renders without crash', () => {
  render(<Component />)
})
