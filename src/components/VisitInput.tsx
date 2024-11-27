import React, { ChangeEvent, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { regexToVisit, Visit, visitRegex, visitToText } from "../utils/diamond";

interface VisitInputTextProps {
  visitText: string;
  setVisitText: (v: string) => void;
  isValid: boolean;
  setIsValid: (v: boolean) => void;
}

const VisitInputText: React.FC<VisitInputTextProps> = ({
  visitText,
  setVisitText,
  isValid,
  setIsValid,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setVisitText(value);
    setIsValid(visitRegex.test(value));
  };

  return (
    <TextField
      label="Visit"
      value={visitText}
      onChange={handleInputChange}
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
}

const VisitInput: React.FC<VisitInputProps> = ({
  onSubmit,
  visit,
  parameters,
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
      {onSubmit ? (
        <Stack direction="row" alignContent="end" spacing={1} alignSelf="end">
          <VisitInputText
            visitText={visitText}
            setVisitText={setVisitText}
            isValid={isValid}
            setIsValid={setIsValid}
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
        />
      )}
    </>
  );
};

export default VisitInput;
export { VisitInputText };
export type { Visit, VisitInputTextProps, VisitInputProps };
