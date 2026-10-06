import { render, screen } from "@testing-library/react";
import { JsonForms } from "@jsonforms/react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import type { UISchemaElement } from "@jsonforms/core";

import { VerticalLayout, VerticalLayoutTester } from "./VerticalLayout";

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    hidden: { type: "string" },
  },
};

const uischema = {
  type: "VerticalLayout",
  elements: [
    { type: "Control", scope: "#/properties/name" },
    {
      type: "Control",
      scope: "#/properties/hidden",
      rule: { effect: "HIDE", condition: { scope: "#", schema: {} } },
    },
  ],
} as UISchemaElement;

const renderForm = () =>
  render(
    <JsonForms
      schema={schema}
      uischema={uischema}
      data={{}}
      renderers={[
        ...materialRenderers,
        { renderer: VerticalLayout, tester: VerticalLayoutTester },
      ]}
      cells={materialCells}
    />,
  );

describe("VerticalLayout", () => {
  test("renders visible fields", () => {
    renderForm();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.queryByLabelText("Hidden")).not.toBeInTheDocument();
  });

  test("leaves hidden fields' wrappers empty so they take no gap", () => {
    const { container } = renderForm();
    const wrappers = container.querySelectorAll(".MuiStack-root > div");
    expect(wrappers).toHaveLength(2);
    expect(wrappers[1]).toBeEmptyDOMElement();
  });
});
