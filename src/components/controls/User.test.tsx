import { fireEvent, screen } from "@testing-library/react";
import { Avatar, MenuItem } from "@mui/material";
import { renderWithProviders } from "../../__test-utils__/helpers";
import {Auth} from "../systems/auth";

import { User } from "./User";
import {KeycloakLoginOptions, KeycloakLogoutOptions} from "keycloak-js";

describe("User", () => {
  
  it("should render", () => {
    renderWithProviders(
      <User onLogin={()=>0} onLogout={()=>0} user={null} />,
    );
    renderWithProviders(<User onLogout={()=>0} user={null} />);
    renderWithProviders(<User onLogin={()=>0} user={null} />);
    renderWithProviders(<User user={null} />);
    renderWithProviders(<User />);
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
    const {getByRole} = renderWithProviders(
      <User
        onLogin={() => {
        }}
        onLogout={() => {
        }}
        user={{name: "Name", fedid: "FedID"}}
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

describe("User with Auth", () => {
  
  const authDummy: Auth = {
    authenticated: false,
    initialised: false,
    getProfileUrl:() => "",
    getToken: () => "",
    login() {},
    logout() {},
    _keycloak: null,
  }
  const authDummyUser = {
    name: "",
    givenName: "",
    familyName: "",
    fedId: "",
    email: ""
  }

  it("should render", () => {
    renderWithProviders(<User auth={authDummy}/>);
  });
  
  it("should use auth name when passed in", () => {
    const auth: Auth = {
      ...authDummy,
      user: {
        ...authDummyUser,
        name: "test name",
      }
    }
    const { queryByText } = renderWithProviders(<User auth={auth}/>);
    // @ts-ignore 
    expect( queryByText(auth.user.name)).toBeInTheDocument()
  });
  
  it("should fire auth login callback when button is clicked", () => {
    const loginCallback = vi.fn();
    const auth = {
      ...authDummy,
      login: loginCallback
    }
    const { getByText } = renderWithProviders(
      <User auth={auth} />,
    );

    const loginButton = getByText("Login");
    fireEvent.click(loginButton);

    expect(loginCallback).toHaveBeenCalledTimes(1);
  });
  
  it("should display additional menu item when auth", () => {
    const auth: Auth = {
      ...authDummy,
      user: {
        ...authDummyUser,
        name: "test name",
      }
    }
    const { getByRole } = renderWithProviders(
      <User auth={auth} />,
    );

    const userMenu = getByRole("button");
    fireEvent.click(userMenu);

    expect(screen.getByText("Profile")).toBeInTheDocument();
  });
  
})