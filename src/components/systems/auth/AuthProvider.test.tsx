import "@testing-library/jest-dom";

import {renderWithProviders} from "../../../__test-utils__/helpers";
import {AuthProvider} from "./AuthProvider";

import {useAuth} from "./auth";
import {screen} from "@testing-library/react";

const TestProvider = () => {
  const auth = useAuth();
  if( !auth.authenticated )
    return <>{"Not Authenticated"}</>
  return <></>
}

describe("AuthProvider", () => {
  it("should be able to use useAuth", async () => {
    renderWithProviders(
      <AuthProvider keycloakConfig={{
        url: "_", realm: "_", clientId: "_"
      }} keycloakInitOptions={{ 
        onLoad: undefined, silentCheckSsoRedirectUri: "_"
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
          onLoad: undefined, silentCheckSsoRedirectUri: "_"
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