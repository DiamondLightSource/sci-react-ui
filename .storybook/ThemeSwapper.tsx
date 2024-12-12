import {useColorScheme} from "@mui/material";
import * as React from "react";
import {useEffect} from "react";

export interface ThemeSwapperProps {
  context: any,
  children: React.ReactNode;
}

export const TextLight = 'Mode: Light'
export const TextDark = 'Mode: Dark'

const ThemeSwapper = ( {context, children}: ThemeSwapperProps ) => {
  const { mode, setMode } = useColorScheme();
  //if( !mode ) return
  
  useEffect(() => {
    const selectedThemeMode = context.globals.themeMode || TextLight;
    setMode((selectedThemeMode == TextLight) ? "light" : "dark")
  },[context.globals.themeMode]);
  
  return <div style={{backgroundColor: mode === "light" ? "#fafafa" : "#050505"}}>
    {children}
  </div>
};

export { ThemeSwapper };