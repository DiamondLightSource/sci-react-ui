import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

export type TransferListProps = {
  left: string[];
  right: string[];
  onChange?: (left: string[], right: string[]) => void;
  titleLeft?: string;
  titleRight?: string;
};

export const TransferList: React.FC<TransferListProps> = ({
  left,
  right,
  onChange,
  titleLeft = "Available",
  titleRight = "Selected",
}) => {
  const [leftItems, setLeftItems] = React.useState(left);
  const [rightItems, setRightItems] = React.useState(right);
  const [checked, setChecked] = React.useState<string[]>([]);

  const leftChecked = checked.filter((v) => leftItems.includes(v));
  const rightChecked = checked.filter((v) => rightItems.includes(v));

  const toggle = (value: string) => {
    setChecked((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : prev.concat(value),
    );
  };

  const moveRight = () => {
    const nextRight = rightItems.concat(leftChecked);
    const nextLeft = leftItems.filter((v) => !leftChecked.includes(v));
    setRightItems(nextRight);
    setLeftItems(nextLeft);
    setChecked((prev) => prev.filter((v) => !leftChecked.includes(v)));
    onChange?.(nextLeft, nextRight);
  };

  const moveLeft = () => {
    const nextLeft = leftItems.concat(rightChecked);
    const nextRight = rightItems.filter((v) => !rightChecked.includes(v));
    setLeftItems(nextLeft);
    setRightItems(nextRight);
    setChecked((prev) => prev.filter((v) => !rightChecked.includes(v)));
    onChange?.(nextLeft, nextRight);
  };

  const renderList = (title: string, items: string[]) => (
    <Paper
      sx={{ width: 240, height: 260, display: "flex", flexDirection: "column" }}
    >
      <div style={{ fontSize: 14, fontWeight: 600, padding: "8px 12px" }}>
        {title}
      </div>
      <List dense disablePadding sx={{ overflow: "auto", flex: 1 }}>
        {items.map((value) => {
          const checkedItem = checked.includes(value);
          return (
            <ListItem key={value} disablePadding>
              <ListItemButton onClick={() => toggle(value)} dense>
                <Checkbox tabIndex={-1} checked={checkedItem} disableRipple />
                <ListItemText primary={value} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      {renderList(titleLeft, leftItems)}
      <div style={{ display: "grid", gap: 8 }}>
        <Button
          variant="outlined"
          onClick={moveRight}
          disabled={leftChecked.length === 0}
        >
          {">"}
        </Button>
        <Button
          variant="outlined"
          onClick={moveLeft}
          disabled={rightChecked.length === 0}
        >
          {"<"}
        </Button>
      </div>
      {renderList(titleRight, rightItems)}
    </div>
  );
};

TransferList.displayName = "TransferList";
