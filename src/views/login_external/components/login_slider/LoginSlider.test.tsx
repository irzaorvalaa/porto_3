import * as React from 'react'
import { render } from '@testing-library/react'
import LoginSlider from './LoginSlider'

test('renders without crash', () => {
  render(<LoginSlider />)
})
