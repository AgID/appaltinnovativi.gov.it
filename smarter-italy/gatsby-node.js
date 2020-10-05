exports.createPages = async({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
  query pages {

    allStrapiPaginaSmarterItaly {
      nodes {
        id
        titolo
      }
    }
  }`)
  
  if (result.errors) {
      throw result.errors
  }
      
  result.data.allStrapiPaginaSmarterItaly.nodes.forEach(page => {
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
