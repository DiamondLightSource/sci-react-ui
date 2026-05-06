import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
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

const tasks: Task[] = [
  { id: "TASK-1", name: "Calibration", status: "Done" },
  { id: "TASK-2", name: "Process step 1", status: "Running" },
  { id: "TASK-3", name: "Process step 2", status: "Running" },
  { id: "TASK-4", name: "Process step 3", status: "Running" },
  { id: "TASK-5", name: "Process step 4", status: "Pending" },
  { id: "TASK-6", name: "Process step 5", status: "Pending" },
  { id: "TASK-7", name: "Generate output", status: "Pending" },
];

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
              <TableCell align="right">{task.status}</TableCell>
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
              <TableCell align="right">{task.status}</TableCell>
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
                <TableCell align="right">{task.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={tasks.length}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[2, 5]}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
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
                <TableCell align="right">{task.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  },
};
