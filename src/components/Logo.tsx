import {useColorScheme} from "@mui/material";
import React, {useEffect} from "react";

type LogoType = {
	src: string,
	srcDark?: string,
	alt?: string
	width?: string,
	height?: string,
}

interface LogoProps {
	logo: LogoType;
}

function getLogoSrc( logo:LogoType, mode: string) {
	if( !logo ) {
		return null;
	}
	
	if( logo.srcDark === undefined ) {
		return logo.src;
	}
	
	return mode === "light" ? logo.src : logo.srcDark
}


const Logo = ( {logo}: LogoProps ) => {
	
	const {mode} = useColorScheme();
	if( !mode ) return
	
	let src: string | null = getLogoSrc(logo, mode)
	
	useEffect(() => {
		src = getLogoSrc(logo, mode)
	},[mode]);
	
	return src ? <img
			src={src}
			alt={logo.alt || "Logo"}
      width={logo.width || "100px"}
      height={logo.height}
			// style={{border: "red 1px solid"}}
		/> : <></>
}

export {Logo}
export type {LogoProps, LogoType}