import {PropsWithChildren, useEffect, useState} from "react";
import Keycloak, {KeycloakServerConfig, KeycloakError, KeycloakInitOptions} from "keycloak-js";
import {
  AuthContext,
  Auth,
  init,
  onAuthLogout,
  onAuthSuccess,
  onAuthRefreshSuccess,
  onError,
  updateAuth
} from "./auth";

export interface AuthProviderSettings {
  /* call function when token is set, renewed or cleared */
  onTokenChange?: (token: string) => void,
  /* Renew token before it expires by this amount, default 10s */
  minimumSecondsLeftInToken?: number
}

export interface AuthProviderProps extends AuthProviderSettings, PropsWithChildren  {
  /* Main Keycloak.js config file. */
  keycloakConfig: KeycloakServerConfig,
  /* Keycloak.js initiate options. */
  keycloakInitOptions?: KeycloakInitOptions,
}

export const AuthProvider = ({children, keycloakConfig, keycloakInitOptions, ...settings}: AuthProviderProps) => {
  const [auth, setAuth] = useState<Auth>(updateAuth(null));
  const [token, setAuthToken] = useState<string|null>(null);
  
  const keycloak = new Keycloak({ ...keycloakConfig });
  
  const tokenChanged = (): void => {
    const token = (keycloak.authenticated && keycloak.token) ? keycloak.token : "";
    setAuthToken(token)
    if(settings.onTokenChange) settings.onTokenChange(token)
  }
  
  keycloak.onAuthRefreshSuccess = () => {
    onAuthRefreshSuccess(keycloak, settings)
    tokenChanged()
  }
  keycloak.onAuthSuccess = () => {
    setAuth(onAuthSuccess(keycloak, settings))
    tokenChanged()
  }
  keycloak.onAuthLogout = () => {
    setAuth( onAuthLogout(keycloak, settings) )
    tokenChanged()
  }
  
  keycloak.onAuthError = (error: KeycloakError) => {
    const authChanged = onError(keycloak, "Auth error: " + error);
    if(authChanged) setAuth(authChanged)
  }
  
  useEffect(() => {
    if( !keycloak.didInitialize ) {
      init(keycloak, keycloakInitOptions).then((auth) => {
        if (auth) setAuth(auth)
        tokenChanged()
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