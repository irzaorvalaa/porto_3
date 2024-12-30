import * as React from 'react'
import { render } from '@testing-library/react'
import { SnackbarProvider } from 'notistack'
import TalkToUs from './TalkToUs'

const Component = () => (
  <SnackbarProvider>
    <TalkToUs open={false} />
  </SnackbarProvider>
)

test('renders without crash', () => {
  render(<Component />)
})
