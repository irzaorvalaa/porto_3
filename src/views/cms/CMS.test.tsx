import * as React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Settings from "./CMS";

const Component = () => (
  <BrowserRouter>
    <Settings />
  </BrowserRouter>
);

test("renders without crash", () => {
  render(<Component />);
});
