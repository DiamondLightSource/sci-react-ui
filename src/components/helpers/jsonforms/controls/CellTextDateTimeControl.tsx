import { withJsonFormsCellProps } from "@jsonforms/react";
import {
  and,
  CellProps,
  isStringControl,
  rankWith,
  schemaMatches,
} from "@jsonforms/core";

import { DataCell } from "../components/DataCell";

const CellTextDateTimeControlTester = rankWith(
  15,
  and(
    isStringControl,
    schemaMatches((schema) => schema.format === "date-time"),
  ),
);

const CellTextDateTimeControlComponent = ({ data }: CellProps) => (
  <DataCell data={data ? new Date(data).toLocaleString("en-GB") : undefined} />
);

const CellTextDateTimeControl = withJsonFormsCellProps(
  CellTextDateTimeControlComponent,
);
export { CellTextDateTimeControl, CellTextDateTimeControlTester };
