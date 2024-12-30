import * as React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { initialAuthState } from "../../constants/AuthState";
import LoginExternal from "./LoginExternal";

const mockStore = configureMockStore();
const store = mockStore({ auth: initialAuthState });

const Component = () => (
  <Provider store={store}>
    <LoginExternal />
  </Provider>
);

test("renders without crash", () => {
  render(<Component />);
});
