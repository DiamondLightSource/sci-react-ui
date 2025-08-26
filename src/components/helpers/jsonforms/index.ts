import {	TextControl,	TextControlTester} from "./controls/TextControl";
import {	TextDateTimeControl,	TextDateTimeControlTester} from "./controls/TextDateTimeControl";

import { CellTextControl,	CellTextControlTester } from "./controls/CellTextControl";
import {	CellTextDateTimeControl, CellTextDateTimeControlTester} from "./controls/CellTextDateTimeControl";


export const rendererControls = [
	{ renderer: TextControl, tester: TextControlTester },
	{ renderer: TextDateTimeControl, tester: TextDateTimeControlTester },
]
export const cellControls = [
	{ cell: CellTextControl, tester: CellTextControlTester },
	{ cell: CellTextDateTimeControl, tester: CellTextDateTimeControlTester },
]