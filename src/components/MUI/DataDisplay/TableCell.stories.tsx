import type { Meta, StoryObj } from "@storybook/react";
import { TableContainer } from "./TableContainer";
import { Table } from "./Table";
import { TableHead } from "./TableHead";
import { TableCell } from "./TableCell";
import { TableRow } from "./TableRow";
import { TableBody } from "./TableBody";
import { Paper } from "../Surfaces/Paper";

const meta: Meta<typeof TableCell> = {
  title: "MUI/Data Display/Table/TableCell",
  component: TableCell,
  parameters: { layout: "padded" },
  argTypes: {
    align: {
      control: { type: "radio" },
      options: ["inherit", "left", "center", "right", "justify"],
    },
    padding: { control: { type: "radio" }, options: ["normal", "none"] },
    scope: { control: "text" },
  },
  args: {
    align: "left",
    padding: "normal",
    scope: "row",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <TableContainer component={Paper}>
      <Table aria-label="cell demo">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Qty</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell {...args}>Apples</TableCell>
            <TableCell align="right">5</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ),
};
