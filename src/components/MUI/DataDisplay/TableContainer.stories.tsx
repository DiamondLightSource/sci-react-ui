import type { Meta, StoryObj } from "@storybook/react";
import { TableContainer } from "./TableContainer";
import { Table } from "./Table";
import { TableHead } from "./TableHead";
import { TableCell } from "./TableCell";
import { TableRow } from "./TableRow";
import { TableBody } from "./TableBody";
import { Paper } from "../Surfaces/Paper";

const meta: Meta<typeof TableContainer> = {
  title: "MUI/Data Display/Table/TableContainer",
  component: TableContainer,
  parameters: { layout: "padded" },
  argTypes: {
    component: { control: "text" },
  },
  args: {
    component: "div",
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <TableContainer {...args} component={Paper} sx={{ maxHeight: 280 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Header A</TableCell>
            <TableCell>Header B</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 12 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>Row {i + 1} A</TableCell>
              <TableCell>Row {i + 1} B</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};
