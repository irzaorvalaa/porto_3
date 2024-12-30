import * as React from 'react'
import { render } from '@testing-library/react'
import BannerDatagrid from './BannerDatagrid'

const Component = () => <BannerDatagrid loading={false} rows={[]} />

test('renders without crash', () => {
  render(<Component />)
})
