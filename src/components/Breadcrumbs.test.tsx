import { render, RenderResult } from "@testing-library/react";
import { Breadcrumbs, getCrumbs } from "./Breadcrumbs";
import "@testing-library/jest-dom";

const defaultArrayObject = [
  { name: "first", href: "first/is/this" },
  { name: "second", href: "second" },
  { name: "last one", href: "last one" },
];
describe("Breadcrumbs", () => {
  function testHomeExists(renderResult: RenderResult) {
    const { getByTestId } = renderResult;
    const homeIcon = getByTestId("HomeIcon");

    expect(homeIcon).toBeInTheDocument();
    expect(homeIcon.parentElement).toHaveAttribute("href", "/");
  }

  it("should render without errors", () => {
    render(<Breadcrumbs path={defaultArrayObject} />);
  });

  it("should show just home when an empty string", () => {
    const renderResult = render(<Breadcrumbs path={[]} />);
    testHomeExists(renderResult);
    expect(renderResult.getAllByRole("link")).toHaveLength(1);
  });
});

describe("getCrumbs", () => {
  const correctCrumbs = [
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

  it("should match with correct array object passed", () => {
    expect(
      getCrumbs([
        {
          name: "first",
          href: "/first",
        },
        {
          name: "second",
          href: "/first/second",
        },
        {
          name: "last one",
          href: "/first/second/last one",
        },
      ])
    ).toStrictEqual(correctCrumbs);
  });

  it("should return an empty array when an empty array is passed", () => {
    expect(getCrumbs([])).toStrictEqual([]);
  });
});
