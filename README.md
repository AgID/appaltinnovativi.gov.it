# Appaltinnovativi

## Architecture Overview
[Strapi](https://strapi.io/documentation/) is the headless CMS of the solution, that allows administrators to manage the website content.  
The chosen Databases for this application are MongoDB and Minio.  
It provides a GraphQL interface for data retrieval.

---

Every website is built upon [Gatsby](https://www.gatsbyjs.com/docs/), a static web generator.  
It has been configured to interact with Strapi's GraphQL layer.  
The main website is [appaltinnovativi](appaltinnovativi/README.md) while others are so called 'children':
- [made-in-italy](made-in-italy/README.md);
- [smarter-italy](smarter-italy/README.md);

---

The IAM solution is [Keycloak](https://www.keycloak.org/documentation.html) which stores data on a PostgreSQL Database.
It has been configured with the following identity providers:
- Agid Login through OpenID Connect;
- ...

---

[Limesurvey](https://www.limesurvey.org/en/) is a statistical survey web app to make the websites' users interact with AgID about challenges.
It stores data on a MySQL Database.

---

### Keycloak configuration
Realm: appaltinnovativi

Client configuration:
- Client ID: gatsby-appaltinnovativi
- Client Protocol: openid-connect
- Root URL: https://appaltinnovativi.131.1.216.224.sslip.io
- Valid Redirect URIs: /*
- Admin URL: https://appaltinnovativi.131.1.216.224.sslip.io
- Web Origins: https://appaltinnovativi.131.1.216.224.sslip.io/*, https://appaltinnovativi.131.1.216.224.sslip.io


Agid Identity provider configuration:
- Redirect URI: https://keycloak.131.1.216.224.nip.io/auth/realms/appaltinnovativi/broker/Agid/endpoint
- Alias: Agid
- Authorization URL: https://login.agid.gov.it/auth
- Token URL: https://login.agid.gov.it/token
- Logout URL: https://login.agid.gov.it/session/end
- User Info URL: https://login.agid.gov.it/userinfo
- Client Authentication: Client Secret sent as post
- Client ID: ...
- Client Secret: ...