import type { Meta, StoryObj } from "@storybook/react";
import { TableContainer } from "./TableContainer";
import { Table } from "./Table";
import { TableHead } from "./TableHead";
import { TableCell } from "./TableCell";
import { TableRow } from "./TableRow";
import { TableBody } from "./TableBody";
import { Paper } from "../Surfaces/Paper";
import { TablePagination } from "./TablePagination";
import React from "react";
import { TableFooter } from "./TableFooter";

type Row = { id: number; name: string };
const rows: Row[] = Array.from({ length: 23 }).map((_, i) => ({
  id: i + 1,
  name: `Row ${i + 1}`,
}));

const meta: Meta<typeof TablePagination> = {
  title: "MUI/Data Display/Table/TablePagination",
  component: TablePagination,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const slice = rows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );

    return (
      <TableContainer component={Paper}>
        <Table aria-label="pagination demo">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slice.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={rows.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    );
  },
};
