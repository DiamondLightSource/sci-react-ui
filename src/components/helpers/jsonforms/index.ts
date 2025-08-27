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

const rendererControls = [
  { renderer: TextControl, tester: TextControlTester },
  { renderer: TextDateTimeControl, tester: TextDateTimeControlTester },
];
const cellControls = [
  { cell: CellTextControl, tester: CellTextControlTester },
  { cell: CellTextDateTimeControl, tester: CellTextDateTimeControlTester },
];

export const JsonFormsControls = {
  rendererControls,
  cellControls,
};
