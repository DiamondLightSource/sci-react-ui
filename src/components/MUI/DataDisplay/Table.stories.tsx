import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

const rows = [
  { name: "Frozen yoghurt", calories: 159, fat: 6.0 },
  { name: "Ice cream sandwich", calories: 237, fat: 9.0 },
  { name: "Eclair", calories: 262, fat: 16.0 },
];

const meta: Meta<typeof Table> = {
  title: "MUI/Data Display/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: { controls: { expanded: true }, layout: "padded" },
  argTypes: {
    size: { control: "select", options: ["small", "medium"] },
    stickyHeader: { control: "boolean" },
  },
  args: { size: "medium", stickyHeader: false },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <TableContainer component={Paper}>
      <Table {...args} aria-label="basic table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.name}>
              <TableCell>{r.name}</TableCell>
              <TableCell align="right">{r.calories}</TableCell>
              <TableCell align="right">{r.fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

export const Dense: Story = {
  args: { size: "small" },
  render: (args) => (
    <TableContainer component={Paper}>
      <Table {...args}>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Val</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.name}>
              <TableCell>{r.name}</TableCell>
              <TableCell align="right">{r.calories}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};
