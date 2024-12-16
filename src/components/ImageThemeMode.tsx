import {useColorScheme} from "@mui/material";

type ImageThemeModeType = {
	src: string,
	srcDark?: string,
	alt: string
	width?: string,
	height?: string,
}

interface ImageThemeModeProps {
	image: ImageThemeModeType;
}

export function getLogoSrc( image:ImageThemeModeType, mode: string) {
	if( !image ) {
		return null;
	}
	
	if( image.srcDark === undefined ) {
		return image.src;
	}

	return mode === "dark" ? image.srcDark : image.src;
}

const ImageThemeMode = ( {image}: ImageThemeModeProps ) => {
	const {mode} = useColorScheme();
	if( !mode ) return <></>
	
	const src: string | null = getLogoSrc(image, mode)
	
	return src ? <img
		src={src}
		alt={image.alt}
		width={image.width || "100"}
      height={image.height}
	/> : <></>
}

export {ImageThemeMode}
export type {ImageThemeModeProps, ImageThemeModeType}