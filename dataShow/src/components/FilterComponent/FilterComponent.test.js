import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";
import FilterComponent from "./FilterComponent";

// Mock the intro.js-react module only in this test file
jest.mock("intro.js-react", () => {
  return {
    __esModule: true,
    Steps: () => <div data-testid="steps-mock" />,
  };
});

// Test cases
it("should render FilterComponent without errors", () => {
  const component = renderer.create(<FilterComponent />);
  const tree = component.toJSON();
  expect(tree).toBeTruthy();
});

it("should match snapshot with default values", () => {
  const component = renderer.create(<FilterComponent />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
