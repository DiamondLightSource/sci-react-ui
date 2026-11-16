import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ContextPanel } from "./ContextPanel/ContextPanel";
import { Box, Typography } from "@mui/material";
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

export const Default: Story = {
  render: (_args) => {
    const [selected, setSelected] = useState<ContextPanelSelection>({});
    const [shown, setShown] = useState<string | null>(null);
    return (
      <Box maxWidth={360}>
        <ContextPanel
          title="Scans"
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
            },
          ]}
          totalCount={3}
          density="comfortable"
          interaction="view-and-select"
          shownId={shown}
          onShownChange={setShown}
          selectedIds={selected}
          onSelectedChange={setSelected}
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
