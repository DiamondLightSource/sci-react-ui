import React from "react";
import {
  AnchorMdx,
  CodeOrSourceMdx,
  HeadersMdx,
  Markdown,
} from "@storybook/addon-docs/blocks";

const PAGE_TITLES: Record<string, string> = {
  "index.md": "Overview",
  "installation.md": "Installation",
  "practical-guidance.md": "Practical Guidance",
  "working-with-components.md": "Working with Components",
  "layout-patterns.md": "Layout Patterns",
  "foundation/colour.md": "Foundations/Colour",
  "foundation/theme-colours.md": "Foundations/Theme Colours",
  "foundation/typography.md": "Foundations/Typography",
  "foundation/icons.md": "Foundations/Icons",
  "accessibility/overview.md": "Accessibility/Overview",
  "accessibility/colour-contrast.md":
    "Accessibility/Colour contrast and vision",
  "accessibility/cognitive.md": "Accessibility/Cognitive accessibility",
  "components/buttons.md": "MUI/Inputs/Button/Button guidance",
  "components/text-field.md": "MUI/Inputs/TextField/Input guidance",
  "components/table.md": "MUI/Data Display/Table/Table guidance",
  "components/material-react-table.md":
    "MUI/Data Display/Table/Material React Table guidance",
  "helpers/auth.md": "Helpers/Auth",
  "helpers/jsonforms.md": "Helpers/JsonForms",
  "theme/logos.md": "Theme/Logos",
};

const GITHUB_DOCS =
  "https://github.com/DiamondLightSource/sci-react-ui/blob/main/docs/";

// Markdown's `options.overrides` replaces Storybook's own, so its defaults are restated here.
const OPTIONS = {
  overrides: {
    code: CodeOrSourceMdx,
    a: AnchorMdx,
    ...HeadersMdx,
    h1: {
      component: (HeadersMdx as Record<string, React.ElementType>).h1,
      props: { className: "sbdocs-title" },
    },
    table: { props: { className: "ds-table" } },
  },
};

const storyId = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Points links to other docs/ pages at their Storybook page, or at GitHub if they have none. */
const rewriteLinks = (text: string, file: string) =>
  text.replace(/\]\(([^)\s#]+\.md)(?:#[^)]*)?\)/g, (_, link: string) => {
    const target = new URL(link, `http://docs/${file}`).pathname.slice(1);
    const title = PAGE_TITLES[target];
    return title
      ? `](?path=/docs/${storyId(title)}--docs)`
      : `](${GITHUB_DOCS}${target})`;
  });

/** Renders a docs/ Markdown file. `text` fences get the monospace fix used by the layout diagrams. */
export const DocsMarkdown = ({
  file,
  children,
}: {
  file: string;
  children: string;
}) => (
  <>
    {rewriteLinks(children, file)
      .split(/(```text\n[\s\S]*?```)/g)
      .filter(Boolean)
      .map((segment, i) =>
        segment.startsWith("```text") ? (
          <div className="ds-ascii" key={i}>
            <Markdown options={OPTIONS}>{segment}</Markdown>
          </div>
        ) : (
          <Markdown key={i} options={OPTIONS}>
            {segment}
          </Markdown>
        ),
      )}
  </>
);
