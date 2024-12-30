import * as React from 'react'
import { render } from '@testing-library/react'
import ReferenceClinicForm from './ReferenceClinicForm'

const Component = () => <ReferenceClinicForm open={false} />

test('renders without crash', () => {
  render(<Component />)
})
