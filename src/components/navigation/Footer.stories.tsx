import { Meta, StoryObj } from "@storybook/react/*";
import { Footer, FooterLink, FooterLinks } from "./Footer";
import { MockLink } from "../../utils/MockLink";

const meta: Meta<typeof Footer> = {
  title: "SciReactUI/Navigation/Footer",
  component: Footer,
  decorators: [(Story) => <Story />],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const routerFooterLinks = [
  <FooterLinks key="footer-links">
    <FooterLink to="home/TheMoon" key="the-moon" linkComponent={MockLink}>
      The Moon
    </FooterLink>
    <FooterLink to="home/Phobos" key="phobos" linkComponent={MockLink}>
      Phobos
    </FooterLink>
    <FooterLink to="home/Ganymede" key="ganymede" linkComponent={MockLink}>
      Ganymede
    </FooterLink>
    <FooterLink to="home/Titan" key="titan" linkComponent={MockLink}>
      Titan
    </FooterLink>
  </FooterLinks>,
];

const staticFooterLinks = [
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
    children: staticFooterLinks,
  },
};

export const RouterLinks: Story = {
  args: {
    logo: "theme",
    copyright: "Company",
    children: routerFooterLinks,
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
    children: staticFooterLinks,
  },
};

export const LinksOnly: Story = {
  args: {
    children: staticFooterLinks,
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
