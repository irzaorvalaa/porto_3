import * as React from 'react'
import { render } from '@testing-library/react'
import BannerForm from './BannerForm'

const Component = () => <BannerForm open={false} />

test('renders without crash', () => {
  render(<Component />)
})
