import * as React from "react";
import MuiAutocomplete, {
  AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material/Autocomplete";

export type AutocompleteProps<T = any> = MuiAutocompleteProps<
  T,
  boolean | undefined,
  boolean | undefined,
  boolean | undefined
>;

export const Autocomplete = React.forwardRef<
  HTMLDivElement,
  AutocompleteProps<any>
>((props, ref) => <MuiAutocomplete ref={ref} {...props} />);

Autocomplete.displayName = "Autocomplete";
