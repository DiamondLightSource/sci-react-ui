import type { Meta, StoryObj } from "@storybook/react";
import { TableContainer } from "./TableContainer";
import { Table } from "./Table";
import { TableHead } from "./TableHead";
import { TableCell } from "./TableCell";
import { TableRow } from "./TableRow";
import { TableBody } from "./TableBody";
import { Paper } from "../Surfaces/Paper";

const meta: Meta<typeof TableBody> = {
  title: "MUI/Data Display/Table/TableBody",
  component: TableBody,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <TableContainer component={Paper}>
      <Table aria-label="body demo">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Qty</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Apples</TableCell>
            <TableCell align="right">5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Oranges</TableCell>
            <TableCell align="right">3</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ),
};
