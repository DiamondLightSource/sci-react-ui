import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ContextPanel } from "./ContextPanel/ContextPanel";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ContextPanelSelection } from "./ContextPanel/types";

const meta: Meta<typeof ContextPanel> = {
  title: "Components/Navigation/ContextPanel",
  component: ContextPanel,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `Not to be confused with MUI's Breadcrumbs component.  
        See also:  
        [Breadcrumbs Story](?path=/docs/mui-navigation-breadcrumbs--docs) (opens in this tab)  
        [MUI Breadcrumbs documentation](https://v7.mui.com/material-ui/react-breadcrumbs/)`,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const ViewAndSelect: Story = {
  render: (_args) => {
    const [selected, setSelected] = useState<ContextPanelSelection>({});
    const [shown, setShown] = useState<string | null>(null);
    return (
      <Box maxWidth={360}>
        <ContextPanel
          title="Scans"
          variant="cards"
          items={[
            {
              title: "012401 Fermat map - sA",
              id: "012401",
              metadata: [
                {
                  key: "data_type",
                  value: (
                    <Typography variant="meta" noWrap color="text.secondary">
                      Raw
                    </Typography>
                  ),
                },
                {
                  key: "scan_type",
                  value: (
                    <Typography variant="meta" noWrap color="text.secondary">
                      Fly
                    </Typography>
                  ),
                },
                {
                  key: "energy",
                  value: (
                    <Typography variant="meta" noWrap color="text.secondary">
                      707 eV
                    </Typography>
                  ),
                },
                {
                  key: "size",
                  value: (
                    <Typography variant="meta" noWrap color="text.secondary">
                      34 x 26 um
                    </Typography>
                  ),
                },
                {
                  key: "point_count",
                  value: (
                    <Typography variant="meta" noWrap color="text.secondary">
                      1,200 pts
                    </Typography>
                  ),
                },
              ],
              status: {
                label: "Running",
                intent: "info",
              },
              footer: {
                start: (
                  <Typography variant="meta" color="text.secondary">
                    R. Chen
                  </Typography>
                ),
                end: (
                  <Typography variant="meta" color="text.secondary">
                    09:14 · 00:12:54
                  </Typography>
                ),
              },
            },
            {
              title: "Title2",
              id: "id2",
              subtitle: "subtitle2",
            },
            {
              title: "Title3",
              id: "id3",
              subtitle: "subtitle3",
              status: {
                label: "Complete",
                intent: "success",
              },
              metadata: [
                {
                  key: "metadata1",
                  value: (
                    <Typography variant="meta">Metadata here...</Typography>
                  ),
                  label: "Metadata here...",
                },
                {
                  key: "metadata2",
                  value: <Typography variant="meta">More things...</Typography>,
                  label: "label2",
                },
                {
                  key: "metadata3",
                  value: (
                    <Typography variant="meta">Even more things...</Typography>
                  ),
                  label: "label3",
                },
                {
                  key: "metadata4",
                  value: (
                    <Typography variant="meta">Metadata4 here...</Typography>
                  ),
                  label: "label4",
                },
              ],
              actions: [
                {
                  key: "action1",
                  label: "action1",
                  onClick: () => {},
                },
                {
                  key: "action2",
                  label: "action2",
                  onClick: () => {},
                },
              ],
              tags: ["tag1", "tag2", "tag3", "tag4"],
              footer: {
                start: <Typography variant="meta">Footer start</Typography>,
                end: <Typography variant="meta">Footer end</Typography>,
              },
            },
          ]}
          totalCount={3}
          density="comfortable"
          interaction="view-and-select"
          shownId={shown}
          onShownChange={setShown}
          selectedIds={selected}
          onSelectedChange={setSelected}
          selectAll
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "ContextPanel things...",
      },
    },
  },
};

export const Select: Story = {
  render: (_args) => {
    const [selected, setSelected] = useState<ContextPanelSelection>({});
    return (
      <Box maxWidth={360}>
        <ContextPanel
          title="Scans"
          variant="cards"
          items={[
            {
              title: "Title1",
              id: "id1",
              subtitle: "subtitle1",
            },
            {
              title: "Title2",
              id: "id2",
              subtitle: "subtitle2",
            },
            {
              title: "Title3",
              id: "id3",
              subtitle: "subtitle3",
              status: {
                label: "Complete",
                intent: "success",
              },
              metadata: [
                {
                  key: "metadata1",
                  value: (
                    <Typography variant="meta">Metadata here...</Typography>
                  ),
                  label: "Metadata here...",
                },
                {
                  key: "metadata2",
                  value: <Typography variant="meta">More things...</Typography>,
                  label: "label2",
                },
                {
                  key: "metadata3",
                  value: (
                    <Typography variant="meta">Even more things...</Typography>
                  ),
                  label: "label3",
                },
                {
                  key: "metadata4",
                  value: (
                    <Typography variant="meta">Metadata4 here...</Typography>
                  ),
                  label: "label4",
                },
              ],
              actions: [
                {
                  key: "action1",
                  label: "action1",
                  onClick: () => {},
                },
                {
                  key: "action2",
                  label: "action2",
                  onClick: () => {},
                },
              ],
              tags: ["tag1", "tag2", "tag3", "tag4"],
              footer: {
                start: <Typography variant="meta">Footer start</Typography>,
                end: <Typography variant="meta">Footer end</Typography>,
              },
            },
          ]}
          totalCount={3}
          density="comfortable"
          interaction="select"
          selectedIds={selected}
          onSelectedChange={setSelected}
          selectAll
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "ContextPanel things...",
      },
    },
  },
};

