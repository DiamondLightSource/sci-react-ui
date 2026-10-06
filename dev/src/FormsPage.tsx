import * as React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { JsonForms } from "@jsonforms/react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import type { JsonSchema, UISchemaElement } from "@jsonforms/core";

import { JsonFormsControls } from "../../src/index";

const beamlines = ["I03", "I04", "I15-1", "I24", "B24", "DIAD"];

const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Box>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    {description && (
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {description}
      </Typography>
    )}
    {children}
  </Box>
);

const textFieldVariants = ["outlined", "filled", "standard"] as const;

const MuiTextFields = () => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
      gap: 3,
    }}
  >
    {textFieldVariants.map((variant) => (
      <Stack key={variant} spacing={2}>
        <Typography variant="overline" color="text.secondary">
          {variant}
        </Typography>
        <TextField variant={variant} label="Sample name" />
        <TextField
          variant={variant}
          label="Proposal"
          placeholder="cm12345"
          helperText="Helper text"
        />
        <TextField variant={variant} label="Visit" required />
        <TextField
          variant={variant}
          label="Energy"
          type="number"
          defaultValue={12.4}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">keV</InputAdornment>,
            },
          }}
        />
        <TextField
          variant={variant}
          label="Exposure"
          defaultValue="-1"
          error
          helperText="Must be positive"
        />
        <TextField
          variant={variant}
          label="Read only"
          defaultValue="Read only value"
          slotProps={{ input: { readOnly: true } }}
        />
        <TextField
          variant={variant}
          label="Disabled"
          defaultValue="Disabled value"
          disabled
        />
        <TextField variant={variant} label="Notes" multiline minRows={3} />
      </Stack>
    ))}
  </Box>
);

