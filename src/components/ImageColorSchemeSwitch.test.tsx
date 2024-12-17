import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import { ImageColorSchemeSwitch, getLogoSrc } from "./ImageColorSchemeSwitch";

jest.mock("@mui/material", () => {
	return {
		useColorScheme: jest.fn().mockReturnValue({mode:"dark"})
	};
})

describe("ImageColorSchemeSwitch", () => {
	const testVals = {
		src: "src/light",
		alt: "test-alt"
	};
	
	function getRenderImg( image: any) {
		const {getByAltText} = render(<ImageColorSchemeSwitch image={{...testVals, ...image}}/>);
		
		const img = getByAltText(testVals.alt)
		expect(img).toBeInTheDocument()
		return img
	}

	it("should render without errors", () => {
		render(<ImageColorSchemeSwitch image={{...testVals}}/>);
	});
	
	it("should have src and alt by default", () => {
		const img = getRenderImg({})
		
		expect(img).toHaveAttribute("alt", testVals.alt)
		expect(img).toHaveAttribute("src", testVals.src)
		
		expect(img).not.toHaveAttribute("width")
		expect(img).not.toHaveAttribute("height")
	});
	
	it("should have width 123", () => {
		const width = "123";
		
		const img = getRenderImg({width})
		expect(img).toHaveAttribute("width", width)
		expect(img).not.toHaveAttribute("height")
	});
	
	it("should have width 123 and height 124", () => {
		const width = "123",
			height = "124";
		
		const img = getRenderImg({width,height})
		
		expect(img).toHaveAttribute("width", width)
		expect(img).toHaveAttribute("height", height)
	});
	
	it("should have alternate src", () => {
		const srcDark = "src/dark";
		
		const img = getRenderImg({srcDark})
		
		expect(img).toHaveAttribute("src", srcDark)
	});
})

describe("getLogoSrc", ()=>{
	const srcLight = "src/light",
		srcDark = "src/dark";
	
	it("should be null if no image", () => {
		// @ts-ignore: invalid input
		expect(getLogoSrc(null,"")).toStrictEqual(undefined);
		// @ts-ignore: invalid input, calm down ts
		expect(getLogoSrc()).toStrictEqual(undefined);
	});
	
	it("should be srcLight if no srcDark", () => {
		expect(getLogoSrc({src:srcLight, alt:""},"light")).toStrictEqual(srcLight);
	});
	
	it("should be srcLight if mode is dark but no srcDark", () => {
		expect(getLogoSrc({src:srcLight, alt:""},"dark")).toStrictEqual(srcLight);
	});
	
	it("should be srcLight if srcDark but mode light", () => {
		expect(getLogoSrc( {src: srcLight, srcDark: srcDark, alt:""},"light")).toStrictEqual(srcLight);
	});
	
	it("should be srcDark if mode dark", () => {
		expect( getLogoSrc({src:"src/light", srcDark:srcDark, alt:""},"dark")).toStrictEqual(srcDark);
	});
	
})