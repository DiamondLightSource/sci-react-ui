import "@testing-library/jest-dom";

import Keycloak from "keycloak-js";

import {
  addError,
  updateAuth
} from './auth'

describe('Auth', () => {
  it("is no auth when no keycloak", () => {
    const auth = updateAuth(null);

    expect(auth.initialised).toBeFalsy()
    expect(auth.authenticated).toBeFalsy()
    
    expect(auth.errors).toBeUndefined()
    expect(auth.user).toBeUndefined()
  })

  it("is initialised correctly", () => {

    const auth = updateAuth({
      didInitialize: true,
      authenticated: false
    } as Keycloak);

    expect(auth.initialised).toBeTruthy()
    expect(auth.authenticated).toBeFalsy()

    expect(auth.errors).toBeUndefined()
    expect(auth.user).toBeUndefined()
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
  
  it('Add error', () => {
    expect(addError("An error")).toBeTruthy()
  });

  it('Add multiple errors', () => {
    expect(addError("First error")).toBeTruthy()
    expect(addError("Second error")).toBeTruthy()
  });

  it('Not repeating errors', () => {
    const error = "One time error"; 
    expect(addError(error)).toBeTruthy()
    expect(addError(error)).toBeFalsy()
  });
});