import type { Meta, StoryObj } from "@storybook/react";
import { TableContainer } from "./TableContainer";
import { Table } from "./Table";
import { TableHead } from "./TableHead";
import { TableCell } from "./TableCell";
import { TableRow } from "./TableRow";
import { TableBody } from "./TableBody";
import { Paper } from "../Surfaces/Paper";

const meta: Meta<typeof TableRow> = {
  title: "MUI/Data Display/Table/TableRow",
  component: TableRow,
  parameters: { layout: "padded" },
  argTypes: {
    hover: { control: "boolean" },
    selected: { control: "boolean" },
  },
  args: {
    hover: true,
    selected: false,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <TableContainer component={Paper}>
      <Table aria-label="row demo">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Qty</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow {...args}>
            <TableCell>Apples</TableCell>
            <TableCell>5</TableCell>
          </TableRow>
          <TableRow {...args}>
            <TableCell>Oranges</TableCell>
            <TableCell>3</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ),
};
