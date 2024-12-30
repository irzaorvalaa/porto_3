import * as React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import RoleManagement from './RoleManagement'

const Component = () => (
  <BrowserRouter>
    <SnackbarProvider>
      <RoleManagement />
    </SnackbarProvider>
  </BrowserRouter>
)

test('renders without crash', () => {
  render(<Component />)
})
