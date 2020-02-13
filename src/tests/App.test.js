import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import { isInputInvalid } from "../components/LocationInput";

beforeEach(() => {
  //TODO
});

test("Location input validation works correctly", () => {
  //test bounds
  expect(isInputInvalid(-90, -180)).toBe(false);
  expect(isInputInvalid(90, 180)).toBe(false);
  expect(isInputInvalid(-90, 180)).toBe(false);
  expect(isInputInvalid(90, -180)).toBe(false);

  //test string inputs
  expect(isInputInvalid("-90", "-180")).toBe(false);
  expect(isInputInvalid("80", "170")).toBe(false);

  //make sure what is coming in can be turned into an integer
  expect(isInputInvalid(null, undefined)).toBe(true);
  expect(isInputInvalid("blah", "-183")).toBe(true);
});
