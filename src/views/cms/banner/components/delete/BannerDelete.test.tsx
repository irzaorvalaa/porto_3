import * as React from 'react'
import { render } from '@testing-library/react'
import BannerDelete from './BannerDelete'

const Component = () => <BannerDelete open={false} />

test('renders without crash', () => {
  render(<Component />)
})
