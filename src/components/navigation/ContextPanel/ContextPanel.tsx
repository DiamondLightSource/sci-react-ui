import { useRef } from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  Stack,
  Typography,
  Checkbox,
  Box,
} from "@mui/material";
import {
  CardClick,
  CardItem,
  ClickHandlerProps,
  ContextPanelProps,
  ContextPanelSelection,
  isSelectContextPanel,
  isViewAndSelectContextPanel,
  isViewContextPanel,
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

function selectAll(
  selected: boolean,
  items: CardItem[],
): ContextPanelSelection {
  const selection: ContextPanelSelection = {};
  items.map((x) => {
    selection[x.id] = selected;
  });
  return selection;
}

export const ContextPanel = (props: ContextPanelProps) => {
  const prevCardClick = useRef<CardClick | null>(null);

  if (props.items.length === 0) {
    if (props.loading) {
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
    } else if (props.totalCount > 0) {
      return (
        <Stack
          flex={1}
          spacing={1}
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          sx={{ p: 4, color: "text.secondary" }}
        >
          <Typography variant="body2">{props.noResultsMessage}</Typography>
        </Stack>
      );
    } else {
      return (
        <Stack
          flex={1}
          spacing={1}
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          sx={{ p: 4, color: "text.secondary" }}
        >
          <Typography variant="body2">{props.emptyMessage}</Typography>
        </Stack>
      );
    }
  }

  console.log(
    "selectedIds",
    !isViewContextPanel(props) ? props.selectedIds : "view",
  );

  // Card click behaviour changes depending on interaction mode
  const cardClickHandler = (v: ClickHandlerProps): void => {
    if (isSelectContextPanel(props)) {
      props.onSelectedChange(getNewSelection(v));
    } else {
      props.onShownChange(v.newCard.id);
    }
  };

  let selected = 0;
  if (!isViewContextPanel(props)) {
    selected = Object.entries(
      !isViewContextPanel(props) ? props.selectedIds : {},
    ).filter(([_, value]) => value === true).length;
  } else {
    selected = props.shownId ? 1 : 0;
  }

  return (
    <>
      {props.controls}
      {props.items.length > 0 && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          spacing={1}
          sx={{
            px: 1,
            py: 0.5,
            flexShrink: 0,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          {!isViewContextPanel(props) && props.selectAll ? (
            <Checkbox
              size="small"
              sx={{ p: 0.5 }}
              checked={selected === props.items.length}
              indeterminate={selected > 0 && selected !== props.items.length}
              onClick={(_) => {
                if (!isViewContextPanel(props)) {
                  const isSelectAll = selected === props.items.length;
                  props.onSelectedChange(selectAll(!isSelectAll, props.items));
                }
              }}
            />
          ) : (
            <Box py={1.5} />
          )}
          <Typography
            variant="meta"
            role="status"
            tabIndex={-1}
            // ref={summaryRef}
            sx={{ color: "text.secondary" }}
          >
            {`${props.items.length} of ${props.totalCount ?? "-"} loaded`}
          </Typography>

          {!isViewContextPanel(props) && (
            <>
              <Typography
                variant="meta"
                role="status"
                tabIndex={-1}
                sx={{ color: "text.secondary" }}
              >
                ·
              </Typography>
              <Typography
                variant="meta"
                role="status"
                tabIndex={-1}
                sx={{ color: "text.secondary" }}
              >
                {`${selected} selected`}
              </Typography>
            </>
          )}
        </Stack>
      )}

      <Box
        sx={{
          flex: 1,
          minHeight: 170,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TableContainer component={Paper} sx={{ borderRadius: 0, border: 0 }}>
          <Table>
            <TableBody>
              {props.items.map((x, idx) => {
                const isSelected = !isViewContextPanel(props)
                  ? (props.selectedIds?.[x.id] ?? false)
                  : false;
                const isShown = !isSelectContextPanel(props)
                  ? props.shownId === x.id
                  : isSelected;
                return (
                  <TableRow key={x.title}>
                    <CardItemComponent
                      cardItem={x}
                      isSelected={isSelected}
                      isShown={isShown}
                      showBorder={idx !== 0}
                      checkbox={
                        // Use user-preference for view-and-select
                        // Otherwise, force ON for select
                        // force OFF for view
                        isViewAndSelectContextPanel(props)
                          ? (props?.checkboxes ?? true)
                          : isSelectContextPanel(props)
                      }
                      onCheckboxClick={(e) => {
                        const newCard = { id: x.id, idx: idx };
                        if (!isViewContextPanel(props)) {
                          props.onSelectedChange(
                            getNewSelection({
                              data: props.items,
                              newCard: newCard,
                              event: e,
                              currentSelection: props.selectedIds,
                              prevCard: prevCardClick,
                            }),
                          );
                        }
                      }}
                      onCardClick={(e) => {
                        cardClickHandler({
                          data: props.items,
                          newCard: { id: x.id, idx: idx },
                          event: e,
                          currentSelection: !isViewContextPanel(props)
                            ? props.selectedIds
                            : {},
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
      </Box>
      {props.footer}
    </>
  );
};
