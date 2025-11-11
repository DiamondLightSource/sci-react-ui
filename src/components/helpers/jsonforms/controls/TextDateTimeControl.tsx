import { withJsonFormsControlProps } from "@jsonforms/react";
import {
  rankWith,
  isStringControl,
  and,
  schemaMatches,
  ControlProps,
} from "@jsonforms/core";
import { DataBox } from "../components/DataBox";

const TextDateTimeControlTester = rankWith(
  15,
  and(
    isStringControl,
    schemaMatches((schema) => schema.format === "date-time"),
  ),
);

const TextDateTimeControlComponent = ({ data, label }: ControlProps) => (
  <DataBox
    label={label}
    data={data ? new Date(data).toLocaleString("en-GB") : undefined}
  />
);

const TextDateTimeControl = withJsonFormsControlProps(
  TextDateTimeControlComponent,
);
export { TextDateTimeControl, TextDateTimeControlTester };
