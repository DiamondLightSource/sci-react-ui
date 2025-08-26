import { withJsonFormsCellProps } from "@jsonforms/react";
import {and, CellProps, or, rankWith, schemaTypeIs, uiTypeIs} from "@jsonforms/core";

import {DataCell} from "../components/DataCell";

const CellTextControlTester = rankWith(
	110, and(
		uiTypeIs("Control"),
		or(schemaTypeIs("integer"), schemaTypeIs("number"), schemaTypeIs("string"))
	)
);

const CellTextControlComponent = ({ data }: CellProps) => (
  <DataCell data={data} />
)

const CellTextControl = withJsonFormsCellProps(
  CellTextControlComponent
);
export { CellTextControl, CellTextControlTester };
