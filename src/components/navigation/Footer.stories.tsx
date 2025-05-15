import { Meta, StoryObj } from "@storybook/react/*";
import { Footer, FooterLink, FooterLinks } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "SciReactUI/Navigation/Footer",
  component: Footer,
  decorators: [(Story) => <Story />],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const footerLinks = [
  <FooterLinks key="footer-links">
    <FooterLink href="#TheMoon" key="the-moon">
      The Moon
    </FooterLink>
    <FooterLink href="#Phobos" key="phobos">
      Phobos
    </FooterLink>
    <FooterLink href="#Ganymede" key="ganymede">
      Ganymede
    </FooterLink>
    <FooterLink href="#Titan" key="titan">
      Titan
    </FooterLink>
  </FooterLinks>,
];

export const All: Story = {
  args: {
    logo: "theme",
    copyright: "Company",
    children: footerLinks,
  },
};

export const LogoOnly: Story = {
  args: {
    logo: "theme",
  },
};

export const CopyrightOnly: Story = {
  args: {
    logo: null,
    copyright: "Company",
  },
};

export const CopyrightAndLogo: Story = {
  args: {
    logo: "theme",
    copyright: "Company",
  },
};

export const LinksAndCopyright: Story = {
  args: {
    copyright: "Company",
    children: footerLinks,
  },
};

export const LinksOnly: Story = {
  args: {
    children: footerLinks,
  },
};

export const LinksOnlyCentred: Story = {
  args: {
    children: [
      <FooterLinks
        key="footer-links"
        style={{ float: "unset", textAlign: "center" }}
      >
        <FooterLink href="#TheMoon" key="the-moon">
          The Moon
        </FooterLink>
        <FooterLink href="#Phobos" key="phobos">
          Phobos
        </FooterLink>
        <FooterLink href="#Ganymede" key="ganymede">
          Ganymede
        </FooterLink>
        <FooterLink href="#Titan" key="titan">
          Titan
        </FooterLink>
      </FooterLinks>,
    ],
  },
};
LinksOnlyCentred.storyName = "Links Only, Centred";
