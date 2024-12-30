import * as React from 'react'
import { render } from '@testing-library/react'
import NewsDatagrid from './NewsDatagrid'

const Component = () => (
  <NewsDatagrid loading={false} rows={[]} />
)

test('renders without crash', () => {
  render(<Component />)
})
