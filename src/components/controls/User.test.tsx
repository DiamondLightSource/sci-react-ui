import "@testing-library/jest-dom";
import { vi } from "vitest";

import { fireEvent } from "@testing-library/react";
import { Avatar, MenuItem } from "@mui/material";
import { User } from "./User";
import { renderWithProviders } from "../../__test-utils__/helpers";
import { screen } from "@testing-library/react";

describe("User", () => {
  it("should render", () => {
    renderWithProviders(
      <User onLogin={() => {}} onLogout={() => {}} user={null} />,
    );
    renderWithProviders(<User onLogout={() => {}} user={null} />);
    renderWithProviders(<User onLogin={() => {}} user={null} />);
    renderWithProviders(<User user={null} />);
  });

  it("should display login button when not authenticated", () => {
    const { getByText } = renderWithProviders(
      <User onLogin={() => {}} onLogout={() => {}} user={null} />,
    );
    const loginButton = getByText("Login");

    expect(loginButton).toBeInTheDocument();
  });

  it("should display logout menuitem when authenticated", () => {
    const { getByRole, getByText } = renderWithProviders(
      <User
        onLogin={() => {}}
        onLogout={() => {}}
        user={{ name: "Name", fedid: "FedID" }}
      />,
    );

    const userMenu = getByRole("button");
    fireEvent.click(userMenu);

    const logoutMenuItem = getByText("Logout");
    expect(logoutMenuItem).toBeInTheDocument();
  });

  it("should fire login callback when button is clicked", () => {
    const loginCallback = vi.fn();
    const { getByText } = renderWithProviders(
      <User onLogin={loginCallback} user={null} />,
    );

    const loginButton = getByText("Login");
    fireEvent.click(loginButton);

    expect(loginCallback).toHaveBeenCalled();
  });

  it("should fire logout callback when button is clicked", () => {
    const logoutCallback = vi.fn();
    const { getByRole, getByText } = renderWithProviders(
      <User
        onLogout={logoutCallback}
        user={{ name: "Name", fedid: "FedID" }}
      />,
    );
    const userMenu = getByRole("button");
    fireEvent.click(userMenu);

    const logoutMenuItem = getByText("Logout");
    fireEvent.click(logoutMenuItem);

    expect(logoutCallback).toHaveBeenCalled();
  });

  it("should display name and FedID", () => {
    const name = "A Name",
      fedId = "FED14000";
    const { getByText } = renderWithProviders(
      <User user={{ name: name, fedid: fedId }} />,
    );

    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(fedId)).toBeInTheDocument();
  });

  it("should not have logout when no onLogout", () => {
    const { getByRole, queryByText } = renderWithProviders(
      <User user={{ name: "Name", fedid: "FedID" }} />,
    );
    const userMenu = getByRole("button");
    fireEvent.click(userMenu);

    const logoutMenuItem = queryByText("Logout");
    expect(logoutMenuItem).not.toBeInTheDocument();
  });

  it("should render a new avatar", () => {
    const avatarInitials = "MW";
    const { queryByText } = renderWithProviders(
      <User
        user={{ name: "Name", fedid: "FedID" }}
        avatar={<Avatar>{avatarInitials}</Avatar>}
      />,
    );

    const avatar = queryByText(avatarInitials);
    expect(avatar).toBeInTheDocument();
  });

  it("should display additional menu items when provided", () => {
    const { getByRole } = renderWithProviders(
      <User
        onLogin={() => {}}
        onLogout={() => {}}
        user={{ name: "Name", fedid: "FedID" }}
        menuItems={[
          <MenuItem key="profile" aria-label="Profile">
            Profile
          </MenuItem>,
          <MenuItem key="settings" aria-label="Settings">
            Settings
          </MenuItem>,
        ]}
      />,
    );

    const userMenu = getByRole("button");
    fireEvent.click(userMenu);

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
