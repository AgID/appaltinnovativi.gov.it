const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

console.log(`Using environment config: '${activeEnv}'`)

require('dotenv').config({
  path: `.env.${activeEnv}`
})
//sostituire NomeSitoChild con il nome del sito child e DescrizioneSitoChild con un sottotitolo/descrizione breve
module.exports = {
  siteMetadata: {
    title: 'NomeSitoChild',
    description: 'DescrizioneSitoChild',
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
          //Sostituire "pagina-NomeSitoChild" con la stringa identificatrice del tipo "pagina" relativo al sito 
          //child creato precedentemente su Strapi. Ad esempio, per made in Italy è : "pagina-made-in-italy"
          'sfida', 'categoria', 'procedura', 'statoProcedura', 'ente', 'fascia-importo', 'pagina-nome-sito-child'
        ],
        queryLimit: 1000
      }
    }
  ]
}
