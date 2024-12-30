import * as React from 'react'
import { render } from '@testing-library/react'
import HomeSlider from './HomeSlider'

test('renders without crash', () => {
  render(<HomeSlider />)
})
