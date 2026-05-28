import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "../MuiWrapped";
import { muiDocsParameters } from "../../../../.storybook/muiDocsParameters";

type Task = {
  id: string;
  name: string;
  status: "Pending" | "Running" | "Done";
};

type Dessert = {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
};
const renderStatusChip = (status: Task["status"]) => {
  switch (status) {
    case "Done":
      return (
        <Chip label="Done" color="success" size="small" variant="outlined" />
      );

    case "Running":
      return <Chip label="Running" color="info" size="small" />;

    case "Pending":
      return <Chip label="Pending" size="small" variant="outlined" />;

    default:
      return null;
  }
};
const tasks: Task[] = [
  { id: "TASK-1", name: "Calibration", status: "Done" },
  { id: "TASK-2", name: "Process step 1", status: "Running" },
  { id: "TASK-3", name: "Process step 2", status: "Running" },
  { id: "TASK-4", name: "Process step 3", status: "Running" },
  { id: "TASK-5", name: "Process step 4", status: "Pending" },
  { id: "TASK-6", name: "Process step 5", status: "Pending" },
  { id: "TASK-7", name: "Generate output", status: "Pending" },
];

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
  { name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
  { name: "Gingerbread", calories: 356, fat: 16, carbs: 49, protein: 3.9 },
];

const selectedNames = ["Ice cream sandwich"];

const meta: Meta<typeof Table> = {
  title: "MUI/Data Display/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: muiDocsParameters,
  argTypes: {
    size: { control: "radio", options: ["small", "medium"] },
    stickyHeader: { control: "boolean" },
  },
  args: {
    size: "medium",
    stickyHeader: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <TableContainer>
      <Table {...args}>
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell>Step</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.name}</TableCell>

              <TableCell align="right">
                {renderStatusChip(task.status)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

export const StickyHeader: Story = {
  args: { stickyHeader: true },
  render: (args) => (
    <TableContainer sx={{ maxHeight: 240 }}>
      <Table {...args}>
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell>Step</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.name}</TableCell>

              <TableCell align="right">
                {renderStatusChip(task.status)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

export const TasksWithPagination: Story = {
  render: (_args) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);

    const slice = tasks.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );

    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Step</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slice.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.name}</TableCell>

                <TableCell align="right">
                  {renderStatusChip(task.status)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={tasks.length}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[2, 5]}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    );
  },
};

export const SortableTasks: Story = {
  render: (_args) => {
    const [ascending, setAscending] = React.useState(true);

    const sorted = [...tasks].sort((a, b) =>
      ascending ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id),
    );

    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sortDirection={ascending ? "asc" : "desc"}>
                <TableSortLabel
                  active
                  direction={ascending ? "asc" : "desc"}
                  onClick={() => setAscending(!ascending)}
                >
                  Task
                </TableSortLabel>
              </TableCell>
              <TableCell>Step</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.name}</TableCell>

                <TableCell align="right">
                  {renderStatusChip(task.status)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  },
};

export const HoverRows: Story = {
  render: (args) => (
    <TableContainer>
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
    <TableContainer>
      <Table {...args} aria-label="desserts with selected rows">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox indeterminate checked={selectedNames.length > 0} />
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
    <TableContainer>
      <Table {...args} aria-label="desserts with hover and selected rows">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox indeterminate checked={selectedNames.length > 0} />
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
              <TableRow key={row.name} hover selected={isSelected}>
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
