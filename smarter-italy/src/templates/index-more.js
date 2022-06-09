import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout-child'
import SEO from '../components/seo'
import '../components/style.css'
import CardAppalti from '../components/card-appalti'
import CardFabbisogni from '../components/card-fabbisogni'
import CardConsultazioni from '../components/card-consultazioni'

import {
  Container,
  Row
} from 'design-react-kit'

class IndexMorePage extends React.Component {
  render () {
    const data = this.props.data
    return (
      <Layout>
        <SEO title="Tutte le sfide" description="Il percorso dell’innovazione" />
        <div className="section bg-light " id="evidenza">
          <Container tag="div" >
            <Row>
              {data.allStrapiSfida.nodes.map(sfida => {
                switch (sfida.stato) {
                  case 'fabbisogno':
                    return (
                      <CardFabbisogni
                        key = {sfida.id}
                        category={sfida.categoriaSfida.nome}
                        image={sfida.immagine.publicURL}
                        title={sfida.fabbisogno.titolo}
                        publicationDate={sfida.fabbisogno.dataPubblicazione}
                        description={sfida.fabbisogno.descrizioneBreve}
                        proponent={sfida.proponente.map(prop => (prop.ente.alias + ' '))}
                        contractor={sfida.appaltante.map(app => (app.ente.alias + ' '))}
                        isOpen={sfida.bollinoOPEN}
                      ></CardFabbisogni>
                    )
                  case 'consultazione':
                    return (
                      <CardConsultazioni
                        key = {sfida.id}
                        category={sfida.categoriaSfida.nome}
                        image={sfida.immagine.publicURL}
                        title={sfida.consultazione.titolo}
                        publicationDate={sfida.consultazione.dataPubblicazione}
                        description={sfida.consultazione.descrizioneBreve}
                        proponent={sfida.proponente.map(prop => (prop.ente.alias + ' '))}
                        contractor={sfida.appaltante.map(app => (app.ente.alias + ' '))}
                        isOpen={sfida.bollinoOPEN}
                      ></CardConsultazioni>
                    )
                  case 'appalto':
                    return (
                      sfida.appalto.map(appalto => {
                        return (
                          <CardAppalti
                            key = {sfida.id + '-' + appalto.idAppalto}
                            category={sfida.categoriaSfida.nome}
                            image={sfida.immagine.publicURL}
                            title={appalto.titolo}
                            publicationDate={appalto.dataPubblicazione}
                            rangeAmount={appalto.fasciaImporto.fascia}
                            description={appalto.descrizioneBreve}
                            procedure={appalto.procedura.nome}
                            proponent={sfida.proponente.map(prop => (prop.ente.alias + ' '))}
                            contractor={sfida.appaltante.map(app => (app.ente.alias + ' '))}
                            isOpen={sfida.bollinoOPEN}
                          ></CardAppalti>
                        )
                      }))
                }
              })}
            </Row>
          </Container>
        </div>
      </Layout >
    )
  }
}

export const InEvidenzaQuery = graphql`
query allSmarterItalySfide {
  allStrapiSfida(filter: {programma: {nome: {eq: "Smarter Italy"}}}, sort: { fields: [appalto___dataPubblicazione, consultazione___dataPubblicazione, fabbisogno___dataPubblicazione], order: [DESC, DESC, DESC] }) {
    nodes {
      id
      stato
      bollinoOPEN

      programma {
        nome
      }

      categoriaSfida {
        nome
      }

      proponente {
        ente {
          alias
        }
      }
      appaltante {
        ente {
          alias
        }
      }

      immagine {
        publicURL
      }

      fabbisogno {
        titolo
        dataPubblicazione
        descrizioneBreve
      }

      consultazione {
        titolo
        dataPubblicazione
        descrizioneBreve
        fasciaImporto {
          fascia
        }
        procedura{
          nome
        }
      }

      appalto {
        titolo
        idAppalto
        descrizioneBreve
        dataPubblicazione
        fasciaImporto {
          fascia
        }
        procedura {
          nome
        }      
      }
    }
  }
}
`

export default IndexMorePage
