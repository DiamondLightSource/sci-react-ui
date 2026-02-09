import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "./Stepper";
import React from "react";
import StepLabel from "@mui/material/StepLabel";
import Step from "@mui/material/Step";
import { Button } from "../Inputs/Button";
import StepContent from "@mui/material/StepContent";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

const meta: Meta<typeof Stepper> = {
  title: "MUI/Navigation/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    alternativeLabel: { control: "boolean" },
    activeStep: {
      control: { type: "number", min: 0, max: steps.length - 1, step: 1 },
    },
  },
  args: { orientation: "horizontal", alternativeLabel: false, activeStep: 0 },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Controlled: Story = {
  render: (args) => {
    const [active, setActive] = React.useState(0);
    return (
      <div style={{ display: "grid", gap: 12 }}>
        <Stepper {...args} activeStep={active}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={() => setActive((a) => Math.max(a - 1, 0))}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={() => setActive((a) => Math.min(a + 1, steps.length - 1))}
          >
            Next
          </Button>
        </div>
      </div>
    );
  },
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => {
    const [active, setActive] = React.useState(0);
    return (
      <div style={{ display: "grid", gap: 12 }}>
        <Stepper {...args} activeStep={active}>
          {steps.map((label, idx) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <div style={{ display: "flex", gap: 8 }}>
                  <Button onClick={() => setActive((a) => Math.max(a - 1, 0))}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() =>
                      setActive((a) => Math.min(a + 1, steps.length - 1))
                    }
                  >
                    Next
                  </Button>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
    );
  },
};

export const AlternativeLabel: Story = {
  args: { alternativeLabel: true },
  render: (args) => (
    <Stepper {...args}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  ),
};
