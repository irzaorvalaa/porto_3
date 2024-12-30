import * as React from 'react'
import { render } from '@testing-library/react'
import HeroPage from './HeroPage'

const Component = () => <HeroPage title="Title" />

test('renders without crash', () => {
  render(<Component />)
})
