import type { Meta, StoryObj } from "@storybook/react";
import { TableContainer } from "./TableContainer";
import { Table } from "./Table";
import { TableHead } from "./TableHead";
import { TableCell } from "./TableCell";
import { TableRow } from "./TableRow";
import { TableBody } from "./TableBody";
import { Paper } from "../Surfaces/Paper";
import { TableFooter } from "./TableFooter";

const meta: Meta<typeof TableFooter> = {
  title: "MUI/Data Display/Table/TableFooter",
  component: TableFooter,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <TableContainer component={Paper}>
      <Table aria-label="footer demo">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Qty</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Apples</TableCell>
            <TableCell>5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Oranges</TableCell>
            <TableCell>3</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Totals</TableCell>
            <TableCell>8</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  ),
};
``;
