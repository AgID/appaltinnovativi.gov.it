import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import {
  Button,
  Container,
  Icon,
  Row,
  Col
} from 'design-react-kit'

import Layout from '../components/layout'
import SEO from '../components/seo'

import CardAppalti from '../components/card-appalti'
import CardFabbisogni from '../components/card-fabbisogni'
import CardConsultazioni from '../components/card-consultazioni'

import BackgroundDiv from '../components/index-background'
import LogoFabbisogni from '../assets/images/fabbisogni.png'
import LogoConsultazioni from '../assets/images/consultazioni.png'
import LogoAppalti from '../assets/images/appalti.png'

import '../components/style.css'

const IndexPage = ({ location, data }) => {
  return (
    <Layout location={location}>
      <SEO title="Homepage" description="Il percorso dell’innovazione" />
      <main>
        <div className="it-hero-wrapper it-dark it-overlay it-hero-appalti py-0 py-md-5">
          <div className="img-responsive-wrapper">
            <div className="img-responsive">
              <BackgroundDiv className="img-wrapper hero-head" src={data.background.childImageSharp.fluid} />
            </div>
          </div>
          <Container className="container it-hero-content">
            <Row>
              <Col className="col-12 col-md-6 d-flex align-items-center">
                <div className="pb-4">
                  <h1 className="text-white pt-4">Le sfide della PA,<br />
                  le tue soluzioni</h1>
                </div>
              </Col>
              <Col className="col-12 col-md-6">
                <div className="callout  note bg-white my-5">
                  <h3 className="text-primary">La PA che innova</h3>
                  <h5 className="text-primary">Sei un’azienda, una start up o un centro di ricerca?</h5>
                  <p className="text-sans-serif text-primary">Vuoi conoscere i fabbisogni, le consultazioni di mercato, gli
                  appalti innovativi delle Pubbliche Amministrazioni e proporre le tue soluzioni? </p>
                  <a href="#evidenza" className="btn btn-primary btn-icon text-white mt-4">
                    <Icon
                      className="icon-white"
                      icon="it-arrow-down"
                    />
                    <span className="pl-2">Scopri di più</span>
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <section className="section bg-radial-blue" id="percorso">
          <Container>
            <Row>
              <Col className="col-12">
                <h6 className="text-uppercase text-white-80 max-w-40">APPALTINNOVATIVI.GOV</h6>
                <h2 className="text-white max-w-40">Il percorso dell’innovazione</h2>
              </Col>

              <Col className="col-12 col-md-4 text-center text-white">
                <div className="m-5">
                  <div className="my-4 avatar-dark size-xxl">
                    <img src={LogoFabbisogni} alt="Immagine per Fabbisogno" />
                  </div>
                  <h3>Fabbisogno</h3>
                  <p className="m-2 x-small">La PA esprime al mercato e alla ricerca il proprio fabbisogno d’innovazione</p>
                  <Button className="btn-outline-primary bg-white btn-sm mt-2" href="/fabbisogni">Tutti i Fabbisogni</Button>
                </div>
              </Col>

              <Col className="col-12 col-md-4 text-center text-white">
                <div className="m-5">
                  <div className="my-4  avatar-dark size-xxl">
                    <img src={LogoConsultazioni} alt="Immagine per Consultazioni" />
                  </div>
                  <h3>Consultazione</h3>
                  <p className="m-2 x-small">La PA dialoga con il mercato e la ricerca, per qualificare il fabbisogno
                  d&apos;innovazione</p>
                  <Button className="btn-outline-primary bg-white btn-sm mt-2" href="/consultazioni">Tutte le Consultazioni</Button>
                </div>
              </Col>

              <Col className="col-12 col-md-4 text-center text-white">
                <div className="m-5">
                  <div className="my-4 avatar-dark size-xxl">
                    <img src={LogoAppalti} alt="Immagine per Appalti" />
                  </div>
                  <h3>Appalto</h3>
                  <p className="m-2 x-small">Il mercato e la ricerca offrono soluzioni innovative alle PA</p>
                  <Button className="btn-outline-primary bg-white btn-sm mt-2" href="/appalti">Tutti gli appalti</Button>
                </div>
              </Col>

            </Row>
          </Container>
        </section>

        <div className="section bg-light " id="evidenza">
          <Container tag="div" >
            <Row>
              <Col className="col-12">
                <h2 className="max-w-40 mb-4 text-primary">In evidenza</h2>
              </Col>
            </Row>

            <Row>
              {data.sfidas.nodes.length > 0 && (
                data.sfidas.nodes.map((sfida, index) => {
                  switch (sfida.stato) {
                    case 'fabbisogno':
                      return (
                        <CardFabbisogni
                          key={index}
                          category={sfida.categoriaSfida.nome}
                          image={sfida.immagine.publicURL}
                          title={sfida.fabbisogno.titolo}
                          publicationDate={sfida.fabbisogno.dataPubblicazione}
                          description={sfida.fabbisogno.descrizioneBreve}
                          proponent={sfida.proponente.map(prop => (prop.ente.alias + ' '))}
                          contractor={sfida.appaltante.map(app => (app.ente.alias + ' '))}
                        ></CardFabbisogni>
                      )
                    case 'consultazione':
                      return (
                        <CardConsultazioni
                          key={index}
                          category={sfida.categoriaSfida.nome}
                          image={sfida.immagine.publicURL}
                          title={sfida.consultazione.titolo}
                          publicationDate={sfida.consultazione.dataPubblicazione}
                          description={sfida.consultazione.descrizioneBreve}
                          procedure={sfida.consultazione.procedura != null ? sfida.consultazione.procedura.nome : null}
                          proponent={sfida.proponente.map(prop => (prop.ente.alias + ' '))}
                          contractor={sfida.appaltante.map(app => (app.ente.alias + ' '))}
                          isOpen={sfida.bollinoOPEN}
                        ></CardConsultazioni>
                      )
                    case 'appalto':
                      return (
                        sfida.appalto.map((appalto, index) => {
                          return (
                            <CardAppalti
                              key={index}
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
                        }
                        )
                      )
                  }
                }))}
              {data.sfidas.nodes.length === 0 && (
                data.others.nodes.map((sfida, index) => {
                  switch (sfida.stato) {
                    case 'fabbisogno':
                      return (
                        <CardFabbisogni
                          key={index}
                          category={sfida.categoriaSfida.nome}
                          image={sfida.immagine.publicURL}
                          title={sfida.fabbisogno.titolo}
                          publicationDate={sfida.fabbisogno.dataPubblicazione}
                          description={sfida.fabbisogno.descrizioneBreve}
                          proponent={sfida.proponente.map(prop => (prop.ente.alias + ' '))}
                          contractor={sfida.appaltante.map(app => (app.ente.alias + ' '))}
                        ></CardFabbisogni>
                      )
                    case 'consultazione':
                      return (
                        <CardConsultazioni
                          key={index}
                          category={sfida.categoriaSfida.nome}
                          image={sfida.immagine.publicURL}
                          title={sfida.consultazione.titolo}
                          publicationDate={sfida.consultazione.dataPubblicazione}
                          description={sfida.consultazione.descrizioneBreve}
                          procedure={sfida.consultazione.procedura != null ? sfida.consultazione.procedura.nome : null}
                          proponent={sfida.proponente.map(prop => (prop.ente.alias + ' '))}
                          contractor={sfida.appaltante.map(app => (app.ente.alias + ' '))}
                          isOpen={sfida.bollinoOPEN}
                        ></CardConsultazioni>
                      )
                    case 'appalto':
                      return (
                        sfida.appalto.map((appalto, index) => {
                          return (
                            <CardAppalti
                              key={index}
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
                        }
                        )
                      )
                  }
                }))}

            </Row>
            <div className="col-12 mt-3 text-center">
              <a className="btn btn-primary" href="/sfide">Vedi tutto</a>
            </div>

          </Container>
        </div>

      </main>
    </Layout>
  )
}

export const InEvidenzaQuery = graphql`
 query InEvidenza {
  sfidas :allStrapiSfida(filter: {inEvidenza: {eq: true}}) {
    nodes {
      
      stato
      bollinoOPEN

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
        descrizioneBreve
        fasciaImporto {
          fascia
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
  others :allStrapiSfida(limit: 6) {
    nodes {
      stato
      bollinoOPEN

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
        descrizioneBreve
        fasciaImporto {
          fascia
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
  background: file(relativePath: { eq: "assets/images/backgrounds/christopher-burns-Kj2SaNHG-hg-unsplash.jpg" }) {
    childImageSharp {
      fluid(quality: 90, maxWidth: 1920) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
}
`

IndexPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
}

export default IndexPage
