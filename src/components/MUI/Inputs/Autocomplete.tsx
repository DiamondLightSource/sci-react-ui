import MuiAutocomplete from "@mui/material/Autocomplete";

export const Autocomplete = MuiAutocomplete as typeof MuiAutocomplete & {
  displayName?: string;
};

Autocomplete.displayName = "Autocomplete";

export type { AutocompleteProps } from "@mui/material/Autocomplete";