export const View: Story = {
  render: (_args) => {
    // const [selected, setSelected] = useState<ContextPanelSelection>({});
    const [shown, setShown] = useState<string | null>(null);
    return (
      <Box maxWidth={360}>
        <ContextPanel
          title="Scans"
          variant="cards"
          items={[
            {
              title: "Title1",
              id: "id1",
              subtitle: "subtitle1",
            },
            {
              title: "Title2",
              id: "id2",
              subtitle: "subtitle2",
            },
            {
              title: "Title3",
              id: "id3",
              subtitle: "subtitle3",
              status: {
                label: "Complete",
                intent: "success",
              },
              metadata: [
                {
                  key: "metadata1",
                  value: (
                    <Typography variant="meta" noWrap>
                      Metadata here...
                    </Typography>
                  ),
                  label: "Metadata here...",
                },
                {
                  key: "metadata2",
                  value: (
                    <Typography variant="meta" noWrap>
                      More things...
                    </Typography>
                  ),
                  label: "label2",
                },
                {
                  key: "metadata3",
                  value: (
                    <Typography variant="meta" noWrap>
                      Even more things...
                    </Typography>
                  ),
                  label: "label3",
                },
                {
                  key: "metadata4",
                  value: (
                    <Typography variant="meta" noWrap>
                      Metadata4 here...
                    </Typography>
                  ),
                  label: "label4",
                },
              ],
              actions: [
                {
                  key: "action1",
                  label: "action1",
                  onClick: () => {},
                },
                {
                  key: "action2",
                  label: "action2",
                  onClick: () => {},
                },
              ],
              tags: ["tag1", "tag2", "tag3", "tag4"],
              footer: {
                start: <Typography variant="meta">Footer start</Typography>,
                end: <Typography variant="meta">Footer end</Typography>,
              },
            },
          ]}
          totalCount={3}
          density="comfortable"
          interaction="view"
          shownId={shown}
          onShownChange={setShown}
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "ContextPanel things...",
      },
    },
  },
};

export const EmptyList: Story = {
  render: (_args) => (
    <ContextPanel
      title="Scans"
      variant="cards"
      items={[]}
      totalCount={0}
      density="comfortable"
      interaction="view"
      shownId={null}
      onShownChange={() => {}}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Footer is subtle by default but supports the full surface and variant system when needed.",
      },
    },
  },
};

export const WithHeaderAndFooter: Story = {
  render: (_args) => {
    const [selected, setSelected] = useState<ContextPanelSelection>({});
    const [shown, setShown] = useState<string | null>(null);
    return (
      <Box
        maxWidth={360}
        maxHeight={600}
        display="flex"
        flexDirection="column"
        sx={{
          border: 1,
          borderColor: "divider",
        }}
      >
        <ContextPanel
          title="Scans"
          variant="cards"
          items={Array(20)
            .fill(0)
            .map((_, idx) => {
              return {
                title: "012401 Fermat map - sA",
                id: `${idx}`,
                metadata: [
                  {
                    key: "data_type",
                    value: (
                      <Typography variant="meta" noWrap color="text.secondary">
                        Raw
                      </Typography>
                    ),
                  },
                  {
                    key: "scan_type",
                    value: (
                      <Typography variant="meta" noWrap color="text.secondary">
                        Fly
                      </Typography>
                    ),
                  },
                  {
                    key: "energy",
                    value: (
                      <Typography variant="meta" noWrap color="text.secondary">
                        707 eV
                      </Typography>
                    ),
                  },
                  {
                    key: "size",
                    value: (
                      <Typography variant="meta" noWrap color="text.secondary">
                        34 x 26 um
                      </Typography>
                    ),
                  },
                  {
                    key: "point_count",
                    value: (
                      <Typography variant="meta" noWrap color="text.secondary">
                        1,200 pts
                      </Typography>
                    ),
                  },
                ],
                status: {
                  label: "Running",
                  intent: "info",
                },
                footer: {
                  start: (
                    <Typography variant="meta" color="text.secondary">
                      R. Chen
                    </Typography>
                  ),
                  end: (
                    <Typography variant="meta" color="text.secondary">
                      09:14 · 00:12:54
                    </Typography>
                  ),
                },
              };
            })}
          totalCount={20}
          density="comfortable"
          interaction="view-and-select"
          shownId={shown}
          onShownChange={setShown}
          selectedIds={selected}
          onSelectedChange={setSelected}
          selectAll
          controls={
            <>
              <Stack
                spacing={1}
                direction="row"
                sx={{ px: 1, paddingTop: 1, paddingBottom: 0.5, flexShrink: 0 }}
              >
                <TextField
                  size="small"
                  type="search"
                  placeholder="Scan number"
                  fullWidth
                />
                <Button
                  color="inherit"
                  variant="outlined"
                  sx={{ flexShrink: 0 }}
                >
                  Search
                </Button>
              </Stack>
            </>
          }
          footer={
            <Typography
              variant="meta"
              p={1}
              sx={{
                borderTop: 1,
                borderColor: "divider",
              }}
            >
              ContextPanel footer
            </Typography>
          }
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "ContextPanel things...",
      },
    },
  },
};
