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
