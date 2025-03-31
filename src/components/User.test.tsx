import "@testing-library/jest-dom";

import { fireEvent } from "@testing-library/react";
import { Avatar } from "@mui/material";
import { User } from "./User";
import { renderWithProviders } from "../__test-utils__/helpers";

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
    const loginCallback = jest.fn();
    const { getByText } = renderWithProviders(
      <User onLogin={loginCallback} user={null} />,
    );

    const loginButton = getByText("Login");
    fireEvent.click(loginButton);

    expect(loginCallback).toHaveBeenCalled();
  });

  it("should fire logout callback when button is clicked", () => {
    const logoutCallback = jest.fn();
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
});
