import React from "react";
import {
  Box,
  BoxProps,
  Breakpoint,
  Container,
  LinkProps,
  Stack,
  styled,
} from "@mui/material";

interface SlotProps extends BoxProps, React.PropsWithChildren {
  className: string;
}
const Slot = ({ className, style, children }: SlotProps) => (
  <Stack
    className={className}
    direction="row"
    alignItems="center"
    spacing={2}
    style={style}
  >
    {children}
  </Stack>
);

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

interface BarProps extends BoxProps, React.PropsWithChildren {
  containerWidth?: false | Breakpoint;
}

interface BarSlotsProps extends BarProps {
  centreSlot?: React.ReactElement<LinkProps>;
  rightSlot?: React.ReactElement<LinkProps>;
  leftSlot?: React.ReactElement<LinkProps>;
}

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
}: BarSlotsProps) => (
  <BoxStyled {...props}>
    <Container
      maxWidth={containerWidth}
      sx={{
        height: "100%",
      }}
    >
      <Stack
        direction="row"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Slot className="left-slot">
          {leftSlot}
          {children}
        </Slot>

        <Box
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Slot className="centre-slot">{centreSlot}</Slot>
        </Box>

        <Slot className="right-slot">{rightSlot}</Slot>
      </Stack>
    </Container>
  </BoxStyled>
);

export { Bar };
export type { BarProps, BarSlotsProps };
