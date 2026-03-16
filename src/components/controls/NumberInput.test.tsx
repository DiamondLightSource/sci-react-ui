import { render, screen, fireEvent } from "@testing-library/react";
import { NumberInput } from "./NumberInput";

describe("NumberInput", () => {
  it("default value is marked invalid", async () => {
    render(
      <NumberInput label="numberbox" numberMode="natural" defaultValue={5.2} />,
    );
    expect(screen.queryByText("Invalid input")).toBeInTheDocument();
  });

  it("default value is marked outside limits", async () => {
    render(
      <NumberInput
        label="numberbox"
        numberMode="natural"
        defaultValue={15}
        maxValue={10}
      />,
    );
    expect(screen.queryByText("Outside limits")).toBeInTheDocument();
  });

  it("default value is marked valid", async () => {
    render(
      <NumberInput label="numberbox" numberMode="natural" defaultValue={5} />,
    );
    expect(screen.queryByText("Invalid input")).not.toBeInTheDocument();
  });

  it("default helper text is not shown", async () => {
    render(
      <NumberInput label="numberbox" numberMode="natural" helperText={false} />,
    );
    expect(screen.queryByText("A natural number")).not.toBeInTheDocument();
  });

  it("is marked valid when limits are present", async () => {
    render(
      <NumberInput
        label="numberbox"
        numberMode="natural"
        defaultValue={1}
        minValue={-2}
        maxValue={2}
      />,
    );
    const numberInput = screen.getByLabelText("numberbox");
    fireEvent.change(numberInput, { target: { value: "0" } });
    expect(screen.queryByText("Invalid input")).not.toBeInTheDocument();
  });

  it("is marked invalid when a lower limit is exceeded", async () => {
    render(
      <NumberInput
        label="numberbox"
        numberMode="integer"
        defaultValue={1}
        minValue={0}
      />,
    );
    const numberInput = screen.getByLabelText("numberbox");
    fireEvent.change(numberInput, { target: { value: "-1" } });
    expect(screen.queryByText("Outside limits")).toBeInTheDocument();
  });

  it("is marked invalid when an upper limit is exceeded", async () => {
    render(
      <NumberInput
        label="numberbox"
        numberMode="natural"
        defaultValue={1}
        maxValue={10}
      />,
    );
    const numberInput = screen.getByLabelText("numberbox");
    fireEvent.change(numberInput, { target: { value: "15" } });
    expect(screen.queryByText("Outside limits")).toBeInTheDocument();
  });

  it("does not accept negative numbers in natural mode", async () => {
    render(
      <NumberInput label="numberbox" numberMode="natural" defaultValue={1} />,
    );
    const numberInput = screen.getByLabelText("numberbox");
    fireEvent.change(numberInput, { target: { value: "-5" } });
    expect(screen.queryByText("Invalid input")).toBeInTheDocument();
  });

  it("accepts positive numbers in natural mode", async () => {
    render(
      <NumberInput label="numberbox" numberMode="natural" defaultValue={1} />,
    );
    const numberInput = screen.getByLabelText("numberbox");
    fireEvent.change(numberInput, { target: { value: "5" } });
    expect(screen.queryByText("Invalid input")).not.toBeInTheDocument();
  });

  it("does not accept decimal numbers in integer mode", async () => {
    render(
      <NumberInput label="numberbox" numberMode="integer" defaultValue={0} />,
    );
    const numberInput = screen.getByLabelText("numberbox");
    fireEvent.change(numberInput, { target: { value: "-5.2" } });
    expect(screen.queryByText("Invalid input")).toBeInTheDocument();
  });

  it("accepts negative numbers in integer mode", async () => {
    render(
      <NumberInput label="numberbox" numberMode="integer" defaultValue={0} />,
    );
    const numberInput = screen.getByLabelText("numberbox");
    fireEvent.change(numberInput, { target: { value: "-5" } });
    expect(screen.queryByText("Invalid input")).not.toBeInTheDocument();
  });

  it("does not accept scientific numbers in floating mode", async () => {
    render(
      <NumberInput label="numberbox" numberMode="floating" defaultValue={0} />,
    );
    const numberInput = screen.getByLabelText("numberbox");
    fireEvent.change(numberInput, { target: { value: "-5e5" } });
    expect(screen.queryByText("Invalid input")).toBeInTheDocument();
  });

  it("accepts decimal numbers in floating mode", async () => {
    render(
      <NumberInput label="numberbox" numberMode="floating" defaultValue={0} />,
    );
    const numberInput = screen.getByLabelText("numberbox");
    fireEvent.change(numberInput, { target: { value: "-5.2" } });
    expect(screen.queryByText("Invalid input")).not.toBeInTheDocument();
  });

  it("does not accept non-number characters in scientific mode", async () => {
    render(
      <NumberInput
        label="numberbox"
        numberMode="scientific"
        defaultValue={0}
      />,
    );
    const numberInput = screen.getByLabelText("numberbox");
    fireEvent.change(numberInput, { target: { value: "-5e5!" } });
    expect(screen.queryByText("Invalid input")).toBeInTheDocument();
  });

  it("accepts scientific numbers in scientific mode", async () => {
    render(
      <NumberInput
        label="numberbox"
        numberMode="scientific"
        defaultValue={0}
      />,
    );

    const numberInput = screen.getByLabelText("numberbox");
    fireEvent.change(numberInput, { target: { value: "5e5" } });
    expect(screen.queryByText("Invalid input")).not.toBeInTheDocument();
  });
});
