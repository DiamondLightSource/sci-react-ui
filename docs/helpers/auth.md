# Using auth with Keycloak

This component is based on the official Keycloak.js adapter. More information: [www.keycloak.org/securing-apps/javascript-adapter](https://www.keycloak.org/securing-apps/javascript-adapter)

The auth component relies on `keycloak-js`. Although it is a peer and optional dependency of SciReactUI, you must install it separately with a compatible version (for example `^26.2.1`).

```sh
pnpm add keycloak-js
```

## Basic setup

First place the provider around your app:

```tsx
import { AuthProvider } from "@diamondlightsource/sci-react-ui";

<AuthProvider
  keycloakConfig={{
    url: "https://keycloak.example.com/",
    realm: "my-realm",
    clientId: "my-client"
  }}
>
  <App/>
</AuthProvider>
```

Now you can retrieve the auth data with `useAuth`. Your app should handle the four states listed at the end of this page. Here is an example of how to do that:

```tsx
import {Alert, Progress} from "@mui/material";
import { useAuth, User } from "@diamondlightsource/sci-react-ui";

const App = () => {
  const auth = useAuth()

  if( auth.errors ) {
    return <Alert severity="error">{auth.errors.join(", ")}</Alert>
  }

  if( !auth.initialised ) {
    return <Progress />
  }

  if( !auth.authenticated ) {
    return <User onLogin={auth.login}/>
  }

  // Return page content for authenticated users
  return (<>
    <User auth={auth}/>
    <Box>I'm authenticating</Box>
  </>)
}
```

It is recommended to next implement "Silent log in". See the section below for how to do this.

## Tokens

The token is automatically renewed before it expires.

There are three ways to retrieve the token. Each has different uses.

### useAuth.getToken

The easiest way is to use `useAuth.getToken()`. It will return the current valid token at time of request.

```tsx
import { useAuth, User } from "@diamondlightsource/sci-react-ui";

const App = () => {
  const auth = useAuth();

  const onEvent = () => {
    fetch("url", {auth_header: auth.getToken()});
  }
}
```

### onTokenChange

You can use `onTokenChange`, which is called every time the token changes. You can store the value somewhere you can retrieve it from.

```tsx
import { AuthProvider } from "@diamondlightsource/sci-react-ui";

<AuthProvider
  keycloakConfig={{...}}
  onTokenChange={(token) => {
    // Store the token. e.g. sessionStorage.setItem( "my-app-token", token )
  }}
>
  <App/>
</AuthProvider>
```

## Auto renew

Tokens will be auto renewed before they expire. By default this is done 10 seconds before they expire.

You can adjust this number by changing `minimumSecondsLeftInToken` via a parameter on the `AuthProvider`.

## Silent log in

Silent log in means logging in without visibly round-tripping to Keycloak. To make it work you have to do two things.

First, create an HTML file in your app which you can reference directly (for most apps, this means adding it to your public folder).

Copy and paste this into the file:

```html
<!doctype html>
<html lang><body><script>parent.postMessage(location.href, location.origin);</script></body></html>
```

Secondly, tell Keycloak to use the file, by adapting the `AuthProvider`:

```tsx
<AuthProvider
  ...
  keycloakInitOptions={{
    silentCheckSsoRedirectUri: `${location.origin}/silent-check-sso.html`
  }}
>
```

## Four states

Your app should handle each of the four states below.

### Uninitialized state

Not initialised, no checks have taken place yet.

```js
auth.initialised = false
```

### Unauthenticated state

Initialised, some checks made, but does not yet have authorisation. Will direct to the login page if needed.

```js
auth.initialised = true
auth.authenticated = false
```

### Normal state

Initialised, and authenticated. You are good to use `auth.getToken()`.

```js
auth.initialised = true
auth.authenticated = true
```

### Error state

Some error occurred attempting to initialise or authenticate to Keycloak (that is, `errors` is not empty).

```js
auth.errors != []
```
