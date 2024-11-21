import {useColorScheme} from "@mui/material";
import * as React from "react";
//import {useDarkMode} from "storybook-dark-mode";

export interface ThemeSwapperProps {children: React.ReactNode;}

const ThemeSwapper = ( {children}: ThemeSwapperProps ) => {
  const { mode, setMode } = useColorScheme();
  if( !mode ) return
  
  return <>
    <div style={{backgroundColor:"#ccc",width:"99%",padding:".5%", borderBottom:"#bbb 1px solid"}}>
      <button style={{border:"0"}} onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}>Theme {mode[0].toUpperCase() + mode.slice(1)}</button>
    </div>
    <div style={{backgroundColor: mode === "light" ? "#fafafa" : "#050505"}}>
      {children}
    </div>
  </>
};

export { ThemeSwapper };