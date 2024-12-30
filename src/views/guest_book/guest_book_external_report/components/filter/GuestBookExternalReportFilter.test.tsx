import * as React from 'react'
import { render } from '@testing-library/react'
import GuestBookExternalReportFilter from './GuestBookExternalReportFilter'

test('renders without crash', () => {
  render(<GuestBookExternalReportFilter />)
})
