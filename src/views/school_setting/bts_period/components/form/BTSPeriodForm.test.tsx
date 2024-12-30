import * as React from 'react'
import { render } from '@testing-library/react'
import BTSPeriodForm from './BTSPeriodForm'

const Component = () => <BTSPeriodForm open={false} />

test('renders without crash', () => {
  render(<Component />)
})
