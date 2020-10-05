const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

require('dotenv').config({
  path: `.env.${activeEnv}`
})

console.log(`Using environment config: '${activeEnv}'`)

module.exports = {
  siteMetadata: {
    title: 'Appaltinnovativi',
    description: 'Gli appalti di innovazione della Pubblica Amministrazione',
    author: 'Prisma SRL'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-env-variables',
      options: {
        allowList: [
          'NODE_ENV',
          'ENABLE_GATSBY_REFRESH_ENDPOINT',
          'STRAPI_ENDPOINT',
          'KEYCLOAK_REALM',
          'KEYCLOAK_AUTH_URL',
          'KEYCLOAK_AUTH_CLIENT_ID'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.svg$/
        }
      }
    },
    {
      resolve: 'gatsby-background-image'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: (__dirname, 'src')
      }
    },
    {
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL: process.env.STRAPI_ENDPOINT,
        contentTypes: [ // List of Strapi Content Types
          'sfida', 'categoria', 'procedura', 'statoProcedura', 'ente', 'fascia-importo', 'pagina'
        ],
        queryLimit: 1000
      }
    }
  ]
}
