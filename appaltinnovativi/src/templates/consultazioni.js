import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Container, Row, Col } from 'design-react-kit'
import LogoConsultazioni from '../assets/images/consultazioni.png'
import CardConsultazioni from '../components/card-consultazioni'

class ConsultazioniPage extends React.Component {
  render () {
    const data = this.props.data
    return (
      < Layout location={this.props.location}>
        <SEO title="Consultazioni" description="La PA dialoga con il mercato e la ricerca, per qualificare il fabbisogno d'innovazione" />
        <section className="section section-muted project-intro">
          <div className="section-content">
            <Container tag="div" className="my-4">
              <Row>
                <Col className="col-12">
                  <div className="d-flex justify-content-between">
                    <div className="project-intro--logo mw-100">
                      <h1 className="max-w-40 text-600">
                        <img className="icon icon-xl" src={LogoConsultazioni} />
                    Consultazioni
                      </h1>
                      <p className="lead max-w-40 text-muted">
                        L’innovazione della PA passa dalle tue idee
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
              <span className="project-intro--print">Consultazioni</span>
            </Container>
          </div>
        </section>

        <section className="section pt-0">
          <Container>
            <Row>
              {data.allStrapiSfida.nodes.map(sfida => (
                <CardConsultazioni
                  key={sfida.id}
                  category={sfida.categoriaSfida.nome}
                  image={sfida.immagine.publicURL}
                  title={sfida.consultazione.titolo}
                  publicationDate={sfida.consultazione.dataPubblicazione}
                  description={sfida.descrizioneCard}
                  proponent={sfida.proponente.map(prop => (prop.ente.alias + ' '))}
                  contractor={sfida.appaltante.map(app => (app.ente.alias + ' '))}
                  isOpen={sfida.bollinoOPEN}
                ></CardConsultazioni>
              ))}
            </Row>
          </Container>
          <div className="col-12 mt-3 text-center">
          </div>
        </section>
      </Layout >
    )
  }
}

export const QueryConsultazioni = graphql`
  query QueryConsultazioni{
    allStrapiSfida(filter: {stato: {eq: "consultazione"}}, sort: { fields: [consultazione___dataPubblicazione], order: DESC }) {
 
      nodes {
        id
        bollinoOPEN
        descrizioneCard
        
        categoriaSfida {
          nome
        }

        proponente {
          ente {
            alias
          }
        }
        appaltante {
          ente{
            alias
          }
        }

        consultazione {
          titolo
          dataPubblicazione
          fasciaImporto {
            fascia
          }
        }

        immagine {
          publicURL
        }
        
      }
    }
  }
 `

ConsultazioniPage.propTypes = {
  data: PropTypes.shape({
    allStrapiSfida: PropTypes.shape({
      nodes: PropTypes.array
    })
  })
}

export default ConsultazioniPage
