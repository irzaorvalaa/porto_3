import * as React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { act } from 'react-dom/test-utils'
import configureMockStore from 'redux-mock-store'
import { SnackbarProvider } from 'notistack'
import { initialAuthState } from '../../constants/AuthState'
import AppRoutes from './'

const mockStore = configureMockStore()
const store = mockStore({ auth: initialAuthState })

jest.setTimeout(60000)

const Component = () => (
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider>
        <AppRoutes />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>
)

test('renders without crash', async () => {
  const promise = Promise.resolve()

  render(<Component />)

  await act(async () => {
    await promise
  })
})
