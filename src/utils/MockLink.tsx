import { Link as MuiLink } from "@mui/material";

interface MockLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
  [key: string]: unknown;
}

const MockLink: React.FC<MockLinkProps> = ({ to, children, ...props }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Mock navigation to: ${to}`);
  };

  return (
    <MuiLink
      href={typeof to === "string" ? to : "#"}
      onClick={handleClick}
      underline="hover"
      color="inherit"
      {...props}
    >
      {children}
    </MuiLink>
  );
};

export { MockLink };
export type { MockLinkProps };
