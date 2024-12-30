import * as React from 'react'
import { render } from '@testing-library/react'
import ReferenceClinicDelete from './ReferenceClinicDelete'

const Component = () => <ReferenceClinicDelete open={false} />

test('renders without crash', () => {
  render(<Component />)
})
