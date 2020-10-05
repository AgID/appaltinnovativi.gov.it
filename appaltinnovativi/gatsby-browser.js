import React from 'react'
import { node } from 'prop-types'
import Keycloak from 'keycloak-js'
import { KeycloakProvider } from '@react-keycloak/web'
import { Spinner } from 'design-react-kit'

const keycloak = new Keycloak({
  realm: process.env.KEYCLOAK_REALM,
  url: process.env.KEYCLOAK_AUTH_URL,
  clientId: process.env.KEYCLOAK_AUTH_CLIENT_ID
})

const Loading = () => {
  return (
    <div className="row">
      <div className="spinner spinner-div">
        <Spinner
          active
          double
          small={false}
          tag="span"
        />
      </div>
    </div>
  )
}

const wrapRootElement = ({ element }) => {
  return (
    <KeycloakProvider
      keycloak={keycloak}
      initConfig={{
        promiseType: 'native',
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.xhtml'
      }}
      LoadingComponent={<Loading />}
    >
      {element}
    </KeycloakProvider>
  )
}

wrapRootElement.propTypes = {
  element: node
}

const _wrapRootElement = wrapRootElement
export { _wrapRootElement as wrapRootElement }
