## appaltinnovativi (Gatsby)

### Development
#### Install dependencies:
```sh
yarn install 
```

#### Configuration file:
Create the configuration file `.env.development` in the website folder with the following variables:
```
ENABLE_GATSBY_REFRESH_ENDPOINT=1
STRAPI_ENDPOINT=https://yourStrapiInstance.com

KEYCLOAK_REALM=yourKeycloakRealm
KEYCLOAK_AUTH_URL=https://yourKeycloakInstance.com/auth
KEYCLOAK_AUTH_CLIENT_ID=yourAuthClientId
```

#### GraphQL resources:
In order to make Gatsby retrieve content from Strapi is necessary to configure the `gatsby-source-strapi` plugin in [gatsby-config.js](gatsby-config.js) in the dedicated section:
```js
{
    resolve: 'gatsby-source-strapi',
    options: {
    apiURL: process.env.STRAPI_ENDPOINT,
    contentTypes: [ 
        //List of Strapi Content Types
        'contentType1', 'contentType2', 'contentType3'
    ],
    queryLimit: 1000
    }
}
```

#### Launch the development server
```sh
gatsby develop
```

### Static Analysis via SonarQube
Configure [sonar-scanner.sh](sonar-scanner.sh) for your SonarQube instance and launch the script.