import { render, RenderResult } from "@testing-library/react";
import { Breadcrumbs, getCrumbs } from "./Breadcrumbs";
import "@testing-library/jest-dom";

const crumbFirst = "first",
  crumbFirstTitle = "First",
  crumbSecond = "second",
  crumbSecondTitle = "Second",
  crumbLast = "last one",
  crumbLastTitle = "Last one",
  defaultStringPath = `/${crumbFirst}/${crumbSecond}/${crumbLast}`,
  defaultArrayPath = [crumbFirst, crumbSecond, crumbLast],
  defaultArrayObject = [
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
      queryByRole("link", { name: crumbLastTitle })
    ).not.toBeInTheDocument();
    expect(getByText(crumbLastTitle)).toBeInTheDocument();
  }

  it("should render without errors", () => {
    render(<Breadcrumbs path={defaultArrayObject} />);
  });

  it("should show just home when an empty string", () => {
    const renderResult = render(<Breadcrumbs path={[]} />);
    testHomeExists(renderResult);
    expect(renderResult.getAllByRole("link")).toHaveLength(1);
  });

  it("should use path as string", () => {
    testCrumbsExist(render(<Breadcrumbs path={defaultStringPath} />));
  });

  it("should use path as string array", () => {
    testCrumbsExist(render(<Breadcrumbs path={defaultArrayPath} />));
  });

  it("should use path as object array", () => {
    const { getByRole, queryByRole, getByText } = render(
      <Breadcrumbs path={defaultArrayObject} />
    );
    let crumb = getByRole("link", { name: crumbFirstTitle });
    expect(crumb).toBeInTheDocument();
    expect(crumb).toHaveAttribute("href", `/${crumbFirst}`);

    crumb = getByRole("link", { name: crumbSecondTitle });
    expect(crumb).toBeInTheDocument();
    expect(crumb).toHaveAttribute("href", `/${crumbSecond}`);

    expect(
      queryByRole("link", { name: crumbLastTitle })
    ).not.toBeInTheDocument();
    expect(getByText(crumbLastTitle)).toBeInTheDocument();
  });
});
