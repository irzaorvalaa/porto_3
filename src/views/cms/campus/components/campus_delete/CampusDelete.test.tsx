import * as React from 'react'
import { render } from '@testing-library/react'
import CampusDelete from './CampusDelete'

const Component = () => <CampusDelete open={false} />

test('renders without crash', () => {
  render(<Component />)
})
