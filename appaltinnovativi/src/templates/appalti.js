import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Container, Row, Col } from 'design-react-kit'
import LogoAppalti from '../assets/images/appalti.png'
import CardAppalti from '../components/card-appalti'

class AppaltiPage extends React.Component {
  render () {
    const data = this.props.data
    return (
      <Layout location={this.props.location}>
        <SEO title="Appalti" description="Il mercato e la ricerca offrono soluzioni innovative alle PA" />
        <section className="section section-muted project-intro">
          <div className="section-content">
            <Container tag="div" className="my-4">
              <Row>
                <Col className="col-12">
                  <div className="d-flex justify-content-between">
                    <div className="project-intro--logo mw-100">
                      <h1 className="max-w-40 text-600">
                        <img className="icon icon-xl" src={LogoAppalti} />
                    Appalti
                      </h1>
                      <p className="lead max-w-40 text-muted">
                        L’innovazione della PA passa dalle tue idee
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
              <span className="project-intro--print">Appalti</span>
            </Container>
          </div>
        </section>

        <section className="section pt-0">
          <Container>
            <Row>
              {data.allStrapiSfida.nodes.map(sfida => (
                sfida.appalto.map(appalto =>
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
                )))}
            </Row>
          </Container>
        </section>
      </Layout>
    )
  }
}

export const QueryAppalti = graphql`
  query QueryAppalti{
    allStrapiSfida(filter: {stato: {eq: "appalto"}}, sort: { fields: [appalto___dataPubblicazione], order: DESC }) {
      
      nodes {
        id
        bollinoOPEN
        descrizioneCard

        categoriaSfida {
          nome
        }

        proponente {
          ente{
            alias
          }
        }

        appaltante {
          ente{
            alias
          }
        }

        immagine {
          publicURL
        }
        
        
        appalto {
          titolo
          idAppalto
          descrizioneBreve
          dataPubblicazione
          fasciaImporto{
            fascia
          }
          procedura{
            nome
          }
        }
      }
    }
  }
 `

AppaltiPage.propTypes = {
  data: PropTypes.shape({
    allStrapiSfida: PropTypes.shape({
      nodes: PropTypes.array
    })
  })
}

export default AppaltiPage
