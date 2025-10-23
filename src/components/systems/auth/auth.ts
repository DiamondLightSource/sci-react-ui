import Keycloak, {KeycloakError, KeycloakInitOptions, KeycloakLoginOptions, KeycloakLogoutOptions} from "keycloak-js";
import {createContext, useContext } from "react";
import {AuthProviderSettings} from "./AuthProvider";

export const DEFAULT_MINIMUM_SECONDS_LEFT_IN_TOKEN = 10
export const LIMIT_OF_TOKEN_RENEW_FREQUENCY_SECONDS = 5

export type AuthUser = {
  name: string
  givenName: string
  familyName: string
  fedId: string
  email: string
}

export interface Auth {
  /*  Is keycloak initialised  */
  initialised: boolean,
  /* Are we authenticated */
  authenticated: boolean,
  
  /* A user type holding the user information */
  user?: AuthUser
  
  /* log in to keycloak */
  login: (options?:KeycloakLoginOptions) => void,
  /* logout out of keycloak */
  logout: (options?:KeycloakLogoutOptions) => void,
  
  /* Return the current token */
  getToken: () => string,
  /* Return the profile page on Keycloak */
  getProfileUrl: () => string,
  
  /* Any errors caused by auth */
  errors?: string[],
  
  /* A back door into the Keycloak object, just in case, but in most cases, won't be needed */
  _keycloak: Keycloak | null
}

const errors : string[] = [];

export function addError( error : string ) : boolean {
  const added = !errors.includes(error)
  if( added ) {
    errors.push(error)
  }
  return added
}

export const AuthContext = createContext<Auth>(updateAuth(null))
export function useAuth() {
  return useContext(AuthContext);
}

export const AuthTokenContext = createContext<string|null>(null)
export function useToken() {
  return useContext(AuthTokenContext);
}


export async function init( keycloak: Keycloak, initOptions: KeycloakInitOptions={}) {
  try {
     await keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: undefined,
       ...initOptions,
    });
    
  } catch(error) {
    let errorMessage = "";
    if( "error" in (error as KeycloakError) ) {
      errorMessage = (error as KeycloakError).error
      if( "error_description" in (error as KeycloakError) ) {
        errorMessage += (error as KeycloakError).error_description
      }
    }
    else {
      if( error ) {
        errorMessage = JSON.stringify(error)
      }
    }
    
    addError("Failed to authorise, are you able to connect to Keycloak? " + errorMessage )
  }

  return updateAuth(keycloak)
}

export function onAuthRefreshSuccess(keycloak: Keycloak, settings: AuthProviderSettings) {
  tokenRefreshTimer(keycloak, settings)
}
export function onAuthSuccess(keycloak: Keycloak, settings: AuthProviderSettings) : Auth {
  tokenRefreshTimer(keycloak, settings)
  
  return updateAuth(keycloak)
}
export function onAuthLogout(keycloak: Keycloak, settings: AuthProviderSettings) : Auth  {
  tokenRefreshTimer(null, settings)
  clearInterval(tokenRefreshTimeout);
  
  return updateAuth(keycloak)
}
export function onError(keycloak: Keycloak, error: string) : Auth | null {

  if( addError(error) ) {
    // Only update auth if it's a *new* error
    return updateAuth(keycloak)
  }
  return null
}


let tokenRefreshTimeout: ReturnType<typeof setTimeout> | undefined;
export function tokenRefreshTimer(keycloak: Keycloak | null, settings: AuthProviderSettings) : void  {
  
  clearTimeout(tokenRefreshTimeout);
  tokenRefreshTimeout = undefined;
  
  if( !keycloak ) {
    return
  }
  
  if( !keycloak.idTokenParsed || !keycloak.idTokenParsed.exp || !keycloak.idTokenParsed.iat ) {
    // This should never happen, but TypeScript whines if these aren't "checked".
    console.error("Unable to access expire time and issue time on token")
    return
  }
  
  /* Find the token expire time and create a timer to renew before it expires */
  const minimumSecondsLeftInToken = settings.minimumSecondsLeftInToken ?? DEFAULT_MINIMUM_SECONDS_LEFT_IN_TOKEN,
        secondsToExpire = keycloak.idTokenParsed.exp - keycloak.idTokenParsed.iat
  
  let timeoutSeconds;
  if( minimumSecondsLeftInToken >= secondsToExpire ) {
    // Renew happens as token expires.
    timeoutSeconds = secondsToExpire
  }
  else {
    timeoutSeconds = secondsToExpire - minimumSecondsLeftInToken;
  }
  
  if( timeoutSeconds < LIMIT_OF_TOKEN_RENEW_FREQUENCY_SECONDS ) {
     timeoutSeconds = LIMIT_OF_TOKEN_RENEW_FREQUENCY_SECONDS
  }
  
  tokenRefreshTimeout = setTimeout(() => {
    keycloak.updateToken(-1)
      .catch((error: KeycloakError) => {
        addError('Failed to refresh the token:' + error);
      })
  }, timeoutSeconds * 1000);
}


export function updateAuth(keycloak: Keycloak | null) : Auth {
  const auth : Auth = {
    initialised: false,
    authenticated: false,
    
    login: (options) => keycloak?.login(options),
    logout: (options) => keycloak?.logout(options),
    
    getProfileUrl: () => keycloak?.createAccountUrl() ?? "",
    getToken: () => keycloak?.token ?? "",
    
    _keycloak: keycloak
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
          fedId: keycloak.idTokenParsed.fedId || undefined,
          email: keycloak.idTokenParsed.email || undefined
        }
      }
    }
  }
  
  return auth
}