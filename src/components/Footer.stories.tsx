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

export const All: Story = {
  args: {
    logo: "theme",
    copyright: "Company",
    children: [
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
    ],
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

export const WithOneLink: Story = {
  args: {
    copyright: "Company",
    children: [
      <FooterLinks key="footer-links">
        <FooterLink href="#" key="first-footer-link">
          Link one
        </FooterLink>
      </FooterLinks>,
    ],
  },
};

export const WithTwoLinks: Story = {
  args: {
    copyright: "Company",
    children: [
      <FooterLinks key="footer-links">
        <FooterLink href="#" key="first-footer-link">
          Link one
        </FooterLink>
        <FooterLink href="#" key="second-footer-link">
          Link two
        </FooterLink>
      </FooterLinks>,
    ],
  },
};
