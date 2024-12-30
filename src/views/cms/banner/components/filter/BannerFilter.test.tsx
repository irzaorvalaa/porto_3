import * as React from 'react'
import { render } from '@testing-library/react'
import BannerFilter from './BannerFilter'

test('renders without crash', () => {
  render(<BannerFilter />)
})
