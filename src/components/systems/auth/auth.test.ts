import Keycloak from "keycloak-js";

import {
  addError,
  updateAuth,
  tokenRefreshTimer,
  DEFAULT_MINIMUM_SECONDS_LEFT_IN_TOKEN,
  LIMIT_OF_TOKEN_RENEW_FREQUENCY_SECONDS
} from './auth'
import {AuthProviderSettings} from "./AuthProvider";

describe('Auth', () => {
  it("is no auth when no keycloak", () => {
    const auth = updateAuth(null);

    expect(auth.initialised).toBeFalsy()
    expect(auth.authenticated).toBeFalsy()
    
    expect(auth.errors).toBeUndefined()
    expect(auth.user).toBeUndefined()
    
    expect(auth.getToken()).toEqual("")
    expect(auth.getProfileUrl()).toEqual("")
    
    expect(auth._keycloak).toBeNull()
  })

  it("is initialised correctly", () => {
    const keycloakMock = {
      didInitialize: true,
      authenticated: false
    } as Keycloak
    const auth = updateAuth(keycloakMock);

    expect(auth.initialised).toBeTruthy()
    expect(auth.authenticated).toBeFalsy()

    expect(auth.errors).toBeUndefined()
    expect(auth.user).toBeUndefined()
    
    expect(auth._keycloak).toEqual(keycloakMock)
  })

  it("is authenticated correctly", () => {

    const auth = updateAuth({
      didInitialize: true,
      authenticated: true
    } as Keycloak);

    expect(auth.initialised).toBeTruthy()
    expect(auth.authenticated).toBeTruthy()

    expect(auth.errors).toBeUndefined()
    expect(auth.user).toBeUndefined()
  })
  
  it("has a user", () => {

    const auth = updateAuth({
      didInitialize: true,
      authenticated: true,
      idTokenParsed: {
        name: "shouldBeName",
        given_name: "shouldBeGivenName",
        family_name: "shouldBeFamilyName",
        fedId: "shouldBeFedId",
        email: "shouldBeEmail"
      }
    } as unknown as Keycloak);

    expect(auth.initialised).toBeTruthy()
    expect(auth.authenticated).toBeTruthy()
    
    expect(auth.user).toBeDefined()
    
    // @ts-expect-error...
    expect(auth.user.name).toBe("shouldBeName")
    // @ts-expect-error...
    expect(auth.user.givenName).toBe("shouldBeGivenName")
    // @ts-expect-error...
    expect(auth.user.familyName).toBe("shouldBeFamilyName")
    // @ts-expect-error...
    expect(auth.user.fedId).toBe("shouldBeFedId")
    // @ts-expect-error...
    expect(auth.user.email).toBe("shouldBeEmail")
  })


  it("has a user without email", () => {

    const auth = updateAuth({
      didInitialize: true,
      authenticated: true,
      idTokenParsed: {
        name: "shouldBeName",
        given_name: "shouldBeGivenName",
        family_name: "shouldBeFamilyName",
        fedId: "shouldBeFedId"
      }
    } as unknown as Keycloak);

    expect(auth.user).toBeDefined()
    
    // @ts-expect-error...
    expect(auth.user.name).toBe("shouldBeName")
    // @ts-expect-error...
    expect(auth.user.givenName).toBe("shouldBeGivenName")
    // @ts-expect-error...
    expect(auth.user.familyName).toBe("shouldBeFamilyName")
    // @ts-expect-error...
    expect(auth.user.fedId).toBe("shouldBeFedId")
    // @ts-expect-error...
    expect(auth.user.email).toBeUndefined()
  })
  
})

describe('Errors', () => {
  
  it('should add error', () => {
    expect(addError("An error")).toBeTruthy()
  });

  it('should add multiple errors', () => {
    expect(addError("First error")).toBeTruthy()
    expect(addError("Second error")).toBeTruthy()
  });

  it('should not add repeating errors', () => {
    const error = "One time error"; 
    expect(addError(error)).toBeTruthy()
    expect(addError(error)).toBeFalsy()
  });
});

describe("tokenRefreshTimer", ()=>{
  
  vi.useFakeTimers();
  
  const advanceBySeconds =
    (secs:number) => vi.advanceTimersByTime(secs*1000)
  
  const mockUpdateToken = vi.fn();
  mockUpdateToken.mockReturnValue(new Promise(()=>{}))
  
  const tokenCreateTime = 1234;
  const tokenAliveSeconds = 20;
  const keycloakMock = {
    updateToken: mockUpdateToken,
    idTokenParsed: {
      iat: tokenCreateTime,
      exp: tokenCreateTime + tokenAliveSeconds
    }
  }  as unknown as Keycloak
  
  it('should call tokenRefresh after 10 seconds using default min', () => {
    mockUpdateToken.mockClear()
    
    tokenRefreshTimer(keycloakMock,{})
    
    advanceBySeconds(
      // Half way to timeout
      DEFAULT_MINIMUM_SECONDS_LEFT_IN_TOKEN/2
    );
    expect(mockUpdateToken).not.toHaveBeenCalledWith(-1)
    
    advanceBySeconds(
      DEFAULT_MINIMUM_SECONDS_LEFT_IN_TOKEN/2
    );
    expect(mockUpdateToken).toHaveBeenCalledWith(-1)
  });
  
  it('should call tokenRefresh after 15 seconds when min is 5', () => {
    mockUpdateToken.mockClear()
    const min = 5;
    const settings = {
      minimumSecondsLeftInToken: min
    } as AuthProviderSettings
    
    tokenRefreshTimer(keycloakMock,settings)
    
    advanceBySeconds( tokenAliveSeconds - min );
    expect(mockUpdateToken).toHaveBeenCalledWith(-1)
  });
  
  it('should renew before token expires even if min is larger', () => {
    mockUpdateToken.mockClear()
    
    const settings = {
      minimumSecondsLeftInToken: tokenAliveSeconds + 10
    } as AuthProviderSettings
    
    tokenRefreshTimer(keycloakMock,settings)
    
    advanceBySeconds(
      // Half timeout
      tokenAliveSeconds/2
    );
    expect(mockUpdateToken).not.toHaveBeenCalledWith(-1)
    
    advanceBySeconds(tokenAliveSeconds/2);
    expect(mockUpdateToken).toHaveBeenCalledWith(-1)
  });
  
  it('should not renew faster than 5 seconds', () => {
    mockUpdateToken.mockClear()
    
    const renewLimit = LIMIT_OF_TOKEN_RENEW_FREQUENCY_SECONDS;
    const keycloakMock = {
      updateToken: mockUpdateToken,
      idTokenParsed: {
        iat: tokenCreateTime,
        exp: tokenCreateTime + (renewLimit - 1)
      }
    }  as unknown as Keycloak
    
    const settings = {
      minimumSecondsLeftInToken: tokenAliveSeconds + 10
    } as AuthProviderSettings
    
    tokenRefreshTimer(keycloakMock,settings)
    
    advanceBySeconds(renewLimit-1);
    expect(mockUpdateToken).not.toHaveBeenCalledWith(-1)
    
    advanceBySeconds(1);
    expect(mockUpdateToken).toHaveBeenCalledWith(-1)
  });
  
})