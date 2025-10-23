import "@testing-library/jest-dom";

import {renderWithProviders} from "../../../__test-utils__/helpers";
import {AuthProvider} from "./AuthProvider";

import {useAuth, useToken} from "./auth";
import {screen} from "@testing-library/react";


describe("AuthProvider useAuth", () => {
  const TestProvider = () => {
    const auth = useAuth();
    if( !auth.authenticated )
      return <>{"Not Authenticated"}</>
    return <></>
  }
  it("should be able to use useAuth", async () => {
    renderWithProviders(
      <AuthProvider keycloakConfig={{
        url: "_", realm: "_", clientId: "_"
      }} keycloakInitOptions={{ 
        onLoad: undefined
      }}>
          <TestProvider/>
      </AuthProvider>
    )
    expect( await screen.findByText("Not Authenticated") ).toBeInTheDocument();
  })

  it("should be able to use useAuth with settings", async () => {
    renderWithProviders(
      <AuthProvider
        keycloakConfig={{
          url: "_",
          realm: "_",
          clientId: "_",
        }}
        keycloakInitOptions={{
          onLoad: undefined
        }}
        onTokenChange={() => {}}
        minimumSecondsLeftInToken={15}
      >
        <TestProvider/>
      </AuthProvider>
    )
    expect( await screen.findByText("Not Authenticated") ).toBeInTheDocument();
  })
})


describe("AuthProvider useToken", () => {
  const TestProvider = () => {
    const token = useToken();
    return <div data-testid="token">{token}</div>
  }
  
  it("should be able to use useToken", async () => {
    renderWithProviders(
      <AuthProvider keycloakConfig={{
        url: "_", realm: "_", clientId: "_"
      }} keycloakInitOptions={{
        onLoad: undefined
      }}>
        <TestProvider/>
      </AuthProvider>
    )
    expect( await screen.findByTestId("token") ).toBeInTheDocument();
  })
  
  it("should be able to use useAuth with settings", async () => {
    renderWithProviders(
      <AuthProvider
        keycloakConfig={{
          url: "_",
          realm: "_",
          clientId: "_",
        }}
        keycloakInitOptions={{
          onLoad: undefined
        }}
        onTokenChange={() => {}}
        minimumSecondsLeftInToken={15}
      >
        <TestProvider/>
      </AuthProvider>
    )
    expect( await screen.findByTestId("token") ).toBeInTheDocument();
  })
})