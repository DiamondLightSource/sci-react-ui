import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ContextPanel } from "./ContextPanel/ContextPanel";
import { Typography } from "@mui/material";
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
                value: <Typography variant="meta">Metadata here...</Typography>,
                label: "Metadata here...",
              },
            ],
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
