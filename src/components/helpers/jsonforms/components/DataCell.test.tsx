import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import {DataCell} from "./DataCell";

const props = {
	data: "Data 1234",
};

describe("DataCell", () => {
	test("Should render data and label", () => {
		render(<DataCell {...props} />);
		expect(screen.getByText(props.data)).toBeInTheDocument();
	});
	
	test("Should render '-' with empty data", () => {
		render(<DataCell {...props} data="" />);
		expect(screen.getByText("-")).toBeInTheDocument();
	});
	
	test("Should render '-' with null data", () => {
		render(<DataCell {...props} data={null} />);
		expect(screen.getByText("-")).toBeInTheDocument();
	});
	
	test("Should render '-' with undefined data", () => {
		render(<DataCell {...props} />);
		expect(screen.getByText("-")).toBeInTheDocument();
	});
});
