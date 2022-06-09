exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        sfidas: allStrapiSfida {
          nodes {
            id
            stato
            fabbisogno{
              titolo
            }
            consultazione{
              titolo
            }
            appalto{
              titolo
              idAppalto
            }
          }
        }

        pages: allStrapiPagina{
          nodes{
            id
            titolo
          }
        }

 
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const sfidas = result.data.sfidas.nodes
  sfidas.forEach(sfida => {
    var slug
    switch (sfida.stato) {
      case 'fabbisogno':
        slug = sfida.fabbisogno.titolo
        slug = slug.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-')
        createPage({
          path: `/fabbisogni/${slug}`,
          component: require.resolve('./src/templates/dettaglio-fabbisogno.js'),
          context: {
            strapiId: sfida.id
          }
        })
        break

      case 'consultazione':
        slug = sfida.consultazione.titolo
        slug = slug.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-')
        createPage({
          path: `/consultazioni/${slug}`,
          component: require.resolve('./src/templates/dettaglio-consultazione.js'),
          context: {
            strapiId: sfida.id
          }
        })
        break

      case 'appalto':
        sfida.appalto.forEach(appalto =>
          createPage({
            path: `/appalti/${appalto.titolo.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-')}`,
            component: require.resolve('./src/templates/dettaglio-appalto.js'),
            context: {
              strapiId: sfida.id,
              appaltoId: appalto.idAppalto
            }
          })
        )
        break
    }
  })

  createPage({
    path: '/fabbisogni/'/* ${i === 0 ? "" : i + 1} */,
    component: require.resolve('./src/templates/fabbisogni.js')
  })

  createPage({
    path: '/consultazioni/'/* ${i === 0 ? "" : i + 1} */,
    component: require.resolve('./src/templates/consultazioni.js')
  })

  createPage({
    path: '/appalti/'/* ${i === 0 ? "" : i + 1} */,
    component: require.resolve('./src/templates/appalti.js')
  })

  createPage({
    path: '/sfide/'/* ${i === 0 ? "" : i + 1} */,
    component: require.resolve('./src/templates/index-more.js')
  })

  const otherPages = result.data.pages.nodes
  otherPages.forEach(page =>
    createPage({
      path: `/${page.titolo.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-')}/`,
      component: require.resolve('./src/templates/page-generic.js'),
      context: {
        pageId: page.id
      }
    })
  )
}
