import React, { useState } from "react";
import { TextField } from "@mui/material";

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
  setIsValid: (v: boolean) => void;
  isInLimits: boolean;
  setIsInLimits: (v: boolean) => void;
  handleCommit?: () => void;
  commitOnReturn?: boolean;
  commitOnBlur?: boolean;
  helperText?: boolean;
  minValue: number;
  maxValue: number;
}

const NumberInputText: React.FC<NumberInputTextProps> = ({
  label,
  numberMode,
  numberText,
  setNumberText,
  isValid,
  setIsValid,
  isInLimits,
  setIsInLimits,
  handleCommit,
  commitOnReturn,
  commitOnBlur,
  helperText,
  minValue,
  maxValue,
}) => {
  const numberRegex = Modes[numberMode];
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

  function checkValidity(value: string) {
    setIsValid(numberRegex.test(value));
  }

  function checkLimits(value: string) {
    setIsInLimits(
      parseFloat(value) >= minValue && parseFloat(value) <= maxValue,
    );
  }

  function updateText(value: string) {
    setNumberText(value);
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

  return (
    <TextField
      label={label}
      value={numberText}
      onChange={(e) => {
        checkValidity(e.target.value);
        checkLimits(e.target.value);
        updateText(e.target.value);
      }}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      error={!isValid || !isInLimits}
      helperText={calculateHelperText()}
      variant="outlined"
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
}) => {
  const [numberText, setNumberText] = useState(
    !defaultValue ? "" : defaultValue.toString(),
  );
  const [isValid, setIsValid] = useState(
    !defaultValue ? true : Modes[numberMode].test(defaultValue.toString()),
  );
  const [isInLimits, setIsInLimits] = useState(
    !defaultValue
      ? true
      : parseFloat(defaultValue.toString()) >= minValue &&
          parseFloat(defaultValue.toString()) <= maxValue,
  );

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
      setIsValid={setIsValid}
      isInLimits={isInLimits}
      setIsInLimits={setIsInLimits}
      handleCommit={handleCommit}
      commitOnReturn={commitOnReturn}
      commitOnBlur={commitOnBlur}
      helperText={helperText}
      minValue={minValue}
      maxValue={maxValue}
    />
  );
};

export { NumberInput };
export type { NumberInputProps };
