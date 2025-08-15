import { Meta, StoryObj } from "@storybook/react/*";
import { Footer, FooterLink, FooterLinks } from "./Footer";
import { MockLink } from "../../utils/MockLink";

const meta: Meta<typeof Footer> = {
  title: "SciReactUI/Navigation/Footer",
  component: Footer,
  decorators: [(Story) => <Story />],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "A smart footer. For links, copyright, logo, and what ever you like. \n\n" +
          "Note: to locate the footer at the bottom of your screen on short pages, make sure the parent" +
          " has these values set: {min-height: 100vh; display: flex; flex-direction: column;}"
      },
    },
  },

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

const staticFooterLinks = (
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
  </FooterLinks>
);

export const All: Story = {
  args: {
    logo: "theme",
    copyright: "Company",
    children: staticFooterLinks,
  },
};

export const AllSlots: Story = {
  args: {
    logo: "theme",
    copyright: "Company",
    leftSlot: (
      <FooterLinks key="footer-links-left">
        <FooterLink href="#Left" key="left">
          Left
        </FooterLink>
      </FooterLinks>
    ),
    children: (
      <FooterLinks key="footer-links-children">
        <FooterLink href="#Children" key="children">
          Children
        </FooterLink>
      </FooterLinks>
    ),
    rightSlot: (
      <FooterLinks key="footer-links-right">
        <FooterLink href="#Right" key="right">
          Right
        </FooterLink>
      </FooterLinks>
    ),
    centreSlot: (
      <FooterLinks key="footer-links-centre">
        <FooterLink href="#Centre" key="centre">
          Centre
        </FooterLink>
      </FooterLinks>
    ),
  },
};

export const RightSlot: Story = {
  args: {
    logo: "theme",
    copyright: "Company",
    rightSlot: (
      <FooterLinks key="footer-links">
        <FooterLink href="#TheMoon" key="the-moon">
          The Moon
        </FooterLink>
        <FooterLink href="#Phobos" key="phobos">
          Phobos
        </FooterLink>
      </FooterLinks>
    ),
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

export const LinksOnlySlots: Story = {
  args: {
    leftSlot: (
      <FooterLinks key="footer-links-moon">
        <FooterLink href="#TheMoon" key="the-moon">
          The Moon
        </FooterLink>
      </FooterLinks>
    ),
    centreSlot: (
      <FooterLinks key="footer-links-phobos">
        <FooterLink href="#Phobos" key="phobos">
          Phobos
        </FooterLink>
      </FooterLinks>
    ),
    rightSlot: (
      <FooterLinks key="footer-links-titan">
        <FooterLink href="#Titan" key="titan">
          Titan
        </FooterLink>
      </FooterLinks>
    ),
  },
};
LinksOnlySlots.storyName = "Links Only, Slots";

export const LinksOnlyCentred: Story = {
  args: {
    centreSlot: staticFooterLinks,
  },
};
LinksOnlyCentred.storyName = "Links Only, Centred";
