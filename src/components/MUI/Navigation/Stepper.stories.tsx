import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

const steps = ["Calibrate instrument", "Acquire data", "Analyse results"];

const meta: Meta<typeof Stepper> = {
  title: "MUI/Navigation/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    alternativeLabel: { control: "boolean" },
    activeStep: {
      control: { type: "number", min: 0, max: steps.length - 1, step: 1 },
    },
  },
  args: {
    orientation: "horizontal",
    alternativeLabel: false,
    activeStep: 0,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    const [active, setActive] = React.useState(0);

    return (
      <Box>
        <Stepper {...args} activeStep={active}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <Button onClick={() => setActive((a) => Math.max(a - 1, 0))}>
            Previous step
          </Button>
          <Button
            variant="contained"
            onClick={() => setActive((a) => Math.min(a + 1, steps.length - 1))}
          >
            Next step
          </Button>
        </Box>
      </Box>
    );
  },
};

export const VerticalWorkflow: Story = {
  args: { orientation: "vertical" },
  render: (args) => {
    const [active, setActive] = React.useState(0);

    return (
      <Box>
        <Stepper {...args} activeStep={active}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Box style={{ display: "flex", gap: 8 }}>
                  <Button onClick={() => setActive((a) => Math.max(a - 1, 0))}>
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() =>
                      setActive((a) => Math.min(a + 1, steps.length - 1))
                    }
                  >
                    Continue
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
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
