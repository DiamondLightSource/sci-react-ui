import {PropsWithChildren, useEffect, useState} from "react";
import {AuthContext, Auth, create, updateAuth, init, onAuthSuccess, onAuthLogout, onError} from "./auth";
import Keycloak, {KeycloakConfig, KeycloakInitOptions} from "keycloak-js";

export interface AuthProviderProps extends PropsWithChildren {
  keycloakConfig: KeycloakConfig,
  keycloakInitOptions?: KeycloakInitOptions
}

export const AuthProvider = ({children, keycloakConfig, keycloakInitOptions}:AuthProviderProps) => {
  const [auth, setAuth] = useState<Auth>(updateAuth(null));
  const keycloak: Keycloak = create(keycloakConfig)
  
  keycloak.onAuthSuccess = () => setAuth( onAuthSuccess(keycloak) )
  keycloak.onAuthLogout = () => setAuth( onAuthLogout(keycloak) )
  keycloak.onAuthError = (error) => {
    const authChanges = onError(keycloak, "Auth error: " + error);
    if( authChanges) {
      setAuth(authChanges)
    }
  }
  
  useEffect(() => {
    if(!keycloak.didInitialize) {
      init(keycloak, keycloakInitOptions).then( (auth) => {
        if(auth) setAuth(auth)
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}