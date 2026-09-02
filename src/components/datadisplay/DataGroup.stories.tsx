import { Meta, StoryObj } from "@storybook/react";
import { DataGroup } from "./DataCard";

const meta = {
    title: "Components/Data Display/DataGroup",
    component: DataGroup,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                 "A grouped collection of data objects. Note that, unlike DataCard, this component has no colour support."
            }
        }
    }
} satisfies Meta<typeof DataGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
    args: {
        items: [
            {
                title: "Ring current",
                value: { value: "299.97", suffix: "mA" },
                subvalue: { label: "Refill in", value: "492", suffix: "s" },
            },
            {
                title: "Current sample",
                value1: { label: "Puck", value: "4" },
                value2: { label: "Pin", value: "6" },
                subvalue: { label: "Name", value: "AlOx 06" },
            },
            {
                title: "Run ID",
                value: { value: "ixx-15542" },
            },
            {
                title: "Scan progress",
                value: { value: "35", suffix: "%" },
                subvalue: { label: "Remaining", value: "11m 46s" },
            }
        ]
    }
}