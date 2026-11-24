# Inputs, progress and data

Number and visit inputs, progress indicators, image browsing and data cards. Back to the [components index](../components.md).

## NumberInput

A number input for scientific values, which validates by number mode (natural, integer, floating or scientific notation) and limits. Use it for any numeric value a user types, such as an exposure time or a motor position.

Extends no MUI props. It renders an outlined MUI `TextField`, and only the props below are accepted.

**Props**

| Prop             | Type                                                    | Default                                            | Description                                                                                        |
| ---------------- | ------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `label`          | `string`                                                | none (required)                                    | The field label.                                                                                   |
| `numberMode`     | `"natural" \| "integer" \| "floating" \| "scientific"`  | `"floating"`                                       | Which numbers are valid input. See the table below.                                                |
| `defaultValue`   | `number \| string`                                      | empty                                              | The initial value. An invalid or out-of-limits value is shown as an error.                         |
| `onCommit`       | `(number: number) => void`                              | none                                               | Called with the parsed number when the value is committed. Only valid, in-limit values commit.     |
| `commitOnReturn` | `boolean`                                               | `true`                                             | Commit when the user presses Return.                                                               |
| `commitOnBlur`   | `boolean`                                               | `true`                                             | Commit when the field loses focus.                                                                 |
| `helperText`     | `boolean`                                               | `true`                                             | Show the default helper text, such as "A floating number. Limits: -Infinity to Infinity".          |
| `minValue`       | `number`                                                | `0` for `natural`, otherwise `-Infinity`           | Lowest allowed value.                                                                              |
| `maxValue`       | `number`                                                | `Infinity`                                         | Highest allowed value.                                                                             |
| `step`           | `number`                                                | `1`                                                | Amount the increment and decrement buttons change the value by.                                    |
| `spinnerButtons` | `"always" \| "onHover" \| "never"`                      | `"onHover"`, or `"never"` for `scientific`         | When the increment and decrement buttons show.                                                     |

Number modes:

| Mode         | Accepts                                                                  |
| ------------ | ------------------------------------------------------------------------ |
| `natural`    | Whole numbers from 0 upwards.                                            |
| `integer`    | Whole numbers, positive or negative.                                     |
| `floating`   | Decimal numbers, positive or negative. Values such as `1.` and `.1` are valid. |
| `scientific` | Decimal numbers with an optional exponent, such as `1e5` or `.1e-3`.     |

The field shows "Invalid input" for text that doesn't match the mode, and "Outside limits" for a valid number outside `minValue` and `maxValue`. When both commit options are on, pressing Return moves focus out of the field, which commits once.

**Example**

```tsx
import { NumberInput } from "@diamondlightsource/sci-react-ui";

const ExposureTime = () => (
  <NumberInput
    label="Exposure time (s)"
    numberMode="floating"
    defaultValue={0.5}
    minValue={0}
    maxValue={60}
    step={0.1}
    onCommit={(seconds) => console.log("Exposure time", seconds)}
  />
);
```

**From the stories**

- Default: a number input field.
- With a label: a number input field with a label.
- Without helper text: set `helperText={false}` to hide the default helper text.
- Invalid or out-of-limits default: a default value that doesn't fit the mode or limits, such as `15.2e5` in floating mode or `20` with limits 0 to 10, shows an error straight away.
- Natural number with limits: natural number mode with `minValue` and `maxValue`.
- Integer: integer number mode.
- Floating point with limits: floating point mode with `minValue` and `maxValue`.
- Scientific: scientific number mode. It hides the increment and decrement buttons by default.
- Commit on Return only: set `commitOnBlur={false}`.
- Commit on blur only: set `commitOnReturn={false}`.

**See also**: [Text field guidance](text-field.md), [Feedback and errors](../feedback-and-errors.md).

## VisitInput

A text field for entering a Diamond visit, such as `xx99999-7`, with optional submit behaviour. Use it where a user needs to pick the visit they are working under.

