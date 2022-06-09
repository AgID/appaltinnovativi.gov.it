exports.createPages = async({ graphql, actions }) => {
    const { createPage } = actions

    //Modificare "allStrapiPaginaNomeSitoChild" inserendo il nome del sito child in camel case al posto di NomeSitoChild
    const result = await graphql(`
    query pages {

      allStrapiPaginaNomeSitoChild {  
        nodes {
          id
          titolo
        }
      }
    }`)
    
    if (result.errors) {
        throw result.errors
    }
    //Modificare "allStrapiPaginaNomeSitoChild" inserendo il nome del sito child in camel case al posto di NomeSitoChild  
    result.data.allStrapiPaginaNomeSitoChild.nodes.forEach(page => {
      createPage({
          path: `/${page.titolo.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-')}/`,
          component: require.resolve('./src/templates/page-generic.js'),
          context: {
              pageId: page.id
          }
      })
    })

    createPage({
        path: '/sfide/',
        component: require.resolve('./src/templates/index-more.js')
    })
}
