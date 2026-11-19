import { describe, expect, it } from "vitest";
import {
  Breadcrumbs,
  Link,
  Pagination,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import { renderWithProviders } from "../__test-utils__/helpers";

// MUI's own default icons carry a data-testid such as "FirstPageIcon".
const materialIcons = (container: HTMLElement) =>
  container.querySelectorAll('[data-testid$="Icon"]');

describe("DiamondDSTheme icon defaults, rendered", () => {
  it("uses Lucide for Pagination arrows", () => {
    const { container } = renderWithProviders(
      <Pagination count={10} page={5} showFirstButton showLastButton />,
    );

    expect(materialIcons(container)).toHaveLength(0);
    expect(container.querySelectorAll("svg.lucide")).toHaveLength(4);
  });

  it("uses Lucide for TablePagination arrows", () => {
    const { container } = renderWithProviders(
      <table>
        <tbody>
          <tr>
            <TablePagination
              count={100}
              page={2}
              rowsPerPage={10}
              rowsPerPageOptions={[10]}
              onPageChange={() => undefined}
              showFirstButton
              showLastButton
            />
          </tr>
        </tbody>
      </table>,
    );

    expect(materialIcons(container)).toHaveLength(0);
    expect(
      container.querySelectorAll(".MuiTablePagination-actions svg.lucide"),
    ).toHaveLength(4);
  });

  it("uses Lucide for the collapsed Breadcrumbs icon and the sort arrow", () => {
    const { container } = renderWithProviders(
      <>
        <Breadcrumbs maxItems={2}>
          <Link href="/">One</Link>
          <Link href="/">Two</Link>
          <Link href="/">Three</Link>
          <Link href="/">Four</Link>
        </Breadcrumbs>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel active direction="asc">
                  Name
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </>,
    );

    expect(materialIcons(container)).toHaveLength(0);
    expect(container.querySelectorAll("svg.lucide").length).toBeGreaterThan(1);
  });
});
