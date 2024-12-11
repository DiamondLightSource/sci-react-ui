import { render, RenderResult } from "@testing-library/react";
import { Breadcrumbs, getCrumbs } from "./Breadcrumbs";
import "@testing-library/jest-dom";

describe("Breadcrumbs", () => {
	
	const crumbFirst = "first",
		crumbFirstTitle = "First",
		crumbSecond = "second",
		crumbSecondTitle = "Second",
		crumbLast = "last one",
		crumbLastTitle = "Last one",
		defaultStringPath = `/${crumbFirst}/${crumbSecond}/${crumbLast}`,
		defaultArrayPath = [crumbFirst,crumbSecond,crumbLast];
	
	
	function testHomeExists( renderResult : RenderResult ) {
		const {getByTestId} = renderResult;
		const homeIcon = getByTestId("HomeIcon");
		
		expect(homeIcon).toBeInTheDocument()
		expect(homeIcon.parentElement).toHaveAttribute("href","/")
	}
	
	function testCrumbsExist( renderResult : RenderResult ) {
		const {getAllByRole, getByRole, getByText, queryByRole} = renderResult;
		
		expect(getAllByRole("link")).toHaveLength(3)
		
		testHomeExists(renderResult)
		
		let crumb = getByRole("link", {name: crumbFirstTitle})
		expect(crumb).toBeInTheDocument()
		expect(crumb).toHaveAttribute("href", `/${crumbFirst}`)
		
		crumb = getByRole("link", {name: crumbSecondTitle})
		expect(crumb).toBeInTheDocument()
		expect(crumb).toHaveAttribute("href", `/${crumbFirst}/${crumbSecond}`)
		
		expect(queryByRole("link", {name: crumbLastTitle})).not.toBeInTheDocument()
		expect(getByText(crumbLastTitle)).toBeInTheDocument()
	}

	it("should render without errors", () => {
		render(<Breadcrumbs path={defaultStringPath}/>);
	});
	
	it("should use a path as string", () => {
		testCrumbsExist(
			render(<Breadcrumbs path={defaultStringPath}/>)
		);
	})
	
	it("should use a path as array", () => {
	 testCrumbsExist(
			render(<Breadcrumbs path={defaultArrayPath}/>)
		);
	});

	it("should show just home when an empty string", () => {
		const renderResult = render(<Breadcrumbs path={""}/>);
		testHomeExists(renderResult)
		expect(renderResult.getAllByRole("link")).toHaveLength(1)
	});

	it("should show just home when an empty array", () => {
		const renderResult = render(<Breadcrumbs path={[]}/>);
		
		testHomeExists(renderResult)
		expect(renderResult.getAllByRole("link")).toHaveLength(1)
	});
})

describe("getCrumbs", ()=>{
	const correctCrumbs = [{
		name: "First",
		href: "/first"
	},{
		name: "Second",
		href: "/first/second"
	},{
		name: "Last one",
		href: "/first/second/last one"
	}]

	it("should match if path string", () => {
		expect(getCrumbs("/first/second/last one")).toStrictEqual(correctCrumbs);
	});

	it("should match if last slash included", () => {
		expect(getCrumbs("/first/second/last one/")).toStrictEqual(correctCrumbs);
	});

	it("should match if first slash excluded", () => {
		expect(getCrumbs("first/second/last one")).toStrictEqual(correctCrumbs);
	});

	it("should match if first slash excluded and last slash included", () => {
		expect(getCrumbs("first/second/last one")).toStrictEqual(correctCrumbs);
	});

	it("should match path string with multi separators", () => {
		expect(getCrumbs("///first//second/last one")).toStrictEqual(correctCrumbs);
	});
	
	it("should return an empty array when an empty string is passed", () => {
		expect(getCrumbs("")).toStrictEqual([]);
	});

	it("should return an empty array when spaces are passed", () => {
		expect(getCrumbs("  ")).toStrictEqual([]);
	});

	it("should match if path array", () => {
		expect(getCrumbs( ["first","second","last one"])).toStrictEqual(correctCrumbs);
	});

	it("should match if path array with empty", () => {
		expect(getCrumbs( ["first","second","last one",""])).toStrictEqual(correctCrumbs);
	});

	it("should match by removing empty item", () => {
		expect(getCrumbs( ["first","second","last one",""])).toStrictEqual(correctCrumbs);
	});
	
	it("should match by removing spaces only", () => {
		expect(getCrumbs( ["first","second","last one","   "])).toStrictEqual(correctCrumbs);
	});
	
	it("should return an empty array when an empty array is passed", () => {
		expect(getCrumbs([])).toStrictEqual([]);
	});
})