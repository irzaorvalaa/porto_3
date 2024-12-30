import * as React from "react";
import { render } from "@testing-library/react";
import HomeServiceHours from "./HomeServiceHours";

test("renders without crash", () => {
  render(<HomeServiceHours />);
});
