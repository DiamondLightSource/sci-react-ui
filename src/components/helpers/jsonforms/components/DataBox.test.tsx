import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import {DataBox} from "./DataBox";

const props = {
	label: "A Label",
	data: "Data 1234",
};

describe("DataBox", () => {
	test("Should render data and label", () => {
		render(<DataBox {...props} />);
		
		expect(screen.getByText(props.label)).toBeInTheDocument();
		expect(screen.getByText(props.data)).toBeInTheDocument();
	});
	
	test("Should render '-' with empty data", () => {
		render(<DataBox {...props} data="" />);
		
		expect(screen.getByText(props.label)).toBeInTheDocument();
		expect(screen.getByText("-")).toBeInTheDocument();
	});
	
	test("Should render '-' with null data", () => {
		render(<DataBox {...props} data={null} />);
		
		expect(screen.getByText(props.label)).toBeInTheDocument();
		expect(screen.getByText("-")).toBeInTheDocument();
	});
	
	test("Should render '-' with undefined data", () => {
		render(<DataBox {...props} />);
		
		expect(screen.getByText(props.label)).toBeInTheDocument();
		expect(screen.getByText("-")).toBeInTheDocument();
	});
});
