import type { Meta, StoryObj } from "@storybook/react";
import { TableContainer } from "./TableContainer";
import { Table } from "./Table";
import { TableHead } from "./TableHead";
import { TableCell } from "./TableCell";
import { TableRow } from "./TableRow";
import { TableBody } from "./TableBody";
import { Paper } from "../Surfaces/Paper";

const meta: Meta<typeof TableHead> = {
  title: "MUI/Data Display/Table/TableHead",
  component: TableHead,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <TableContainer component={Paper}>
      <Table aria-label="head demo">
        <TableHead>
          <TableRow>
            <TableCell>Column A</TableCell>
            <TableCell>Column B</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>A1</TableCell>
            <TableCell>B1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>A2</TableCell>
            <TableCell>B2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ),
};
