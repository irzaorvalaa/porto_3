import * as React from 'react'
import { render } from '@testing-library/react'
import CampusDatagrid from './CampusDatagrid'

const Component = () => <CampusDatagrid loading={false} rows={[]} />

test('renders without crash', () => {
  render(<Component />)
})
