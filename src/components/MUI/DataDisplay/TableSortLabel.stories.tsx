import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TableContainer } from "./TableContainer";
import { Table } from "./Table";
import { TableHead } from "./TableHead";
import { TableCell } from "./TableCell";
import { TableRow } from "./TableRow";
import { TableBody } from "./TableBody";
import { Paper } from "../Surfaces/Paper";
import { TableSortLabel } from "./TableSortLabel";

type Row = { name: string; calories: number };
const rows: Row[] = [
  { name: "Frozen yoghurt", calories: 159 },
  { name: "Ice cream sandwich", calories: 237 },
  { name: "Eclair", calories: 262 },
];

const meta: Meta<typeof TableSortLabel> = {
  title: "MUI/Data Display/Table/TableSortLabel",
  component: TableSortLabel,
  parameters: { layout: "padded" },
  argTypes: {
    active: { control: "boolean" },
    direction: { control: { type: "radio" }, options: ["asc", "desc"] },
    disabled: { control: "boolean" },
  },
  args: {
    active: true,
    direction: "asc",
    disabled: false,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [orderAsc, setOrderAsc] = React.useState(args.direction === "asc");
    const [active, setActive] = React.useState(args.active);

    const sorted = [...rows].sort((a, b) =>
      orderAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );

    return (
      <TableContainer component={Paper}>
        <Table aria-label="sort label demo">
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderAsc ? "asc" : "desc"}>
                <TableSortLabel
                  {...args}
                  active={active}
                  direction={orderAsc ? "asc" : "desc"}
                  onClick={() => {
                    setOrderAsc(!orderAsc);
                    setActive(true);
                  }}
                >
                  Dessert (100g serving)
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Calories</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  },
};
``;
