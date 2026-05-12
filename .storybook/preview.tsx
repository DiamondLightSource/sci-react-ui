import React, { useLayoutEffect } from "react";
import type { Preview } from "@storybook/react";

import { ThemeProvider } from "../src";
import {
  GenericTheme,
  DiamondTheme,
  DiamondDSTheme,
  DiamondDSThemeDark,
} from "../src";

import {
  Context,
  ThemeSwapper,
  TextDark,
  TextLight,
  TextSystem,
} from "./ThemeSwapper";

const TextThemeBase = "Theme: Generic";
const TextThemeDiamond = "Theme: Diamond";
const TextThemeDiamondDS = "Theme: Diamond DS";

function resolveThemeMode(
  selectedThemeMode: string,
): "light" | "dark" | "system" {
  if (selectedThemeMode === TextLight) return "light";
  if (selectedThemeMode === TextDark) return "dark";

  return "system";
}

function getSystemMode(): "light" | "dark" {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(selectedTheme: string, resolvedMode: "light" | "dark") {
  switch (selectedTheme) {
    case TextThemeBase:
      return GenericTheme;

    case TextThemeDiamond:
      return DiamondTheme;

    case TextThemeDiamondDS:
    default:
      return resolvedMode === "dark" ? DiamondDSThemeDark : DiamondDSTheme;
  }
}

function ApplyModeToPreviewDoc({
  mode,
  doc,
}: {
  mode: "light" | "dark";
  doc: Document;
}) {
  useLayoutEffect(() => {
    const root = doc.documentElement;

    root.setAttribute("data-mode", mode);
    root.classList.toggle("dark", mode === "dark");
    root.classList.toggle("light", mode === "light");
    root.style.colorScheme = mode;
  }, [mode, doc]);

  return null;
}

export const decorators = [
  (StoriesWithPadding: React.FC) => {
    return (
      <div style={{ padding: "2em" }}>
        <StoriesWithPadding />
      </div>
    );
  },

  (StoriesWithThemeProvider: React.FC, context: Context) => {
    const selectedTheme = context.globals.theme || TextThemeDiamondDS;
    const selectedThemeMode = context.globals.themeMode || TextSystem;

    const defaultMode = resolveThemeMode(selectedThemeMode);
    const resolvedMode =
      defaultMode === "system" ? getSystemMode() : defaultMode;

    const doc: Document = context?.canvasElement?.ownerDocument ?? document;

    return (
      <ThemeProvider
        theme={resolveTheme(selectedTheme, resolvedMode)}
        defaultMode={defaultMode}
      >
        <ApplyModeToPreviewDoc mode={resolvedMode} doc={doc} />

        <ThemeSwapper context={context}>
          <StoriesWithThemeProvider />
        </ThemeSwapper>
      </ThemeProvider>
    );
  },
];

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "cog",
        items: [TextThemeBase, TextThemeDiamond, TextThemeDiamondDS],
        dynamicTitle: true,
      },
    },

    themeMode: {
      description: "Global theme mode for components",
      toolbar: {
        title: "Theme mode",
        icon: "mirror",
        items: [TextLight, TextDark, TextSystem],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: TextThemeDiamondDS,
    themeMode: TextSystem,
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    layout: "fullscreen",
    options: {
      storySort: {
        order: [
          "Introduction",
          "Foundation",
          "Helpers",
          "MUI",
          "Components",
          "Theme",
          "Theme/Logos",
          "Theme/Colours",
        ],
      },
    },
  },

  argTypes: {
    linkComponent: {
      control: false,
    },
  },
};

export default preview;
