import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Breadcrumbs, getCrumbs } from "./Breadcrumbs";
import "@testing-library/jest-dom";
import { CustomLink } from "types/links";

const crumbFirst = "first",
  crumbFirstTitle = "First",
  crumbSecond = "second",
  crumbSecondTitle = "Second",
  crumbLast = "last one",
  crumbLastTitle = "Last one",
  defaultStringPath = `/${crumbFirst}/${crumbSecond}/${crumbLast}`,
  defaultArrayPath = [crumbFirst, crumbSecond, crumbLast],
  defaultArrayObject: CustomLink[] = [
    { name: `${crumbFirstTitle}`, href: `/${crumbFirst}` },
    { name: `${crumbSecondTitle}`, href: `/${crumbSecond}` },
    { name: `${crumbLastTitle}`, href: "/" },
  ];

describe("Breadcrumbs", () => {
  function testHomeExists(renderResult: RenderResult) {
    const { getByTestId } = renderResult;
    const homeIcon = getByTestId("HomeIcon");

    expect(homeIcon).toBeInTheDocument();
    expect(homeIcon.parentElement).toHaveAttribute("href", "/");
  }

  function testCrumbsExist(renderResult: RenderResult) {
    const { getAllByRole, getByRole, getByText, queryByRole } = renderResult;

    expect(getAllByRole("link")).toHaveLength(3);

    testHomeExists(renderResult);

    let crumb = getByRole("link", { name: crumbFirstTitle });
    expect(crumb).toBeInTheDocument();
    expect(crumb).toHaveAttribute("href", `/${crumbFirst}`);

    crumb = getByRole("link", { name: crumbSecondTitle });
    expect(crumb).toBeInTheDocument();
    expect(crumb).toHaveAttribute("href", `/${crumbFirst}/${crumbSecond}`);

    expect(
      queryByRole("link", { name: crumbLastTitle }),
    ).not.toBeInTheDocument();
    expect(getByText(crumbLastTitle)).toBeInTheDocument();
  }

  it("should render without errors", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Breadcrumbs path={defaultArrayObject} />
      </MemoryRouter>,
    );
  });

  it("should show just home when an empty string", () => {
    const renderResult = render(
      <MemoryRouter initialEntries={["/"]}>
        <Breadcrumbs path={""} />
      </MemoryRouter>,
    );
    testHomeExists(renderResult);
    expect(renderResult.getAllByRole("link")).toHaveLength(1);
  });

  it("should show just home when an empty array", () => {
    const renderResult = render(
      <MemoryRouter initialEntries={["/"]}>
        <Breadcrumbs path={[]} />
      </MemoryRouter>,
    );
    testHomeExists(renderResult);
    expect(renderResult.getAllByRole("link")).toHaveLength(1);
  });

  it("should use path as string", () => {
    testCrumbsExist(
      render(
        <MemoryRouter initialEntries={[defaultStringPath]}>
          <Breadcrumbs path={defaultStringPath} />
        </MemoryRouter>,
      ),
    );
  });

  it("should use path as string array", () => {
    testCrumbsExist(
      render(
        <MemoryRouter initialEntries={[`/${crumbFirst}/${crumbSecond}`]}>
          <Breadcrumbs path={defaultArrayPath} />
        </MemoryRouter>,
      ),
    );
  });

  it("should use path as object array", () => {
    const { getByRole, queryByRole, getByText } = render(
      <MemoryRouter initialEntries={[`/${crumbFirst}/${crumbSecond}`]}>
        <Breadcrumbs path={defaultArrayObject} />
      </MemoryRouter>,
    );
    let crumb = getByRole("link", { name: crumbFirstTitle });
    expect(crumb).toBeInTheDocument();
    expect(crumb).toHaveAttribute("href", `/${crumbFirst}`);

    crumb = getByRole("link", { name: crumbSecondTitle });
    expect(crumb).toBeInTheDocument();
    expect(crumb).toHaveAttribute("href", `/${crumbSecond}`);

    expect(
      queryByRole("link", { name: crumbLastTitle }),
    ).not.toBeInTheDocument();
    expect(getByText(crumbLastTitle)).toBeInTheDocument();
  });

  it("should navigate to the correct route when a breadcrumb link is clicked", () => {
    render(
      <MemoryRouter initialEntries={[defaultStringPath]}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/first" element={<div>First Page</div>} />
          <Route
            path={`/${crumbFirst}/${crumbSecond}`}
            element={<div>Second Page</div>}
          />
          <Route
            path={defaultStringPath}
            element={<Breadcrumbs path={defaultStringPath} />}
          />
        </Routes>
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole("link", { name: "Second" }));
    expect(screen.getByText("Second Page")).toBeInTheDocument();
  });

  it("should render correctly with different routes", () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={[`/${crumbFirst}/${crumbSecond}`]}>
        <Breadcrumbs path="/first/second" />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "First" })).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
    rerender(
      <MemoryRouter initialEntries={[defaultStringPath]}>
        <Breadcrumbs path={defaultStringPath} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "First" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Second" })).toBeInTheDocument();
    expect(screen.getByText("Last one")).toBeInTheDocument();
  });
});

describe("getCrumbs", () => {
  const stringAndStringArrayCrumbs = [
    {
      name: "First",
      href: "/first",
    },
    {
      name: "Second",
      href: "/first/second",
    },
    {
      name: "Last one",
      href: "/first/second/last one",
    },
  ];

  const objectArrayCrumbs = [
    { name: "First", href: "first" },
    { name: "Second", href: "this is the second link" },
    { name: "Last", href: "/" },
  ];

  it("should match if path string", () => {
    expect(getCrumbs("/first/second/last one")).toStrictEqual(
      stringAndStringArrayCrumbs,
    );
  });

  it("should match if last slash included", () => {
    expect(getCrumbs("/first/second/last one/")).toStrictEqual(
      stringAndStringArrayCrumbs,
    );
  });

  it("should match if first slash excluded and last slash included", () => {
    expect(getCrumbs("first/second/last one")).toStrictEqual(
      stringAndStringArrayCrumbs,
    );
  });

  it("should match path string with multi separators", () => {
    expect(getCrumbs("///first//second/last one")).toStrictEqual(
      stringAndStringArrayCrumbs,
    );
  });

  it("should return an empty array when an empty string is passed", () => {
    expect(getCrumbs("")).toStrictEqual([]);
  });

  it("should return an empty array when spaces are passed", () => {
    expect(getCrumbs("  ")).toStrictEqual([]);
  });

  it("should match if path array", () => {
    expect(getCrumbs(["first", "second", "last one"])).toStrictEqual(
      stringAndStringArrayCrumbs,
    );
  });

  it("should match if path array with empty", () => {
    expect(getCrumbs(["first", "second", "last one", ""])).toStrictEqual(
      stringAndStringArrayCrumbs,
    );
  });

  it("should match by removing spaces only", () => {
    expect(getCrumbs(["first", "second", "last one", "   "])).toStrictEqual(
      stringAndStringArrayCrumbs,
    );
  });

  it("should return an empty array when an empty array is passed", () => {
    expect(getCrumbs([])).toStrictEqual([]);
  });

  it("should match if path is object array", () => {
    expect(
      getCrumbs([
        { name: "First", href: "first" },
        { name: "Second", href: "this is the second link" },
        { name: "Last", href: "/" },
      ]),
    ).toStrictEqual(objectArrayCrumbs);
  });
});
