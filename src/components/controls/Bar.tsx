// Adapted from https://github.com/DiamondLightSource/web-ui-components
import {
  Box,
  BoxProps,
  Breakpoint,
  Container,
  LinkProps,
  Stack,
  styled,
} from "@mui/material";


interface BarProps extends BoxProps, React.PropsWithChildren {
  centreSlot?: React.ReactElement<LinkProps>;
  rightSlot?: React.ReactElement<LinkProps>;
  leftSlot?: React.ReactElement<LinkProps>;
  containerWidth?: false | Breakpoint;
}

const BoxStyled = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  height: "100%", 
  minHeight: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: 0,
  backgroundColor: theme.vars.palette.primary.main,
}));

/**
 * Basic bar. Comes with three slots, and adjustable width. Children are placed in the left slot.
 */
const Bar = ({
  children,
  leftSlot,
  rightSlot,
  centreSlot,
  containerWidth,
  ...props
}: BarProps) => (
  <BoxStyled {...props}>
    <Container
      maxWidth={containerWidth}
      sx={{
        height: "100%",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          {leftSlot}
          {children}
        </Stack>
        {rightSlot}
      </Stack>
    </Container>
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {centreSlot}
    </Box>
  </BoxStyled>
)

export { Bar };
export type { BarProps };
