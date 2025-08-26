import { withJsonFormsControlProps } from "@jsonforms/react";

import {and, ControlProps, or, rankWith, schemaTypeIs, uiTypeIs} from "@jsonforms/core";
import {DataBox} from "../components/DataBox";

const TextControlTester = rankWith(
  10, and(
    uiTypeIs("Control"),
    or(schemaTypeIs("integer"), schemaTypeIs("number"), schemaTypeIs("string"))
  )
);

const TextControlComponent = ({ data, label }: ControlProps) => (
  <DataBox label={label} data={data} />
);

const TextControl = withJsonFormsControlProps(TextControlComponent);
export { TextControl, TextControlTester };
