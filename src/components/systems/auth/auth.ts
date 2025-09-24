import Keycloak, {KeycloakConfig, KeycloakInitOptions, KeycloakLoginOptions, KeycloakLogoutOptions} from "keycloak-js";
import {createContext, useContext } from "react";

export type User = {
  name: string
  givenName: string
  familyName: string
  fedid: string
  email: string
}

export interface Auth {
  initialised: boolean,
  authenticated: boolean,
  
  user?: User
  
  login: (options?:KeycloakLoginOptions) => void,
  logout: (options?:KeycloakLogoutOptions) => void,
  refresh: (minValidity?: number) => void,
  
  errors?: string[]
}

const errors : string[] = [];
function addError( error : string ) : boolean {
  const adding = !errors.includes(error)
  if( adding ) {
    errors.push(error)
  }
  return adding
}

export const AuthContext = createContext(updateAuth(null))
export function useAuth() {
  return useContext(AuthContext);
}

export function create(keycloakConfig: KeycloakConfig) {
  
  const keycloak = new Keycloak( keycloakConfig );
  
  keycloak.onAuthRefreshSuccess = () => {
    updateTokenStore(keycloak)
    tokenRefreshTimer(keycloak)
  }
  
  return keycloak
}

export async function init( keycloak: Keycloak, initOptions: KeycloakInitOptions={}) {
  
  if( !keycloak.didInitialize ) {
    try {
      await keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: `${location.origin}/keycloak.js/silent-check-sso.html`,
        ...initOptions,
      });
    } catch {
      addError("Failed to authorise. Are you able to connect to Keycloak?")
    }
    
    return updateAuth(keycloak)
  }
}

export function onAuthSuccess(keycloak: Keycloak) : Auth {
  updateTokenStore(keycloak)
  tokenRefreshTimer(keycloak)
  
  return updateAuth(keycloak)
}
export function onAuthLogout(keycloak: Keycloak) : Auth  {
  updateTokenStore(keycloak)
  tokenRefreshTimer(null)
  
  clearInterval(tokenRefreshInterval);
  return updateAuth(keycloak)
}

let tokenRefreshInterval: NodeJS.Timeout | undefined;
export function tokenRefreshTimer(keycloak: Keycloak | null)  {
  clearInterval(tokenRefreshInterval);
  tokenRefreshInterval = undefined;
  
  if( !keycloak || !keycloak.idTokenParsed || !keycloak.idTokenParsed.exp || !keycloak.idTokenParsed.iat) {
    return
  }
  
  const secondsWantedLeftInToken = 10;
  const timeToExpire = keycloak.idTokenParsed.exp - keycloak.idTokenParsed.iat;
  
  if( timeToExpire > secondsWantedLeftInToken ) {
    const interval =  (timeToExpire-secondsWantedLeftInToken) * 1000;
    
    tokenRefreshInterval = setInterval(() => {
      keycloak.updateToken(secondsWantedLeftInToken+1)
        .then((refreshed)=>{
          console.log(refreshed ? 'Token was refreshed' : 'Token is still valid');
        })
        .catch((error)=> {
          console.error('Failed to refresh the token:', error);
        })
    }, interval);
  }
}

export function onError(keycloak: Keycloak, error: string) : Auth | null {
  if( addError(error) ) {
    return updateAuth(keycloak)
  }
  return null
}

const tokenItemName = "KEYCLOAK.TOKEN"
function updateTokenStore(keycloak: Keycloak) {
  sessionStorage.setItem(tokenItemName, (keycloak.authenticated && keycloak.token) ? keycloak.token : "" );
}
export function readTokenStore() : string {
  return sessionStorage.getItem(tokenItemName) || "";
}

export function updateAuth(keycloak: Keycloak | null) : Auth {
  const auth : Auth = {
    initialised: false,
    authenticated: false,
    
    login: (options) => keycloak && keycloak.login(options),
    logout: (options) => keycloak && keycloak.logout(options),
    refresh: (minValidity) => keycloak && keycloak.updateToken(minValidity),
  }
  
  if( errors.length > 0 ) {
    auth.errors = errors;
  }
  
  if( keycloak ) {
    
    if( keycloak.didInitialize ) {
      auth.initialised = true
    }
    
    if( keycloak.authenticated ) {
      auth.authenticated = true
      
      if (keycloak.idTokenParsed) {
        auth.user = {
          name: keycloak.idTokenParsed.name || undefined,
          givenName: keycloak.idTokenParsed.given_name || undefined,
          familyName: keycloak.idTokenParsed.family_name || undefined,
          fedid: keycloak.idTokenParsed.fedid || undefined,
          email: keycloak.idTokenParsed.email || undefined
        }
      }
    }
  }
  
  return auth
}