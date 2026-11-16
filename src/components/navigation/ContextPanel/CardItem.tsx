import { Box, Checkbox, Chip, Stack, Tooltip, Typography } from "@mui/material";
import { CardItem, StatusChip } from "./types";

const FIRST_LINE = 28;
const SELECTED_SHADOW =
  "inset 3px 0 0 var(--ds-primary), inset 0 0 0 9999px var(--ds-overlay-selected)";

type CardItemComponentProps = {
  cardItem: CardItem;
  isSelected: boolean;
  isShown: boolean;
  status?: StatusChip;
  checkbox: boolean;
  onCardClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onCheckboxClick: (v: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const CardItemComponent = ({
  cardItem,
  isSelected,
  isShown,
  status,
  checkbox,
  onCardClick,
  onCheckboxClick,
}: CardItemComponentProps) => {
  return (
    <Box
      data-plot-id={cardItem.title}
      onClick={(e) => {
        onCardClick(e);
        e.stopPropagation();
      }}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        flexShrink: 0,
        gap: 0.5,
        listStyle: "none",
        overflow: "hidden",
        cursor: "pointer",
        px: 1,
        pt: 0.5,
        pb: 0.5,
        borderBottom: 1,
        borderColor: "border.subtle",
        backgroundColor: "background.paper",
        boxShadow: isShown ? SELECTED_SHADOW : "none",
        "&:hover": {
          boxShadow: isShown
            ? SELECTED_SHADOW
            : "inset 0 0 0 9999px var(--ds-overlay-hover)",
        },
      }}
    >
      {checkbox ? (
        <Checkbox
          size="small"
          sx={{ p: 0.5 }}
          checked={isSelected}
          onClick={(e) => {
            onCheckboxClick(e);
            e.stopPropagation();
          }}
          slotProps={{
            input: {
              "aria-label": `Show ${cardItem.title}`,
            },
          }}
        />
      ) : (
        <Box sx={{ p: 0.5 }} />
      )}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ minHeight: FIRST_LINE }}
        >
          <Typography
            variant="body2"
            fontWeight={500}
            noWrap
            sx={{ minWidth: 0, flex: 1 }}
          >
            {cardItem.title}
          </Typography>

          {status && (
            <Chip
              size="small"
              variant="outlined"
              label={status.label}
              icon={status.icon}
              color={status.intent}
            />
          )}
        </Stack>

        {cardItem.subtitle && (
          <Typography
            variant="meta"
            component="div"
            noWrap
            sx={{ color: "text.secondary", minHeight: "1.5em" }}
          >
            {cardItem.subtitle}
          </Typography>
        )}

        {cardItem.metadata &&
          cardItem.metadata.map((x) => {
            return (
              <Tooltip key={x.key} title={x.label}>
                {x.value}
              </Tooltip>
            );
          })}
      </Box>
    </Box>
  );
};
