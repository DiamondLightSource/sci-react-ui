import React, { useState } from "react";
import { Button, ButtonGroup, InputAdornment, TextField } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Modes = {
  /** Natural numbers from 0 to inf */
  natural: /^([0-9]+)$/,
  /** Integers from -inf to inf */
  integer: /^[+\\-]?([0-9]+)$/,
  /** Floating point numbers from -inf to inf, accepts values such as 1. and .1 as valid*/
  floating:
    /^[+\\-]?(([0-9]+)|([0-9]+[\\.])|([\\.][0-9]+)|([0-9]+[\\.][0-9]+))$/,
  /** Floating point numbers from -inf to inf, accepts values such as 1.e1 and .1e1 as valid*/
  scientific:
    /^[+\\-]?(([0-9]+)|([0-9]+[\\.])|([\\.][0-9]+)|([0-9]+[\\.][0-9]+))([eE][+\\-]?[0-9]+)?$/,
};

interface NumberInputTextProps {
  label: string;
  numberMode: keyof typeof Modes;
  numberText: string;
  setNumberText: (v: string) => void;
  isValid: boolean;
  isInLimits: boolean;
  handleCommit?: () => void;
  commitOnReturn?: boolean;
  commitOnBlur?: boolean;
  helperText?: boolean;
  minValue: number;
  maxValue: number;
  step: number;
  spinnerButtons: "always" | "onHover" | "never";
}

const NumberInputText: React.FC<NumberInputTextProps> = ({
  label,
  numberMode,
  numberText,
  setNumberText,
  isValid,
  isInLimits,
  handleCommit,
  commitOnReturn,
  commitOnBlur,
  helperText,
  minValue,
  maxValue,
  step,
  spinnerButtons,
}) => {
  const showSpinner = spinnerButtons !== "never";
  const validHelperText = !helperText
    ? ""
    : `A ${numberMode} number. Limits: ${minValue} to ${maxValue}`;

  function calculateHelperText() {
    return !isValid || !isInLimits
      ? !isValid
        ? "Invalid input"
        : "Outside limits"
      : validHelperText;
  }

  const handleKeyDown = (event: { key: string }) => {
    if (
      event.key === "Enter" &&
      isValid &&
      isInLimits &&
      commitOnReturn &&
      handleCommit
    ) {
      if (commitOnBlur) {
        const input = document.activeElement as HTMLElement;
        input.blur();
      } else {
        handleCommit();
      }
    }
  };

  const handleBlur = () => {
    if (isValid && isInLimits && commitOnBlur && handleCommit) {
      handleCommit();
    }
  };

  const handleStep = (direction: 1 | -1) => {
    const current = isValid && numberText !== "" ? parseFloat(numberText) : 0;
    const stepped = current + direction * step;
    const clamped = Math.min(maxValue, Math.max(minValue, stepped));
    setNumberText(clamped.toString());
  };

  return (
    <TextField
      label={label}
      value={numberText}
      onChange={(e) => {
        setNumberText(e.target.value);
      }}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      error={!isValid || !isInLimits}
      helperText={calculateHelperText()}
      variant="outlined"
      sx={{
        ...(showSpinner && {
          "& .MuiOutlinedInput-root": { paddingRight: "6px" },
        }),
        ...(spinnerButtons === "onHover" && {
          "& .NumberInput-spinner": { opacity: 0 },
          "&:hover .NumberInput-spinner, &:focus-within .NumberInput-spinner": {
            opacity: 1,
          },
        }),
      }}
      slotProps={{
        input: {
          endAdornment: showSpinner ? (
            <InputAdornment
              position="end"
              className="NumberInput-spinner"
              sx={{
                marginLeft: "6px",
                marginRight: 0,
                marginTop: "6px",
                marginBottom: "6px",
                height: "auto",
                maxHeight: "none",
                alignSelf: "stretch",
                alignItems: "stretch",
              }}
            >
              <ButtonGroup
                orientation="vertical"
                size="small"
                color="inherit"
                sx={{ height: "100%" }}
              >
                <Button
                  aria-label="Increase value"
                  onClick={() => handleStep(1)}
                  disabled={isInLimits && parseFloat(numberText) >= maxValue}
                  sx={{ flex: 1, minWidth: 0, minHeight: 0, px: 0.5, py: 0 }}
                >
                  <KeyboardArrowUpIcon sx={{ fontSize: 12 }} />
                </Button>
                <Button
                  aria-label="Decrease value"
                  onClick={() => handleStep(-1)}
                  disabled={isInLimits && parseFloat(numberText) <= minValue}
                  sx={{ flex: 1, minWidth: 0, minHeight: 0, px: 0.5, py: 0 }}
                >
                  <KeyboardArrowDownIcon sx={{ fontSize: 12 }} />
                </Button>
              </ButtonGroup>
            </InputAdornment>
          ) : undefined,
        },
      }}
    />
  );
};

interface NumberInputProps {
  label: string;
  numberMode?: keyof typeof Modes;
  defaultValue?: number | string;
  onCommit?: (number: number) => void;
  number?: number;
  parameters?: object;
  commitOnReturn?: boolean;
  commitOnBlur?: boolean;
  helperText?: boolean;
  minValue?: number;
  maxValue?: number;
  step?: number;
  spinnerButtons?: "always" | "onHover" | "never";
}

const NumberInput: React.FC<NumberInputProps> = ({
  label = "",
  numberMode = "floating",
  defaultValue,
  onCommit,
  commitOnReturn = true,
  commitOnBlur = true,
  helperText = true,
  minValue = numberMode == "natural" ? 0 : -Infinity,
  maxValue = Infinity,
  step = 1,
  spinnerButtons = numberMode === "scientific" ? "never" : "onHover",
}) => {
  const [numberText, setNumberText] = useState(
    !defaultValue ? "" : defaultValue.toString(),
  );

  const isValid =
    numberText === "" ? true : Modes[numberMode].test(numberText.toString());

  const isInLimits =
    numberText === ""
      ? true
      : parseFloat(numberText.toString()) >= minValue &&
        parseFloat(numberText.toString()) <= maxValue;

  const handleCommit = () => {
    const parsedValue: number = parseFloat(numberText);
    if (onCommit) {
      onCommit(parsedValue);
    }
  };

  return (
    <NumberInputText
      label={label}
      numberMode={numberMode}
      numberText={numberText}
      setNumberText={setNumberText}
      isValid={isValid}
      isInLimits={isInLimits}
      handleCommit={handleCommit}
      commitOnReturn={commitOnReturn}
      commitOnBlur={commitOnBlur}
      helperText={helperText}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      spinnerButtons={spinnerButtons}
    />
  );
};

export { NumberInput };
export type { NumberInputProps };
