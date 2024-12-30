import * as React from 'react'
import { render } from '@testing-library/react'
import MerchantDelete from './MerchantDelete'

const Component = () => <MerchantDelete open={false} />

test('renders without crash', () => {
  render(<Component />)
})
