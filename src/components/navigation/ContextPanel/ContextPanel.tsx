import { forwardRef, ReactNode, useRef } from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Stack,
  Typography,
} from "@mui/material";
import {
  CardClick,
  CardItem,
  ClickHandlerProps,
  ContextPanelProps,
  ContextPanelSelection,
  Interaction,
} from "./types";
import { CardItemComponent } from "./CardItem";
import { Progress } from "../../controls/Progress";
import { getNewSelection } from "./selectionBehaviour";

// const VirtuosoTableComponents: TableComponents<CardItem> = {
//   Scroller: forwardRef<HTMLDivElement>((props, ref) => (
//     <TableContainer
//       component={Paper}
//       sx={{ borderRadius: 0, borderWidth: 0 }}
//       {...props}
//       ref={ref}
//     />
//   )),
//   Table: (props) => (
//     <Table
//       {...props}
//       sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
//     />
//   ),
//   TableHead: forwardRef<HTMLTableSectionElement>((props, ref) => (
//     <TableHead {...props} ref={ref} />
//   )),
//   TableRow,
//   TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
//     <TableBody {...props} ref={ref} />
//   )),
// };

export const ContextPanel = ({
  title = "Plots",
  variant = "cards",
  items,
  totalCount,
  density,
  interaction,
  shownId,
  onShownChange,
  selectedIds,
  onSelectedChange,
  checkboxes,
  selectedAll,
  controls,
  footer,
  loading,
  emptyMessage = "No scans yet",
  noResultsMessage = "No scans match",
  noResultsAction,
}: ContextPanelProps) => {
  console.log("checkboxes", checkboxes);
  console.log("shown id", shownId);

  const prevCardClick = useRef<CardClick | null>(null);

  if (totalCount === 0) {
    if (loading) {
      return (
        <Stack
          spacing={1}
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          sx={{ p: 4, color: "text.secondary" }}
        >
          <Typography variant="body2">Loading...</Typography>
          <Progress />
        </Stack>
      );
    } else {
      return (
        <Stack
          spacing={1}
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          sx={{ p: 4, color: "text.secondary" }}
        >
          <Typography variant="body2">{emptyMessage}</Typography>
          <Progress />
        </Stack>
      );
    }
  }

  // Card click behaviour changes depending on interaction mode
  const cardClickHandler = (v: ClickHandlerProps): void => {
    if (interaction === "select") {
      onSelectedChange(getNewSelection(v));
    } else {
      onShownChange(v.newCard.id);
    }
  };

  return (
    <>
      {controls}
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        sx={{
          px: 2,
          py: 0.5,
          flexShrink: 0,
          border: 1,
          borderColor: "divider",
        }}
      >
        <Typography
          variant="meta"
          role="status"
          tabIndex={-1}
          // ref={summaryRef}
          sx={{ flex: 1, minWidth: 0, color: "text.secondary" }}
        >
          {`${selectedIds?.length} of ${totalCount ?? "-"}`} selected
        </Typography>
      </Stack>
      <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
        <Table>
          <TableBody>
            {items.map((x, idx) => {
              const isSelected = selectedIds?.[x.id] ?? false;
              const isShown =
                interaction !== "select" ? shownId === x.id : isSelected;
              return (
                <TableRow key={x.title}>
                  <CardItemComponent
                    cardItem={x}
                    isSelected={isSelected}
                    isShown={isShown}
                    checkbox={
                      interaction !== "view" ? (checkboxes ?? true) : false
                    }
                    status={x.status}
                    onCheckboxClick={(e) => {
                      const newCard = { id: x.id, idx: idx };
                      onSelectedChange(
                        getNewSelection({
                          data: items,
                          newCard: newCard,
                          event: e,
                          currentSelection: selectedIds,
                          prevCard: prevCardClick,
                        }),
                      );
                    }}
                    onCardClick={(e) => {
                      cardClickHandler({
                        data: items,
                        newCard: { id: x.id, idx: idx },
                        event: e,
                        currentSelection: selectedIds,
                        prevCard: prevCardClick,
                      });
                    }}
                  />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {footer}
    </>
  );
};
