import React, { ChangeEvent, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { regexToVisit, Visit, visitRegex, visitToText } from "../utils/diamond";

interface VisitInputTextProps {
  visitText: string;
  setVisitText: (v: string) => void;
  isValid: boolean;
  setIsValid: (v: boolean) => void;
  handleSubmit?: () => void;
  submitOnReturn?: boolean;
}

const VisitInputText: React.FC<VisitInputTextProps> = ({
  visitText,
  setVisitText,
  isValid,
  setIsValid,
  handleSubmit,
  submitOnReturn,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setVisitText(value);
    setIsValid(visitRegex.test(value));
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter" && submitOnReturn && handleSubmit) {
      handleSubmit();
    }
  };

  return (
    <TextField
      label="Visit"
      value={visitText}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
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
}

const VisitInput: React.FC<VisitInputProps> = ({
  onSubmit,
  visit,
  parameters,
  submitButton = true,
  submitOnReturn = true,
}) => {
  const [visitText, setVisitText] = useState(visitToText(visit));
  const [isValid, setIsValid] = useState(true);

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
            setIsValid={setIsValid}
            handleSubmit={handleSubmit}
            submitOnReturn={submitOnReturn}
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
          setIsValid={setIsValid}
          handleSubmit={handleSubmit}
          submitOnReturn={submitOnReturn}
        />
      )}
    </>
  );
};

export { VisitInput, VisitInputText };
export type { Visit, VisitInputTextProps, VisitInputProps };
