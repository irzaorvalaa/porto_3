import * as React from 'react'
import { render } from '@testing-library/react'
import MerchantForm from './MerchantForm'

const Component = () => <MerchantForm open={false} />

test('renders without crash', () => {
  render(<Component />)
})
