import * as React from 'react'
import { render } from '@testing-library/react'
import BookTypeDatagrid from './BookTypeDatagrid'

const Component = () => (
  <BookTypeDatagrid loading={false} rows={[]} />
)

test('renders without crash', () => {
  render(<Component />)
})
