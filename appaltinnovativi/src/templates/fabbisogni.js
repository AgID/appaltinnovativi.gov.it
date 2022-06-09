import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import CardFabbisogni from '../components/card-fabbisogni'
import { Container, Row, Col } from 'design-react-kit'
import LogoFabbisogni from '../assets/images/fabbisogni.png'

export const Query = graphql`
query Query{
        allStrapiSfida(filter: {stato: {eq: "fabbisogno"}}, sort: { fields: [fabbisogno___dataPubblicazione], order: DESC }) {
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

          fabbisogno {
            titolo
            dataPubblicazione
          }

          immagine {
            publicURL
          }

        }
      }

  }
 `

class FabbisogniPage extends React.Component {
  render () {
    const data = this.props.data
    return (
      < Layout location={this.props.location}>
        <SEO title="Fabbisogni" description="La PA esprime al mercato e alla ricerca il proprio fabbisogno d’innovazione" />
          <div className="it-hero-wrapper it-overlay it-dark it-bottom-overlapping-content">
            <div className="img-responsive-wrapper">
              <div className="img-responsive">
                <div className="img-wrapper primary-bg">
                  <img
                    className="w-100"
                    src="https://appaltinnovativi.131.1.216.224.sslip.io/static/3ffc205245a099738f40b6577a98b3e3/27d6d52f2133523218d04bde44ee6e26.png"
                    alt="background"
                  />
                </div>
              </div>
            </div>
                <Container tag="div" className="my-4">
                  <Row>
                    <Col className="col-12">
                      <div className="d-flex justify-content-between">
                        <div className="project-intro--logo mw-100">
                          <h1 className="max-w-40 text-600">
                            <img className="icon icon-xl" src={LogoFabbisogni} />
                        Fabbisogni
                          </h1>
                          <p className="lead max-w-40 text-muted">
                            L’innovazione della PA passa dalle tue idee
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <span className="project-intro--print">Fabbisogni</span>
                </Container>
      		</div>

        <section className="section pt-0">
          <Container>
            <Row>

              {data.allStrapiSfida.nodes.map(sfida => (
                <CardFabbisogni
                  key={sfida.id}
                  category={sfida.categoriaSfida.nome}
                  image={sfida.immagine.publicURL}
                  title={sfida.fabbisogno.titolo}
                  publicationDate={sfida.fabbisogno.dataPubblicazione}
                  description={sfida.descrizioneCard}
                  proponent={sfida.proponente.map(prop => (prop.ente.alias + ' '))}
                  contractor={sfida.appaltante.map(app => (app.ente.alias + ' '))}
                  isOpen={sfida.bollinoOPEN}
                ></CardFabbisogni>
              ))}
            </Row>
          </Container>
        </section>

      </Layout >
    )
  }
}

FabbisogniPage.propTypes = {
  data: PropTypes.shape({
    allStrapiSfida: PropTypes.shape({
      nodes: PropTypes.array
    })
  })
}

export default FabbisogniPage