A valid visit is two lowercase letters (the proposal code), a proposal number, a hyphen and a visit number. Neither number can start with 0. An invalid value shows "Invalid visit" and cannot be submitted. `Visit` and `visitRegex` are exported from the same package.

**Props**

| Prop             | Type                                         | Default | Description                                                                                          |
| ---------------- | -------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `onSubmit`       | `(visit: Visit, parameters?: object) => void` | none    | Called with the parsed visit and `parameters`. Without it, only the text field renders.             |
| `visit`          | `Visit`                                      | none    | The initial visit: `{ proposalCode, proposalNumber, number }`.                                       |
| `parameters`     | `object`                                     | none    | Passed unchanged to `onSubmit` as its second argument.                                               |
| `submitButton`   | `boolean`                                    | `true`  | Show a Submit button next to the field. The button needs `onSubmit`, and is disabled while the visit is invalid. |
| `submitOnReturn` | `boolean`                                    | `true`  | Submit when the user presses Return in a valid field.                                                |
| `submitOnBlur`   | `boolean`                                    | `false` | Submit when a valid field loses focus. With this and `submitOnReturn`, Return moves focus out, which submits once. |

`VisitInputText` is also exported. It is the bare field, without the Submit button or the parsing. It takes `visitText`, `setVisitText`, `isValid`, and optionally `handleSubmit`, `submitOnReturn` and `submitOnBlur`. Use `VisitInput` unless you need to control the text yourself.

**Example**

```tsx
import { VisitInput, type Visit } from "@diamondlightsource/sci-react-ui";

const ChooseVisit = () => (
  <VisitInput
    visit={{ proposalCode: "xx", proposalNumber: 99999, number: 7 }}
    onSubmit={(visit: Visit) => console.log(visit)}
  />
);
```

**From the stories**

- Input only: a field with no submit action.
- Initial visit: pass `visit` to fill the field.
- With a Submit button: pass `onSubmit` to show the button.
- Submit on blur: set `submitButton={false}` and `submitOnBlur` to submit when the field loses focus.
- Without Return submission: set `submitOnReturn={false}`.
- Without a Submit button: set `submitButton={false}` and submit with Return.

**See also**: [Text field guidance](text-field.md).

## Progress

A progress circle, inspired by Diamond Light. Use it for work of unknown length. It spins until you remove it.

Extends no MUI props.

**Props**

| Prop    | Type                                | Default    | Description                                                                         |
| ------- | ----------------------------------- | ---------- | ----------------------------------------------------------------------------------- |
| `size`  | `"small" \| "medium" \| "large"`    | `"medium"` | The size of the circle.                                                             |
| `speed` | `"slow" \| "medium" \| "fast"`      | `"medium"` | How fast it spins. It slows down for users who prefer reduced motion.               |

**Example**

```tsx
import { Progress } from "@diamondlightsource/sci-react-ui";

const Loading = () => <Progress size="large" speed="slow" />;
```

**From the stories**

- Default: the default progress spinner.
- Large: the large version of the spinner, with `size="large"`.
- Slower: a slower version, with `speed="slow"`.

