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

## Management
[Issue Tracker](https://redmine.prismacompany.it/projects/prisma-appalti-innovativi)


## Official repositories
___
[Agid Github](https://github.com/AgID/appaltinnovativi.gov.it)

[Agid Dockerhub](https://hub.docker.com/r/agidopeninnovation/aoi-apos)
___

## Development and Infrastructure
[Rancher Setup](https://rancher.com/docs/rancher/v2.x/en/installation/k8s-install/)

[Deployment Procedure](docs/Deployment-a-mano.docx)

Versions:
* Nodejs: 14.1.0
* NPM: 6.14.4
* Yarn: 1.22.4
* MongoDB: 4.2
* Minio: RELEASE.2020-05-08T02-40-49Z
* MySQL: 8
* Java (if needed): 11


### Databases
* MongoDB:
  * Certificate: TBD
  * Database: appaltinnovativi
  * Username: appaltiadmin
  * Password: appaltiadmin123!
  * Auth db: admin


* MinIO:
  * Certificate: TBD
  * Bucket: appaltinnovativi


### CMS Service
Init project (Select manual settings and insert MongoDB parameters):
```sh
yarn create strapi-app cms-service
```

Run locally:
```sh
cd cms-service
yarn strapi develop
```

### SWG-service
Init project:
```sh
npm install --global gatsby-cli && \
gatsby new swg-service && \
cd swg-service && \
yarn add gatsby-source-strapi && \
yarn add design-react-kit --save && \
yarn add bootstrap-italia typeface-lora typeface-roboto-mono typeface-titillium-web --save && \
yarn add react react-dom && \
yarn install && \
gatsby develop 
```

For swg-service and child-sites it's mandatory to add the configuration files `.env.development` and `.env.production`.
Those files need to be placed at root level of the gatsby project with the following content:
```
NODE_ENV=production|development #based on the filename
ENABLE_GATSBY_REFRESH_ENDPOINT=1
STRAPI_ENDPOINT=strapi.131.1.216.224.nip.io/
```

___

### Knowledge Graph development
The [European Open Data Portal](https://data.europa.eu/euodp/en/data/) is the reference example for a connected-knowledge database (see the Linked Data tab).

Data is retrievable via [APIs](https://app.swaggerhub.com/apis/EU-Open-Data-Portal/eu-open_data_portal/0.8.0) and SPARQL queries.

SPARQL is a semantic query language for databases, able to retrieve and manipulate data stored in RDF format.

The European Open Data Portal makes use of the [OSS Virtuoso](http://vos.openlinksw.com/owiki/wiki/VOS) database that has an embedded SPARQL endpoint.

Data stored in the database follows a the DCAT-AP specification, which has  gone through many iterations and releases which can be found [here](https://joinup.ec.europa.eu/solution/dcat-application-profile-data-portals-europe?f%5B0%5D=solution_content_bundle%3Aasset_release).

An italian "extension" of the DCAT-AP spec exists as [DCAT-AP_IT](https://docs.italia.it/italia/daf/linee-guida-cataloghi-dati-dcat-ap-it/it/stabile/dcat-ap_it.html) as well as [ontology vocabularies](https://github.com/italia/daf-ontologie-vocabolari-controllati/wiki) for semantic queries.
