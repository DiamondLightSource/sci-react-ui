import { TextControl, TextControlTester } from "./controls/TextControl";
import {
  TextDateTimeControl,
  TextDateTimeControlTester,
} from "./controls/TextDateTimeControl";

import {
  CellTextControl,
  CellTextControlTester,
} from "./controls/CellTextControl";
import {
  CellTextDateTimeControl,
  CellTextDateTimeControlTester,
} from "./controls/CellTextDateTimeControl";
import { VerticalLayout, VerticalLayoutTester } from "./layouts/VerticalLayout";

const rendererControls = [
  { renderer: TextControl, tester: TextControlTester },
  { renderer: TextDateTimeControl, tester: TextDateTimeControlTester },
];
const cellControls = [
  { cell: CellTextControl, tester: CellTextControlTester },
  { cell: CellTextDateTimeControl, tester: CellTextDateTimeControlTester },
];
const layoutRenderers = [
  { renderer: VerticalLayout, tester: VerticalLayoutTester },
];

export const JsonFormsControls = {
  rendererControls,
  cellControls,
  layoutRenderers,
};
