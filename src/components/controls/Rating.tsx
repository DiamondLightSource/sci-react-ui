import * as React from "react";
import { styled } from "@mui/material/styles";

import { Box, Rating as Mui_Rating, Typography, useTheme } from "@mui/material";

import ScienceFilledIcon from "@mui/icons-material/Science";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";

const StyledRating = styled(Mui_Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty": {
    color: theme.vars.palette.primary.main,
    opacity: 0.3,
  },
  "& .MuiRating-iconFilled": {
    color: theme.vars.palette.primary.light,
  },
  "& .MuiRating-iconHover": {
    color: theme.vars.palette.secondary.main,
  },
}));

const labels: { [index: string]: string } = {
  0.5: "Unusable",
  1: "Unusable+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value: number) {
  return `${value} Testtube${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export function Rating() {
  const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);
  const theme = useTheme();

  return (
    <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
      <StyledRating
        name="hover-feedback"
        defaultValue={2}
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(_event, newHover) => {
          setHover(newHover);
        }}
        icon={<ScienceFilledIcon fontSize="inherit" />}
        emptyIcon={<ScienceOutlinedIcon fontSize="inherit" />}
      />
      {value !== null && (
        <Typography sx={{ ml: 2, color: theme.vars.palette.text.primary }}>
          {labels[hover !== -1 ? hover : value]}
        </Typography>
      )}
    </Box>
  );
}
