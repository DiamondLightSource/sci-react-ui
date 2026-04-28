import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";
import { TableContainer } from "./TableContainer";
import { TableRow } from "./TableRow";
import { TableCell } from "./TableCell";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import { Paper } from "../Surfaces/Paper";

type Dessert = {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
};
const rows: Dessert[] = [
  { name: "Frozen yoghurt", calories: 159, fat: 6, carbs: 24, protein: 4 },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9,
    carbs: 37,
    protein: 4.3,
  },
  { name: "Eclair", calories: 262, fat: 16, carbs: 24, protein: 6 },
];

const meta: Meta<typeof Table> = {
  title: "MUI/Data Display/Table/Table",
  component: Table,
  parameters: { layout: "padded" },
  argTypes: {
    size: { control: { type: "radio" }, options: ["small", "medium"] },
    padding: {
      control: { type: "radio" },
      options: ["normal", "none", "checkbox"],
    },
    stickyHeader: { control: "boolean" },
  },
  args: {
    size: "medium",
    padding: "normal",
    stickyHeader: false,
  },
};

const selectedNames = ["Ice cream sandwich"];
import Checkbox from "@mui/material/Checkbox";

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: args.stickyHeader ? 320 : "auto" }}
    >
      <Table {...args} aria-label="desserts">
        <TableHead>
          <TableRow>
            <TableCell>Dessert</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};
export const HoverRows: Story = {
  render: (args) => (
    <TableContainer component={Paper}>
      <Table {...args} aria-label="desserts with hover rows">
        <TableHead>
          <TableRow>
            <TableCell>Dessert</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow hover key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};
export const SelectedRows: Story = {
  render: (args) => (
    <TableContainer component={Paper}>
      <Table {...args} aria-label="desserts with selected rows">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate
                checked={selectedNames.length > 0}
              />
            </TableCell>
            <TableCell>Dessert</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => {
            const isSelected = selectedNames.includes(row.name);

            return (
              <TableRow key={row.name} selected={isSelected}>
                <TableCell padding="checkbox">
                  <Checkbox checked={isSelected} />
                </TableCell>

                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};
export const HoverSelectedRows: Story = {
  render: (args) => (
    <TableContainer component={Paper}>
      <Table {...args} aria-label="desserts with hover and selected rows">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate
                checked={selectedNames.length > 0}
              />
            </TableCell>
            <TableCell>Dessert</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => {
            const isSelected = selectedNames.includes(row.name);

            return (
              <TableRow
                key={row.name}
                hover
                selected={isSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={isSelected} />
                </TableCell>

                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};