**See also**: [Feedback and errors](../feedback-and-errors.md#progress-and-transitional-states), `ProgressDelayed` below.

## ProgressDelayed

Displays a progress only after a time period (default 1s). Generally, short delays do not need feedback.

It shows the `Progress` circle unless you pass your own `progress`. Remove it from the page when the work is done.

**Props**

| Prop       | Type                              | Default    | Description                                                              |
| ---------- | --------------------------------- | ---------- | ------------------------------------------------------------------------ |
| `delay`    | `number`                          | `1000`     | Milliseconds to wait before showing anything.                            |
| `fade`     | `boolean`                         | `true`     | Fade the progress in over 400 ms.                                        |
| `progress` | `ReactElement`                    | `Progress` | Your own progress element, such as a MUI `LinearProgress`.               |
| `size`     | `"small" \| "medium" \| "large"`  | `"medium"` | Passed to the default `Progress`. Ignored if you pass `progress`.        |
| `speed`    | `"slow" \| "medium" \| "fast"`    | `"medium"` | Passed to the default `Progress`. Ignored if you pass `progress`.        |

**Example**

```tsx
import { ProgressDelayed } from "@diamondlightsource/sci-react-ui";

const Loading = ({ loading }: { loading: boolean }) =>
  loading ? <ProgressDelayed delay={2000} /> : null;
```

**From the stories**

- Default: the default progress spinner.
- Without fade: set `fade={false}` for no fade in.
- Two second delay: set `delay={2000}`.
- Large: set `size="large"`.
- Custom progress: pass `progress={<LinearProgress />}` to use a different indicator.

**See also**: [Feedback and errors](../feedback-and-errors.md#progress-and-transitional-states).

## ScrollableImages

Shows one image or a list of images, either one at a time with controls or as a row you scroll sideways. Use it to flick through a series, such as detector frames or sample photos.

A TIFF is detected by a `.tif` or `.tiff` source, or a `type` containing `tif`. A multi-frame TIFF is split into one PNG image per frame, so each frame counts as an image. It is fetched from `src`, so the file must be reachable by the browser.

**Props**

| Prop              | Type                      | Default                    | Description                                                                                                         |
| ----------------- | ------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `images`          | `ImageInfo \| ImageInfo[]` | none (required)            | The images. Each is `{ src: string; type?: string; alt?: string }`. Renders nothing while the list is empty.        |
| `mode`            | `"viewer" \| "scroll"`    | `"viewer"`                 | `viewer` shows one image at a time. `scroll` shows a horizontally scrolling row.                                    |
| `width`           | `number`                  | `300`                      | Width of each image frame, in pixels.                                                                               |
| `height`          | `number`                  | `300`                      | Height of each image frame, in pixels.                                                                              |
| `buttons`         | `boolean`                 | `true`                     | Viewer mode: show previous and next buttons. They only show for more than one image.                                |
| `wrapAround`      | `boolean`                 | `true`                     | Viewer mode: go from the last image to the first, and back.                                                         |
| `slider`          | `boolean`                 | `true`                     | Viewer mode: show a slider over the image. It only shows for more than one image.                                   |
| `numeration`      | `boolean`                 | `true`                     | Viewer mode: show the position, such as `2/4`, under the image.                                                     |
| `backgroundColor` | `string`                  | the theme's paper colour   | Frame background. Accepts a theme path such as `"primary.container"`.                                               |
| `scrollStep`      | `number`                  | `320`                      | Scroll mode: pixels moved by each arrow click.                                                                      |

In viewer mode, focus the image and use the left and right arrow keys to move between images.

**Example**

```tsx
import {
  ScrollableImages,
  type ImageInfo,
} from "@diamondlightsource/sci-react-ui";

const frames: ImageInfo[] = [
  { src: "/images/frame-1.png", alt: "Frame 1" },
  { src: "/images/frame-2.png", alt: "Frame 2" },
];

const FrameViewer = () => (
  <ScrollableImages images={frames} width={400} height={300} />
);
```

**From the stories**

- All controls: viewer mode with the buttons, slider and numbers on.
- No buttons, no slider, no numbers: set `buttons`, `slider` or `numeration` to `false` to hide each control.
- No wrap: set `wrapAround={false}` to stop at the first and last image.
- Background colour: set `backgroundColor` to change the frame colour.
- One image: pass a single `ImageInfo`. The controls don't show.
- TIFF: a multi-page TIFF becomes one image per frame.
- Scroll mode: set `mode="scroll"`. Wider frames work by setting `width` and `height`, and a TIFF works here too.
- Dynamic images: the image list can change over time. The current position moves back if the list gets shorter.

## DataCard

A compact component for displaying structured label-value data in dashboard and system views. Use it for status readouts, such as ring current or the current sample.

A card has a `title` and one of three layouts. A single value (`value`) can carry an icon. Two values (`value1` and `value2`) show stacked by default, or on one line. Both layouts take an optional `subvalue`. The card grows to fill the space its parent gives it, so the parent decides the layout.

Extends no MUI props.

**Props**

| Prop       | Type                                                                | Default                                    | Description                                                                                          |
| ---------- | ------------------------------------------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `title`    | `string`                                                            | none (required)                            | The card title.                                                                                      |
| `colour`   | `"none" \| "neutral" \| "info" \| "danger" \| "warning" \| "success"` | none (required)                          | Intent or severity. `none` uses the paper background and `neutral` a quiet surface.                  |
| `value`    | `DecoratedValue`                                                    | none                                       | The main value. Use this or `value1` and `value2`, not both.                                         |
| `icon`     | `LucideIcon`                                                        | none                                       | A Lucide icon beside the main value. Only with `value`.                                              |
| `value1`   | `DecoratedValue`                                                    | none                                       | First value of a pair. Use with `value2`.                                                            |
| `value2`   | `DecoratedValue`                                                    | none                                       | Second value of a pair.                                                                              |
| `stacked`  | `boolean`                                                           | `true`                                     | Pairs only. `true` stacks the two values. `false` puts them on one line. Ignored if `subvalue` is set, which always uses one line. |
| `subvalue` | `DecoratedValue`                                                    | none                                       | A smaller value underneath.                                                                          |

`DecoratedValue` is `{ value: string; label?: string; suffix?: string }`. The card types are exported as `DataCardProps`, `DecoratedValue` and `DataObjectProps`. The colour type itself is not exported, so use the literal values above.

**Example**

```tsx
import { DataCard } from "@diamondlightsource/sci-react-ui";
import { Star } from "lucide-react";

const RingCurrent = () => (
  <DataCard
    title="Ring current"
    colour="success"
    icon={Star}
    value={{ value: "299.97", suffix: "mA" }}
    subvalue={{ label: "Refill in", value: "492", suffix: "s" }}
  />
);
```

**From the stories**

- Standard card: the standard card consists of title, main value (with optional label and/or suffix and Lucide icon) and optional subvalue.
- Stacked: shows two data entries of the same importance. This is the default representation when two values are given.
- Paired: two data entries can be combined in one line. Useful to show a subvalue too.
- Colours: colour describes intent or severity.
- Layout: a card grows to fill available space, so the parent container decides how to lay the cards out. Put each card in a fixed-width box to get fixed-width columns.

**See also**: [Colour](../foundation/colour.md), [Feedback and errors](../feedback-and-errors.md).

## DataGroup

A grouped collection of data objects. Note that, unlike `DataCard`, this component has no colour support.

It draws one bordered panel with its items side by side, separated by dividers. Each item takes the same props as a `DataCard`, without `colour`.

**Props**

| Prop    | Type                 | Default         | Description                                                                                           |
| ------- | -------------------- | --------------- | ----------------------------------------------------------------------------------------------------- |
| `items` | `DataObjectProps[]`  | none (required) | The data objects to show. Each has a `title` and either a `value`, or `value1` and `value2`, as for `DataCard`. |

**Example**

```tsx
import { DataGroup } from "@diamondlightsource/sci-react-ui";

const BeamStatus = () => (
  <DataGroup
    items={[
      {
        title: "Ring current",
        value: { value: "299.97", suffix: "mA" },
        subvalue: { label: "Refill in", value: "492", suffix: "s" },
      },
      {
        title: "Current sample",
        value1: { label: "Puck", value: "4" },
        value2: { label: "Pin", value: "6" },
      },
    ]}
  />
);
```

**From the stories**

- Demo: a ring current, a sample with puck and pin, a run ID and a scan progress, side by side in one panel.

