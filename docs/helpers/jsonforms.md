# JsonForms

JsonForms can be used to automatically generate forms from a JSON file. See [jsonforms.io](https://jsonforms.io) for more information. If you aren't using JsonForms this section will not be useful.

These helpers are to be used in the "readonly" version of the forms. They replace the default "disabled" inputs, which have accessibility problems: in particular, screen readers skip over disabled inputs. (In JsonForms, "readonly" mode *disables* all inputs.)

Currently, only the text type inputs are replaced with normal text.

Instead of a disabled text field showing a label and a value, the helpers render the label as a term and the value as its description, which assistive technology can read. The exact look depends on your own styles. See the JsonForms page in Storybook for a rendered comparison: [Storybook](https://diamondlightsource.github.io/sci-react-ui/)

In React you can use them as follows. Remember to also include the original JsonForms renderers:

```jsx
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";
import { JsonFormsControls } from "@diamondlightsource/sci-react-ui";

<JsonForms
  schema={schema}
  uischema={uischema}
  data={data}
  renderers={[
    ...materialRenderers,
    ...JsonFormsControls.rendererControls
  ]}
  cells={[
    ...materialCells,
    ...JsonFormsControls.cellControls
  ]}
  readonly={true}
/>
```

You can also add your own renderers. Make sure they have a higher rank than the SciReactUI ones, which are currently set at 10 and 15.

For consistent spacing between stacked fields (Material's vertical layout has none), add the layout renderer:

```jsx
renderers={[...materialRenderers, ...JsonFormsControls.layoutRenderers]}
```

To style them, use these classes:

```css
.data-box {}
.data-box .data-box-label {}
.data-box .data-box-data {}
.data-cell {}
.data-cell span {}
```
