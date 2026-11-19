import { describe, expect, it } from "vitest";
import {
  AccordionSummary,
  Breadcrumbs,
  Link,
  ListItemButton,
  ListItemIcon,
  MenuItem,
  Pagination,
  PaginationItem,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import { Star } from "lucide-react";

import { renderWithProviders } from "../__test-utils__/helpers";
import { LucideIcon } from "../components/datadisplay/Icons/LucideIcon";

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

  // MUI fades these parents itself, so the icon must not fade a second time.
  it.each([
    [
      "MenuItem",
      () => (
        <MenuItem disabled>
          <LucideIcon icon={Star} />
        </MenuItem>
      ),
    ],
    [
      "ListItemButton",
      () => (
        <ListItemButton disabled>
          <LucideIcon icon={Star} />
        </ListItemButton>
      ),
    ],
    [
      "PaginationItem",
      () => (
        <PaginationItem
          type="next"
          disabled
          slots={{ next: () => <LucideIcon icon={Star} /> }}
        />
      ),
    ],
    [
      "AccordionSummary",
      () => (
        <AccordionSummary disabled>
          <LucideIcon icon={Star} />
        </AccordionSummary>
      ),
    ],
  ])("does not fade a disabled %s icon twice", (_name, render) => {
    const { container } = renderWithProviders(render());

    const icon = container.querySelector("svg.lucide") as SVGElement;
    expect(getComputedStyle(icon).opacity).toBe("1");
  });

  it("keeps the gap after a MenuItem icon small", () => {
    const { container } = renderWithProviders(
      <MenuItem>
        <ListItemIcon>
          <LucideIcon icon={Star} size="sm" />
        </ListItemIcon>
        Label
      </MenuItem>,
    );

    const wrapper = container.querySelector(".MuiListItemIcon-root") as Element;
    expect(getComputedStyle(wrapper).minWidth).toBe("28px");
  });

  it("still fades a disabled icon in a parent MUI does not fade", () => {
    const { container } = renderWithProviders(
      <MenuItem>
        <span className="Mui-disabled">
          <LucideIcon icon={Star} />
        </span>
      </MenuItem>,
    );

    const icon = container.querySelector("svg.lucide") as SVGElement;
    expect(getComputedStyle(icon).opacity).toBe(
      "var(--ds-on-surface-disabled-opacity)",
    );
  });
});
