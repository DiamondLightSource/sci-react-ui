import {useColorScheme} from "@mui/material";

type ImageColorSchemeSwitchType = {
	src: string,
	srcDark?: string,
	alt: string
	width?: string,
	height?: string,
}

interface ImageColorSchemeSwitchProps {
	image: ImageColorSchemeSwitchType;
}

export function getLogoSrc(image:ImageColorSchemeSwitchType, mode: string) {
	if( !image ) {
		return undefined;
	}
	
	if( image.srcDark === undefined ) {
		return image.src;
	}

	return mode === "dark" ? image.srcDark : image.src;
}

const ImageColorSchemeSwitch = ({image}: ImageColorSchemeSwitchProps ) => {
	const {mode} = useColorScheme();
	if( !mode ) return <></>
	
	const src: string | undefined = getLogoSrc(image, mode)
	
	return <img
		src={src}
		alt={image.alt}
		width={image.width}
      height={image.height}
	/>
}

export {ImageColorSchemeSwitch}
export type {ImageColorSchemeSwitchProps, ImageColorSchemeSwitchType}