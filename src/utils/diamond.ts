const visitRegex = /^([a-z]{2})([1-9]\d*)-([1-9]\d*)$/;

interface Visit {
  proposalCode: string;
  proposalNumber: number;
  number: number;
}

const visitToText = (visit?: Visit): string => {
  return visit
    ? `${visit.proposalCode}${visit.proposalNumber.toFixed(
        0,
      )}-${visit.number.toFixed(0)}`
    : "";
};

const regexToVisit = (parsedVisit: RegExpExecArray): Visit => {
  return {
    proposalCode: parsedVisit[1],
    proposalNumber: Number(parsedVisit[2]),
    number: Number(parsedVisit[3]),
  };
};

const colourSet = [
  "default",
  "primary",
  "secondary",
  "success",
  "error",
  "info",
  "warning",
] as const;

export { regexToVisit, visitRegex, visitToText, colourSet };
export type { Visit };
