import {
  Box,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { CardItem } from "./types";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

const FIRST_LINE = 28;
const SELECTED_SHADOW =
  "inset 3px 0 0 var(--ds-primary), inset 0 0 0 9999px var(--ds-overlay-selected)";

export const ICON_XS = { size: 16, strokeWidth: 1.5 };
export const ICON_SM = { size: 20, strokeWidth: 1.75 };
export const ICON_MD = { size: 24, strokeWidth: 2 };

type CardItemComponentProps = {
  cardItem: CardItem;
  isSelected: boolean;
  isShown: boolean;
  checkbox: boolean;
  showBorder: boolean;
  onCardClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onCheckboxClick: (v: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const CardItemComponent = ({
  cardItem,
  isSelected,
  isShown,
  checkbox,
  showBorder,
  onCardClick,
  onCheckboxClick,
}: CardItemComponentProps) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const tags = cardItem?.tags?.join(" · ");

  return (
    <Box
      data-plot-id={cardItem.title}
      onClick={(e) => {
        onCardClick(e);
        e.stopPropagation();
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        gap: 0.5,
        listStyle: "none",
        overflow: "hidden",
        cursor: "pointer",
        px: 1,
        pt: 0.5,
        pb: 0.5,
        borderTop: showBorder ? 1 : 0,
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
      <Box
        display="flex"
        alignItems="flex-start"
        sx={{
          gap: 0.5,
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
            spacing={0.5}
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

            {cardItem.status && (
              <Chip
                size="small"
                variant="outlined"
                label={cardItem.status.label}
                icon={cardItem.status.icon}
                color={cardItem.status.intent}
              />
            )}

            {cardItem.actions && (
              <>
                <IconButton
                  size="small"
                  aria-label={`More actions for ${cardItem.title}`}
                  aria-haspopup="menu"
                  aria-expanded={menuAnchor ?? false}
                  // data-row-menu={plot.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuAnchor(e.currentTarget);
                  }}
                >
                  <MoreVertical {...ICON_XS} />
                </IconButton>

                <Menu
                  id="card-action-menu"
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  onClose={(_) => setMenuAnchor(null)}
                >
                  {cardItem.actions.map((x) => (
                    <MenuItem
                      key={x.key}
                      onClick={(e) => {
                        x.onClick();
                        e.stopPropagation();
                        setMenuAnchor(null);
                      }}
                    >
                      {x.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
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
          {cardItem.metadata && (
            <Stack direction="row" spacing={0.5}>
              {cardItem.metadata
                .sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0)) // Sort by priority
                .map((x) => (
                  <Tooltip key={x.key} title={x.label}>
                    {x.value}
                  </Tooltip>
                ))}
            </Stack>
          )}

          {tags && (
            <Tooltip title={tags}>
              <Typography variant="mono3" noWrap>
                {tags}
              </Typography>
            </Tooltip>
          )}
        </Box>
      </Box>

      {cardItem?.footer && (
        <>
          <Divider />
          <Stack
            display="flex"
            direction="row"
            flex={1}
            sx={{ justifyContent: "space-between", px: 1 }}
          >
            {cardItem.footer?.start}
            {cardItem.footer?.end}
          </Stack>
        </>
      )}
    </Box>
  );
};
