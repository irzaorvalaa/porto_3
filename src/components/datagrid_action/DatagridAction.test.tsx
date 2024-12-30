import * as React from 'react'
import { render } from '@testing-library/react'
import DatagridAction from './DatagridAction'

const Component = () => <DatagridAction />

test('renders without crash', () => {
  render(<Component />)
})
