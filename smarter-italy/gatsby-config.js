const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

console.log(`Using environment config: '${activeEnv}'`)

require('dotenv').config({
  path: `.env.${activeEnv}`
})

module.exports = {
  siteMetadata: {
    title: 'Smarter Italy',
    description: 'Programma di accelerazione e crescita del Paese attraverso l’utilizzo degli appalti innovativi',
    author: 'Prisma SRL'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.svg$/
        }
      }
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
          'sfida', 'categoria', 'procedura', 'statoProcedura', 'ente', 'fascia-importo', 'pagina-smarter-italy'
        ],
        queryLimit: 1000
      }
    }
  ]
}
