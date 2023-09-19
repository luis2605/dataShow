import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, getAllByTestId } from "@testing-library/react";
import CSVToJSON from "./CSVToJSON";

// Mock the intro.js-react module only in this test file
jest.mock("intro.js-react", () => {
  return {
    __esModule: true,
    Steps: () => <div data-testid="steps-mock" />,
  };
});

// Test cases
it("should render FilterComponent without errors", () => {
  const component = renderer.create(<CSVToJSON />);
  const tree = component.toJSON();
  expect(tree).toBeTruthy();
});

it("should match snapshot with default values", () => {
  const component = renderer.create(<CSVToJSON />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("should interact with FilterComponent", () => {
  const { getByTestId, getByText, queryByText } = render(<CSVToJSON />);
  const input = getByTestId("name");
  fireEvent.change(input, { target: { value: "John Doe" } });
  //   fireEvent.click(getByTestId("ok"));
  //   fireEvent.change(input, { target: { value: "" } }); // Simulate clearing the input
  //   fireEvent.click(getByTestId("ok")); // Submit without a name
  //   expect(queryByText("John Doe")).toBeInTheDocument(); // Name should still be present
});
