import { createRef } from "react";
import { Settings } from "lucide-react";

import { LucideIcon } from "./LucideIcon";
import { renderWithProviders } from "../../../__test-utils__/helpers";

describe("LucideIcon", () => {
  it("leaves sizing to MUI's font size unless `size` is given", () => {
    const { getByTestId, rerender } = renderWithProviders(
      <LucideIcon icon={Settings} data-testid="icon" />,
    );
    expect(getByTestId("icon")).not.toHaveStyle({ width: "24px" });

    rerender(<LucideIcon icon={Settings} size="xl" data-testid="icon" />);
    expect(getByTestId("icon")).toHaveStyle({ width: "40px", height: "40px" });
  });

  it("forwards refs and merges function sx", () => {
    const ref = createRef<SVGSVGElement>();
    const { getByTestId } = renderWithProviders(
      <LucideIcon
        icon={Settings}
        ref={ref}
        data-testid="icon"
        sx={() => ({ opacity: 0.5 })}
      />,
    );
    expect(ref.current).toBe(getByTestId("icon"));
    expect(getByTestId("icon")).toHaveStyle({ opacity: "0.5" });
  });
});
