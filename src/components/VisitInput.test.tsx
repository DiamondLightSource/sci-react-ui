// Adapted from https://github.com/DiamondLightSource/workflows/blob/main/frontend/workflows-lib/tests/components/SubmissionForm.test.tsx
import { fireEvent, render, within } from "@testing-library/react";
import { VisitInput } from "./VisitInput";
import "@testing-library/jest-dom";

it("should render visit field", () => {
  const { getByTestId } = render(<VisitInput onSubmit={() => {}} />);
  expect(getByTestId("visit-field")).toBeInTheDocument();
});

it("should render submit button by default", () => {
  const { getByTestId } = render(<VisitInput onSubmit={() => {}} />);
  expect(getByTestId("submit-button")).toBeInTheDocument();
});

it("should render submit button", () => {
  const { getByTestId } = render(
    <VisitInput onSubmit={() => {}} submitButton={true} />,
  );
  expect(getByTestId("submit-button")).toBeInTheDocument();
});

it("should render visit field without submit func", () => {
  const { getByTestId } = render(<VisitInput />);
  expect(getByTestId("visit-field")).toBeInTheDocument();
});

it("should not render submit button by default", () => {
  const { queryByTestId } = render(<VisitInput />);
  expect(queryByTestId("submit-button")).not.toBeInTheDocument();
});

it("should not render submit button", () => {
  const { queryByTestId } = render(
    <VisitInput onSubmit={() => {}} submitButton={false} />,
  );
  expect(queryByTestId("submit-button")).not.toBeInTheDocument();
});

it("should produce visit and parameters on submit button click", () => {
  const onSubmit = jest.fn();
  const { getByTestId } = render(
    <VisitInput onSubmit={onSubmit} parameters={{ fedid: "abc98765" }} />,
  );
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  fireEvent.change(visitField, { target: { value: "zz12345-7" } });
  const submitButton = getByTestId("submit-button");
  fireEvent.click(submitButton);
  expect(onSubmit).toHaveBeenCalledWith(
    {
      proposalCode: "zz",
      proposalNumber: 12345,
      number: 7,
    },
    {
      fedid: "abc98765",
    },
  );
});

it("should produce visit on submit button click", () => {
  const onSubmit = jest.fn();
  const { getByTestId } = render(<VisitInput onSubmit={onSubmit} />);
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  fireEvent.change(visitField, { target: { value: "zz12345-7" } });
  const submitButton = getByTestId("submit-button");
  fireEvent.click(submitButton);
  expect(onSubmit).toHaveBeenCalledWith(
    {
      proposalCode: "zz",
      proposalNumber: 12345,
      number: 7,
    },
    undefined,
  );
});

it("should not produce parsed visit", () => {
  const onSubmit = jest.fn();
  const { getByTestId } = render(
    <VisitInput onSubmit={onSubmit} submitOnReturn={true} />,
  );
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  fireEvent.change(visitField, { target: { value: "" } });
  fireEvent.keyDown(visitField, {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    charCode: 13,
  });
  expect(onSubmit).not.toHaveBeenCalled();
});

it("should produce visit on enter key down by default", () => {
  const onSubmit = jest.fn();
  const { getByTestId } = render(<VisitInput onSubmit={onSubmit} />);
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  fireEvent.change(visitField, { target: { value: "zz12345-7" } });
  fireEvent.keyDown(visitField, {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    charCode: 13,
  });
  expect(onSubmit).toHaveBeenCalledWith(
    {
      proposalCode: "zz",
      proposalNumber: 12345,
      number: 7,
    },
    undefined,
  );
});

it("should produce visit on enter key down without submit button", () => {
  const onSubmit = jest.fn();
  const { getByTestId } = render(
    <VisitInput onSubmit={onSubmit} submitButton={false} />,
  );
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  fireEvent.change(visitField, { target: { value: "zz12345-7" } });
  fireEvent.keyDown(visitField, {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    charCode: 13,
  });
  expect(onSubmit).toHaveBeenCalledWith(
    {
      proposalCode: "zz",
      proposalNumber: 12345,
      number: 7,
    },
    undefined,
  );
});

it("should not produce visit on enter key down", () => {
  const onSubmit = jest.fn();
  const { getByTestId } = render(
    <VisitInput onSubmit={onSubmit} submitOnReturn={false} />,
  );
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  fireEvent.change(visitField, { target: { value: "zz12345-7" } });
  fireEvent.keyDown(visitField, {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    charCode: 13,
  });
  expect(onSubmit).not.toHaveBeenCalledWith(
    {
      proposalCode: "zz",
      proposalNumber: 12345,
      number: 7,
    },
    undefined,
  );
});

it("should not produce visit on enter key down", () => {
  const onSubmit = jest.fn();
  const { getByTestId } = render(
    <VisitInput onSubmit={onSubmit} submitOnReturn={false} />,
  );
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  fireEvent.change(visitField, { target: { value: "zz12345-7" } });
  fireEvent.keyDown(visitField, {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    charCode: 13,
  });
  expect(onSubmit).not.toHaveBeenCalledWith(
    {
      proposalCode: "zz",
      proposalNumber: 12345,
      number: 7,
    },
    undefined,
  );
});

it("should not produce visit on enter key down with no onSubmit", () => {
  const onSubmit = jest.fn();
  const { getByTestId } = render(<VisitInput />);
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  fireEvent.change(visitField, { target: { value: "zz12345-7" } });
  fireEvent.keyDown(visitField, {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    charCode: 13,
  });
  expect(onSubmit).not.toHaveBeenCalledWith(
    {
      proposalCode: "zz",
      proposalNumber: 12345,
      number: 7,
    },
    undefined,
  );
});

it("should update visit on submit", () => {
  const onSubmit = jest.fn();
  const { getByTestId } = render(
    <VisitInput
      onSubmit={onSubmit}
      visit={{ proposalCode: "xx", proposalNumber: 98765, number: 4 }}
      parameters={{ fedid: "abc98765" }}
    />,
  );
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  fireEvent.change(visitField, { target: { value: "zz12345-7" } });
  const submitButton = getByTestId("submit-button");
  fireEvent.click(submitButton);
  expect(onSubmit).toHaveBeenCalledWith(
    {
      proposalCode: "zz",
      proposalNumber: 12345,
      number: 7,
    },
    {
      fedid: "abc98765",
    },
  );
});
