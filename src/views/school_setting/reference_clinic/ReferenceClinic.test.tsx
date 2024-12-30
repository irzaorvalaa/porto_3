import * as React from 'react'
import { render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { SnackbarProvider } from 'notistack'
import { initialAuthState } from '../../../constants/AuthState'
import ReferenceClinic from './ReferenceClinic'

const mockStore = configureMockStore()
const store = mockStore({ auth: initialAuthState })

const Component = () => (
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider>
        <ReferenceClinic />
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
