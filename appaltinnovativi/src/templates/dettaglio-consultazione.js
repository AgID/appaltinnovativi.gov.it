import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { withKeycloak } from '@react-keycloak/web'

import Layout from '../components/layout'
import { Container, Row, Icon, NavbarToggler, LinkListItem, LinkList } from 'design-react-kit'
import LogoConsultazioni from '../assets/images/consultazioni.png'
import CardConsultazioni from '../components/card-consultazioni'
import Collapse from '../components/Collapse'
import ReactMarkdown from 'react-markdown'
import ButtonLike from '../components/button-like'

export const query = graphql` 
  query DettaglioConsultazioneConsultazioneQuery($strapiId: String) {
      strapiSfida:
      strapiSfida(id: {eq: $strapiId}) {
        id
        bollinoOPEN
        appaltante {
          ente{
            alias
          }
        }
        categoriaSfida {
          nome
        }
        fabbisogno {
          descrizione
        }
        consultazione{
          descrizione
          descrizioneBreve
          titolo
          dataPubblicazione
          fasciaImporto{
            fascia
          }
          link{
            url
            nomeUrl
          }
          procedura{
            nome
          }
        }
        immagine {
          publicURL
        }
        proponente {
          ente{
            alias
          }
        }
      }

      otherConsultazioni:
      allStrapiSfida(filter: {stato: {eq: "consultazione"},id: {ne: $strapiId}},limit: 6) {
      
        nodes {
          id
          bollinoOPEN
          appaltante {
            ente{
              alias
            }
          }
          immagine {
            publicURL
          }
          
          categoriaSfida {
            nome
          }
          consultazione{
            descrizioneBreve
            titolo
            dataPubblicazione
            fasciaImporto{
              fascia
            }
            procedura{
              nome
            }
          }
          proponente {
            ente{
              alias
            }
          }
        }
      }
    }
`

const DettaglioConsultazione = ({ keycloak, data }) => {
  const sfida = data.strapiSfida
  const others = data.otherConsultazioni
  const [isOpen, toggleDropdown] = useState(false)
  return (
    <Layout keycloak={keycloak}>
      <Container className="my-3">
        <nav className="breadcrumb-container ml-4" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
              <span className="separator">&gt;</span>
            </li>

            <li className="breadcrumb-item">
              <a href="/consultazioni">Consultazioni</a>
              <span className="separator">&gt;</span>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {sfida.consultazione.titolo.toLowerCase()}
            </li>
          </ol>
        </nav>
      </Container>

      <div className="it-hero-wrapper it-overlay it-dark it-bottom-overlapping-content">
        <div className="img-responsive-wrapper">
          <div className="img-responsive">
            <div className="img-wrapper primary-bg">
              <img
                className="w-100"
                src={sfida.immagine.publicURL}
                alt="bla bla bla"
              />
            </div>
          </div>
        </div>
        <Container>
          <Row>
            <div className="col-12">
              <div className="it-hero-text-wrapper it-overlay it-dark py-5">
                <div className="top-icon mb-3">
                  <h6 className="text-white item- ">
                    <img className="icon icon-xl mr-1" src={LogoConsultazioni} />
                    {sfida.categoriaSfida.nome}
                  </h6>
                </div>
                <h1 className="text-white">{sfida.consultazione.titolo}</h1>
                <div className="excerpt">
                  <p>{sfida.consultazione.descrizioneBreve}</p>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </div>

      <article className="container my-5">
        <Row>
          <div className="col-12 col-lg-8 ">
            <div className="card-wrapper card-space pb-0">
              <div className="card card-bg card-big">
                <div className="px-3 px-md-5 card-body pb-0">
                  <div className="card-text">
                    <div className="my-3">

                      <h3>La Sfida</h3>

                      <ReactMarkdown source={sfida.fabbisogno.descrizione} />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <nav className="navbar navbar-collapsable it-navscroll-wrapper navbar-expand-lg it-bottom-navscroll it-left-side affix-top col-consultazioni">
              <NavbarToggler
                onClick={() => toggleDropdown(!isOpen)}
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                Info
              </NavbarToggler>
              <Collapse
                className="it-left-side it-navscroll-wrapper navbar-expand-lg "
                isOpen={isOpen}
                navbar
                onOverlayClick={() => toggleDropdown(!isOpen)}
              >
                <div className="collapse-close-div-custom">
                  <NavbarToggler
                    onClick={() => toggleDropdown(!isOpen)}
                    aria-expanded="true"
                    aria-label="Toggle navigation"
                  >
                    <span>Chiudi</span>
                    <Icon icon="it-close" className="icon icon-sm" />
                  </NavbarToggler>
                </div>
                <div className="menu-wrapper">
                  <div className="link-list-wrapper">
                    <p className="px-4">
                      {sfida.bollinoOPEN === true
                        ? <span className="badge badge-success badge-pill mb-4 p-2">
                          OPEN
                        </span> : ''
                      }

                      <br />
                      <strong>Pubblicazione:</strong>
                      {sfida.consultazione.dataPubblicazione}
                      <br />
                      <strong>Fascia di importo:</strong>
                      {sfida.consultazione.fasciaImporto.fascia}
                      <br />
                      {sfida.consultazione.procedura != null && (
                        <>
                          <strong>Tipologia procedura:</strong>
                          {sfida.consultazione.procedura.nome}
                          <br />
                        </>
                      )}
                      <strong>Proponente:</strong>
                      {sfida.proponente.map(prop => (prop.ente.alias + ' '))}
                      <br />
                      <strong>Appaltante: </strong>
                      {sfida.appaltante.map(app => (app.ente.alias + ' '))}
                      <br />
                      <br />
                      <ButtonLike keycloak={keycloak} sfidaId={sfida.id} />
                      <br />
                    </p>
                  </div>
                </div>
              </Collapse>
            </nav>
          </div>
        </Row>
      </article>
      <div className="section section-muted py-5">
        <div className="container">
          <div className="col-12">
            <h2>La consultazione di mercato</h2>
            <ReactMarkdown source={sfida.consultazione.descrizione} />
            <div className="alert alert-warning mt-5" role="alert">
              I contenuti del presente sito hanno <b>carattere informativo</b>. La pubblicazione delle informazioni ufficiali
        è nella responsabilità della <b>stazione appaltante.</b>
            </div>
          </div>
        </div>
      </div>
      {sfida.consultazione.link.length > 0 && (
        <div className="bg-radial-blue">
          <div className="container pb-5 pt-5">
            <h2 className="text-white pb-3">Approfondimenti</h2>
            <LinkList>
              {sfida.consultazione.link.map(link =>
                <LinkListItem key={link.url} className="text-white" target="_blank" rel="noopener noreferrer" tag="a" href={link.url}>
                  {link.nomeUrl} <Icon icon="it-external-link" color="light" className="pl-2" />
                </LinkListItem>
              )}
            </LinkList>
          </div>
        </div>
      )}
      <div className="padding-after-approfondimenti"></div>
      <section className="section pt-0">
        <Container>
          <div className="row">
            <div className="col-12">
              <h2 className="max-w-40 mb-4 text-primary">Altre consultazioni </h2>
            </div>
          </div>
          <Row>
            {others.nodes.map(sfida => (
              <CardConsultazioni
                key={sfida.id}
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
            ))}
          </Row>
        </Container>
        <div className="col-12 mt-3 text-center">
          <a className="btn btn-primary" href="/consultazioni">Vedi tutto</a>
        </div>
      </section>
    </Layout >
  )
}

export default withKeycloak(DettaglioConsultazione)

DettaglioConsultazione.propTypes = {
  data: PropTypes.any
}
