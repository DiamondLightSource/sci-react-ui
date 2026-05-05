import { ElementType, forwardRef } from "react";

export default function MuiWrapper<Prop, Element = HTMLDivElement>(
  MuiComponent: ElementType,
  name: string,
) {
  const RefForward = forwardRef<Element, Prop>((props, ref) => (
    <MuiComponent {...props} ref={ref} />
  ));

  RefForward.displayName = name;
  return RefForward;
}
