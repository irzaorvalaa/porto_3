import * as React from 'react'
import { render } from '@testing-library/react'
import ReferenceClinicDatagrid from './ReferenceClinicDatagrid'

const Component = () => <ReferenceClinicDatagrid loading={false} rows={[]} />

test('renders without crash', () => {
  render(<Component />)
})