const MuiSelectionControls = () => {
  const [beamline, setBeamline] = React.useState("I24");

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
        gap: 3,
      }}
    >
      <Stack spacing={2}>
        <FormControl fullWidth>
          <InputLabel id="beamline-select-label">Beamline</InputLabel>
          <Select
            labelId="beamline-select-label"
            label="Beamline"
            value={beamline}
            onChange={(event) => setBeamline(event.target.value)}
          >
            {beamlines.map((b) => (
              <MenuItem key={b} value={b}>
                {b}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="readonly-select-label">Read only</InputLabel>
          <Select
            labelId="readonly-select-label"
            label="Read only"
            value="I03"
            readOnly
          >
            {beamlines.map((b) => (
              <MenuItem key={b} value={b}>
                {b}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth disabled>
          <InputLabel id="disabled-select-label">Disabled</InputLabel>
          <Select labelId="disabled-select-label" label="Disabled" value="I04">
            {beamlines.map((b) => (
              <MenuItem key={b} value={b}>
                {b}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Autocomplete
          options={beamlines}
          renderInput={(params) => (
            <TextField {...params} label="Beamline (autocomplete)" />
          )}
        />
        <Autocomplete
          multiple
          options={beamlines}
          defaultValue={["I03", "I24"]}
          renderInput={(params) => (
            <TextField {...params} label="Beamlines (multiple)" />
          )}
        />
        <Box>
          <Typography id="energy-slider-label" variant="body2" gutterBottom>
            Energy (keV)
          </Typography>
          <Slider
            aria-labelledby="energy-slider-label"
            defaultValue={12}
            min={5}
            max={25}
            step={0.5}
            valueLabelDisplay="auto"
          />
        </Box>
      </Stack>

      <Stack spacing={2}>
        <FormControl>
          <FormLabel>Detector options</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Save raw frames"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Dark-field correction"
            />
            <FormControlLabel
              control={<Checkbox disabled />}
              label="Disabled"
            />
          </FormGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="scan-type-label">Scan type</FormLabel>
          <RadioGroup aria-labelledby="scan-type-label" defaultValue="step" row>
            <FormControlLabel value="step" control={<Radio />} label="Step" />
            <FormControlLabel value="fly" control={<Radio />} label="Fly" />
            <FormControlLabel
              value="grid"
              control={<Radio />}
              label="Grid"
              disabled
            />
          </RadioGroup>
        </FormControl>
        <FormControl error>
          <FormLabel>Shutter</FormLabel>
          <FormControlLabel control={<Switch />} label="Open shutter" />
          <FormHelperText>Interlock not satisfied</FormHelperText>
        </FormControl>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">Submit</Button>
          <Button variant="outlined">Reset</Button>
          <Button variant="text" disabled>
            Disabled
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

const jsonFormsRenderers = [
  ...materialRenderers,
  ...JsonFormsControls.layoutRenderers,
];

const jsonFormsSchema: JsonSchema = {
  type: "object",
  properties: {
    sampleName: { type: "string", minLength: 3 },
    proposal: { type: "string", pattern: "^[a-z]{2}[0-9]+$" },
    beamline: { type: "string", enum: beamlines },
    energy: { type: "number", minimum: 5, maximum: 25 },
    exposures: { type: "integer", minimum: 1 },
    scheduled: { type: "string", format: "date-time" },
    saveRaw: { type: "boolean" },
    notes: { type: "string" },
    positions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          label: { type: "string" },
          x: { type: "number" },
          y: { type: "number" },
        },
      },
    },
  },
  required: ["sampleName", "proposal", "beamline"],
};

const jsonFormsUiSchema: UISchemaElement = {
  type: "VerticalLayout",
  elements: [
    {
      type: "HorizontalLayout",
      elements: [
        { type: "Control", scope: "#/properties/sampleName" },
        { type: "Control", scope: "#/properties/proposal" },
        { type: "Control", scope: "#/properties/beamline" },
      ],
    },
    {
      type: "HorizontalLayout",
      elements: [
        { type: "Control", scope: "#/properties/energy" },
        { type: "Control", scope: "#/properties/exposures" },
        { type: "Control", scope: "#/properties/scheduled" },
      ],
    },
    { type: "Control", scope: "#/properties/saveRaw" },
    {
      type: "Control",
      scope: "#/properties/notes",
      options: { multi: true },
    },
    { type: "Control", scope: "#/properties/positions" },
  ],
} as UISchemaElement;

const initialJsonFormsData = {
  sampleName: "Lysozyme",
  proposal: "cm12345",
  beamline: "I24",
  energy: 12.4,
  exposures: 10,
  scheduled: "2026-10-06T09:30:00.000Z",
  saveRaw: true,
  positions: [{ label: "P1", x: 0.1, y: 0.2 }],
};

const JsonFormsExample = () => {
  const [data, setData] = React.useState<unknown>(initialJsonFormsData);
  const [readonly, setReadonly] = React.useState(false);

  return (
    <Stack spacing={2}>
      <FormControlLabel
        control={
          <Switch
            checked={readonly}
            onChange={(event) => setReadonly(event.target.checked)}
          />
        }
        label="Read only form (uses JsonFormsControls)"
      />
      <JsonForms
        schema={jsonFormsSchema}
        uischema={jsonFormsUiSchema}
        data={data}
        renderers={
          readonly
            ? [...jsonFormsRenderers, ...JsonFormsControls.rendererControls]
            : jsonFormsRenderers
        }
        cells={
          readonly
            ? [...materialCells, ...JsonFormsControls.cellControls]
            : materialCells
        }
        readonly={readonly}
        onChange={({ data }) => setData(data)}
      />
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 2,
          borderRadius: 1,
          overflow: "auto",
          typography: "mono3",
          backgroundColor: "surface.subtle",
        }}
      >
        {JSON.stringify(data, null, 2)}
      </Box>
    </Stack>
  );
};

const comparisonSchema: JsonSchema = {
  type: "object",
  properties: {
    sampleId: { type: "string" },
    status: { type: "string", enum: ["Queued", "Running", "Completed"] },
    energy: { type: "number" },
    scheduled: { type: "string", format: "date-time" },
    saveRaw: { type: "boolean" },
  },
};

const comparisonData = {
  sampleId: "SAMPLE-0042",
  status: "Queued",
  energy: 12.4,
  scheduled: "2026-10-06T09:30:00.000Z",
  saveRaw: true,
};

const comparisonUiSchema = (controlExtras: object = {}) =>
  ({
    type: "VerticalLayout",
    elements: Object.keys(comparisonData).map((key) => ({
      type: "Control",
      scope: `#/properties/${key}`,
      ...controlExtras,
    })),
  }) as UISchemaElement;

const comparisonColumns = [
  {
    title: "sci-react-ui text controls",
    caption: "Form-wide readonly + JsonFormsControls.rendererControls",
    uischema: comparisonUiSchema(),
    renderers: [...jsonFormsRenderers, ...JsonFormsControls.rendererControls],
    cells: [...materialCells, ...JsonFormsControls.cellControls],
    readonly: true,
  },
  {
    title: "Disabled",
    caption: "DISABLE rule",
    uischema: comparisonUiSchema({
      // An empty schema always matches, so the rule always applies.
      rule: { effect: "DISABLE", condition: { scope: "#", schema: {} } },
    }),
    renderers: jsonFormsRenderers,
    cells: materialCells,
  },
];

const ReadonlyVsDisabledExample = () => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
      gap: 3,
    }}
  >
    {comparisonColumns.map(({ title, caption, ...formProps }) => (
      <Stack key={title} spacing={1}>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontFamily: "monospace", wordBreak: "break-word" }}
        >
          {caption}
        </Typography>
        <JsonForms
          schema={comparisonSchema}
          data={comparisonData}
          {...formProps}
        />
      </Stack>
    ))}
  </Box>
);

export const FormsPage = () => (
  <Stack spacing={4}>
    <Typography variant="h5">Forms</Typography>

    <Section
      title="MUI text fields"
      description="Default MUI TextField variants and states."
    >
      <MuiTextFields />
    </Section>

    <Section
      title="MUI selection controls"
      description="Select, Autocomplete, Slider, Checkbox, Radio, Switch and Button."
    >
      <MuiSelectionControls />
    </Section>

    <Section
      title="JsonForms"
      description={
        <>
          Material renderers plus <code>JsonFormsControls</code>, as in the
          Helpers/JsonForms guide. Toggle read only to swap disabled inputs for
          the accessible text controls.
        </>
      }
    >
      <JsonFormsExample />
    </Section>

    <Section
      title="JsonForms: read only vs disabled"
      description={
        <>
          JsonForms&apos; material renderers don&apos;t distinguish read only
          from disabled: both render as disabled inputs. The sci-react-ui text
          controls replace them for read-only forms.
        </>
      }
    >
      <ReadonlyVsDisabledExample />
    </Section>
  </Stack>
);
