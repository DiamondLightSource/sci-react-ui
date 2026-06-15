import React, { ChangeEvent, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import {
  regexToVisit,
  Visit,
  visitRegex,
  visitToText,
} from "../../utils/diamond";

interface VisitInputTextProps {
  visitText: string;
  setVisitText: (v: string) => void;
  isValid: boolean;
  handleSubmit?: () => void;
  submitOnReturn?: boolean;
  submitOnBlur?: boolean;
}

const VisitInputText: React.FC<VisitInputTextProps> = ({
  visitText,
  setVisitText,
  isValid,
  handleSubmit,
  submitOnReturn,
  submitOnBlur,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setVisitText(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && isValid && submitOnReturn && handleSubmit) {
      if (submitOnBlur) {
        (document.activeElement as HTMLElement).blur();
      } else {
        handleSubmit();
      }
    }
  };

  const handleBlur = () => {
    if (submitOnBlur && isValid && handleSubmit) {
      handleSubmit();
    }
  };

  return (
    <TextField
      label="Visit"
      value={visitText}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      error={!isValid}
      helperText={!isValid ? "Invalid visit" : ""}
      variant="outlined"
      data-testid="visit-field"
    />
  );
};

interface VisitInputProps {
  onSubmit?: (visit: Visit, parameters?: object) => void;
  visit?: Visit;
  parameters?: object;
  submitButton?: boolean;
  submitOnReturn?: boolean;
  submitOnBlur?: boolean;
}

const VisitInput: React.FC<VisitInputProps> = ({
  onSubmit,
  visit,
  parameters,
  submitButton = true,
  submitOnReturn = true,
  submitOnBlur = false,
}) => {
  const [visitText, setVisitText] = useState(visitToText(visit));
  const isValid = visitRegex.test(visitText);

  const handleSubmit = () => {
    const parsedVisit = visitRegex.exec(visitText);
    if (parsedVisit === null) return;

    if (onSubmit) {
      onSubmit(regexToVisit(parsedVisit), parameters);
    }
  };

  return (
    <>
      {onSubmit && submitButton ? (
        <Stack direction="row" alignContent="end" spacing={1} alignSelf="end">
          <VisitInputText
            visitText={visitText}
            setVisitText={setVisitText}
            isValid={isValid}
            handleSubmit={handleSubmit}
            submitOnReturn={submitOnReturn}
            submitOnBlur={submitOnBlur}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!isValid}
            data-testid="submit-button"
          >
            Submit
          </Button>
        </Stack>
      ) : (
        <VisitInputText
          visitText={visitText}
          setVisitText={setVisitText}
          isValid={isValid}
          handleSubmit={handleSubmit}
          submitOnReturn={submitOnReturn}
          submitOnBlur={submitOnBlur}
        />
      )}
    </>
  );
};

export { VisitInput, VisitInputText };
export type { VisitInputTextProps, VisitInputProps };
