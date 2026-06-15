// Adapted from https://github.com/DiamondLightSource/workflows/blob/main/frontend/workflows-lib/tests/components/SubmissionForm.test.tsx
import { within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../__test-utils__/helpers";

import { VisitInput } from "./VisitInput";

it("should render visit field", () => {
  const { getByTestId } = renderWithProviders(
    <VisitInput onSubmit={() => {}} />,
  );
  expect(getByTestId("visit-field")).toBeInTheDocument();
});

it("should render submit button by default when onSubmit is provided", () => {
  const { getByTestId } = renderWithProviders(
    <VisitInput onSubmit={() => {}} />,
  );
  expect(getByTestId("submit-button")).toBeInTheDocument();
});

it("should render submit button when submitButton is true", () => {
  const { getByTestId } = renderWithProviders(
    <VisitInput onSubmit={() => {}} submitButton={true} />,
  );
  expect(getByTestId("submit-button")).toBeInTheDocument();
});

it("should render visit field when onSubmit is not provided", () => {
  const { getByTestId } = renderWithProviders(<VisitInput />);
  expect(getByTestId("visit-field")).toBeInTheDocument();
});

it("should not render submit button by default when onSubmit is not provided", () => {
  const { queryByTestId } = renderWithProviders(<VisitInput />);
  expect(queryByTestId("submit-button")).not.toBeInTheDocument();
});

it("should not render submit button when submitButton is false", () => {
  const { queryByTestId } = renderWithProviders(
    <VisitInput onSubmit={() => {}} submitButton={false} />,
  );
  expect(queryByTestId("submit-button")).not.toBeInTheDocument();
});

it("should call onSubmit with parsed visit and parameters on submit button click", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  const { getByTestId } = renderWithProviders(
    <VisitInput onSubmit={onSubmit} parameters={{ fedid: "abc98765" }} />,
  );
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  await user.type(visitField, "zz12345-7");
  await user.click(getByTestId("submit-button"));
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

it("should call onSubmit with parsed visit on submit button click", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  const { getByTestId } = renderWithProviders(
    <VisitInput onSubmit={onSubmit} />,
  );
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  await user.type(visitField, "zz12345-7");
  await user.click(getByTestId("submit-button"));
  expect(onSubmit).toHaveBeenCalledWith(
    {
      proposalCode: "zz",
      proposalNumber: 12345,
      number: 7,
    },
    undefined,
  );
});

it("should not call onSubmit for empty visit input", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  const { getByTestId } = renderWithProviders(
    <VisitInput onSubmit={onSubmit} submitOnReturn={true} />,
  );
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  await user.click(visitField);
  await user.keyboard("{Enter}");
  expect(onSubmit).not.toHaveBeenCalled();
});

it("should call onSubmit with parsed visit on enter key down by default", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  const { getByTestId } = renderWithProviders(
    <VisitInput onSubmit={onSubmit} />,
  );
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  await user.type(visitField, "zz12345-7");
  await user.keyboard("{Enter}");
  expect(onSubmit).toHaveBeenCalledWith(
    {
      proposalCode: "zz",
      proposalNumber: 12345,
      number: 7,
    },
    undefined,
  );
});

it("should call onSubmit with parsed visit on enter key down when submitButton is false", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  const { getByTestId } = renderWithProviders(
    <VisitInput onSubmit={onSubmit} submitButton={false} />,
  );
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  await user.type(visitField, "zz12345-7");
  await user.keyboard("{Enter}");
  expect(onSubmit).toHaveBeenCalledWith(
    {
      proposalCode: "zz",
      proposalNumber: 12345,
      number: 7,
    },
    undefined,
  );
});

it("should not call onSubmit on enter key down when submitOnReturn is false", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  const { getByTestId } = renderWithProviders(
    <VisitInput onSubmit={onSubmit} submitOnReturn={false} />,
  );
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  await user.type(visitField, "zz12345-7");
  await user.keyboard("{Enter}");
  expect(onSubmit).not.toHaveBeenCalled();
});

it("should not call onSubmit on enter key down when onSubmit is not provided", async () => {
  const user = userEvent.setup();
  const { getByTestId } = renderWithProviders(<VisitInput />);
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  await user.type(visitField, "zz12345-7");
  await user.keyboard("{Enter}");
});

it("should call onSubmit with updated visit on submit button click", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  const { getByTestId } = renderWithProviders(
    <VisitInput
      onSubmit={onSubmit}
      visit={{ proposalCode: "xx", proposalNumber: 98765, number: 4 }}
      parameters={{ fedid: "abc98765" }}
    />,
  );
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  await user.clear(visitField);
  await user.type(visitField, "zz12345-7");
  await user.click(getByTestId("submit-button"));
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

it("should not call onSubmit on blur by default", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  const { getByTestId } = renderWithProviders(
    <VisitInput onSubmit={onSubmit} />,
  );
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  await user.type(visitField, "zz12345-7");
  await user.tab();
  expect(onSubmit).not.toHaveBeenCalled();
});

it("should call onSubmit with parsed visit on blur when submitButton is false", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  const { getByTestId } = renderWithProviders(
    <VisitInput onSubmit={onSubmit} submitButton={false} submitOnBlur={true} />,
  );
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  await user.type(visitField, "zz12345-7");
  await user.tab();
  expect(onSubmit).toHaveBeenCalledWith(
    {
      proposalCode: "zz",
      proposalNumber: 12345,
      number: 7,
    },
    undefined,
  );
});

it("should not call onSubmit on blur when submitOnBlur is false", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  const { getByTestId } = renderWithProviders(
    <VisitInput onSubmit={onSubmit} submitOnBlur={false} />,
  );
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  await user.type(visitField, "zz12345-7");
  await user.tab();
  expect(onSubmit).not.toHaveBeenCalled();
});

it("should call onSubmit with parsed visit on blur when submitOnBlur is true", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  const { getByTestId } = renderWithProviders(
    <VisitInput onSubmit={onSubmit} submitOnBlur={true} />,
  );
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  await user.type(visitField, "zz12345-7");
  await user.tab();
  expect(onSubmit).toHaveBeenCalledWith(
    {
      proposalCode: "zz",
      proposalNumber: 12345,
      number: 7,
    },
    undefined,
  );
});

it("should not call onSubmit on blur when onSubmit is not provided", async () => {
  const user = userEvent.setup();
  const { getByTestId } = renderWithProviders(
    <VisitInput submitOnBlur={true} />,
  );
  const visitField = within(getByTestId("visit-field")).getByRole("textbox");
  await user.type(visitField, "zz12345-7");
  await user.tab();
});
