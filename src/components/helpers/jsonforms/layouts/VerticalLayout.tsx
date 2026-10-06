import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react";
import {
  LayoutProps,
  rankWith,
  uiTypeIs,
  VerticalLayout as VerticalLayoutSchema,
} from "@jsonforms/core";
import { Stack } from "@mui/material";

// Material's own vertical layout (rank 1) stacks fields with no gap.
const VerticalLayoutTester = rankWith(2, uiTypeIs("VerticalLayout"));

const VerticalLayoutComponent = ({
  uischema,
  schema,
  path,
  enabled,
  visible,
  renderers,
  cells,
}: LayoutProps) => {
  const { elements } = uischema as VerticalLayoutSchema;
  if (!visible || elements.length === 0) return null;

  return (
    <Stack
      spacing={2}
      useFlexGap
      // Hidden fields render nothing; drop their wrappers so they add no gap.
      sx={{ "& > :empty": { display: "none" } }}
    >
      {elements.map((child, index) => (
        <div key={`${path}-${index}`}>
          <JsonFormsDispatch
            uischema={child}
            schema={schema}
            path={path}
            enabled={enabled}
            renderers={renderers}
            cells={cells}
          />
        </div>
      ))}
    </Stack>
  );
};

const VerticalLayout = withJsonFormsLayoutProps(VerticalLayoutComponent);
export { VerticalLayout, VerticalLayoutTester };
