import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import React from 'react'
import LogoRepubblica from '../assets/images/logo-repubblica-italiana.svg'
import LogoEuropa from '../assets/images/logos/logo_eu.svg'
import LogoAgenziaCoesioneTerr from '../assets/images/logos/logo_agenzia_coesione.svg'
import LogoFunzionePub from '../assets/images/logos/logo_funzione_pubblica.svg'
import LogoPon from '../assets/images/logos/logo_pon_governance.svg'
import LogoAgid from '../assets/images/logos/AgID_bianco.png'

import {
  Container,
  Row,
  Col,
  Icon,
  LinkList
} from 'design-react-kit'

const Footer = () => {
  return (
    <footer className="it-footer">
      <div className="it-footer-main">
        <Container tag="div">
          <section>
            <Row
              className="clearfix"
              tag="div"
            >
              <Col
                className="col-sm-12"
                tag="div"
              >
                <div className="it-brand-wrapper">
                  <a
                    className=""
                    href="https://NomeSitoChild.131.1.216.224.sslip.io/" //sostituire con il DNS effettivo del sito child
                  >
                    <LogoRepubblica
                      className="icon"
                      alt="Emblema della Repubblica Italiana"
                    />
                    <div className="it-brand-text">
                      <h2 className="text_uppercase">
                        <span className="font-weight-bold">APPALTINNOVATIVI.GOV</span>
                      </h2>
                      <h3 className="d-none d-md-block">
                        Gli appalti di innovazione della Pubblica Amministrazione
                      </h3>
                    </div>
                  </a>
                </div>
              </Col>
            </Row>
            <Row tag="div"
              className="row mb-5"
            >
              <Col
                className="pt-3 mr-4 footer-title small col-8 col-sm-12 col-md-2 col-lg-2 col-xl-2"
              >
                <Container
                  tag="div"
                  className="media footer-title"
                >
                  <LogoEuropa className="img-fluid mr-3 mt-2" data-holder-rendered="true" />
                </Container>
              </Col>

              <Col
                className="pt-3 mr-4 footer-title small col-8 col-sm-12 col-md-2 col-lg-2 col-xl-2"
              >
                <Container
                  tag="div"
                  className="media footer-title"
                >
                  <a
                    href="http://www.agenziacoesione.gov.it/it/index.html"
                    title="Visita il sito dell' agenzia per la coesione territoriale"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Collegamento a sito esterno - Agenzia per la coesione territoriale - nuova finestra"
                  >
                    <LogoAgenziaCoesioneTerr className="img-fluid mr-3 mt-2" data-src="holder.js/64x64" alt="Agenzia per la coesione territoriale" />
                  </a>
                </Container>
              </Col>
              <Col
                className="pt-3 mr-4 footer-title small col-8 col-sm-12 col-md-2 col-lg-2 col-xl-2"
              >
                <Container
                  tag="div"
                  className="media footer-title"
                >
                  <a
                    href="http://www.funzionepubblica.gov.it/dipartimento-della-funzione-pubblica"
                    title="Visita il sito del dipartimento della funzione pubblica"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Collegamento a sito esterno - Dipartimento della funzione pubblica - nuova finestra"
                  >
                    <LogoFunzionePub className="img-fluid mr-3 mt-2" data-src="holder.js/64x64" alt="Dipartimento della funzione pubblica" />
                  </a>
                </Container>
              </Col>
              <Col
                className="pt-3 mr-4 footer-title small col-8 col-sm-12 col-md-2 col-lg-2 col-xl-2"
              >
                <Container
                  tag="div"
                  className="media footer-title"
                >
                  <a
                    href="http://www.pongovernance1420.gov.it/it/"
                    title="Visita il sito dell' agenzia per la coesione territorialeVisita il sito del PON Governance Capacità Istituzionale 2014-2020"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Collegamento a sito esterno - PON Governance Capacità Istituzionale 2014-2020 - nuova finestra"
                  >
                    <LogoPon className="img-fluid mr-3 mt-2" data-src="holder.js/64x64" alt="PON Governance Capacità Istituzionale 2014-2020" />
                  </a>
                </Container>
              </Col>
              <Col
                className="pt-3 mr-4 footer-title small col-8 col-sm-12 col-md-2 col-lg-2 col-xl-2"
              >
                <Container
                  tag="div"
                  className="media footer-title"
                >
                  <a
                    href="https://www.agid.gov.it/"
                    title="Visita il sito dell' Agenzia per l'Italia digitale"
                    aria-label="Collegamento a sito esterno - Agenzia per l'Italia digitale - nuova finestra"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img className="img-fluid mr-3 mt-2" data-src="holder.js/72x72" alt="Agenzia per l'Italia digitale" src={LogoAgid} />
                  </a>
                </Container>
              </Col>
            </Row>
          </section>

          <section className="mt-4">
            <Row tag="div">
              <Col
                tag="div"
                className="col-12"
              >
                <h4 className="text-uppercase">Contatti</h4>
                <Row tag="div">
                  <Col
                    tag="div"
                    className="col-12"
                  >
                    <h5 className="h6 mb-3">Agenzia per l&apos;Italia Digitale - Servizio Strategie di procurement e innovazione del mercato</h5>
                    <Row tag="div"
                      className="bt-alpha-2"
                    >
                      <div
                        className="col-xl-4"
                      >

                        <LinkList
                          className="pt-2 clearfix "
                        >
                          <li
                            className="py-2"

                          >
                            <Icon
                              className="mr-2 align-top icon icon-sm icon-white"
                              icon="it-pa"
                              padding={false}
                              size=""
                            />
                            <p className="ml-1 d-inline-block">
                              Indrizzo
                              <br />
                              <a className="list-item" href="https://www.google.it/maps/place/Via+Liszt,+21,+00144+Roma+RM/@41.8336525,12.4653778,17z/data=!3m1!4b1!4m5!3m4!1s0x13258ae3d27bf449:0x5aa2ce4a30bafdda!8m2!3d41.8336485!4d12.4675665">
                                Via Liszt, 21<br />00144 Roma
                              </a>
                            </p>
                          </li>
                        </LinkList>
                      </div>
                      <div
                        className="col-xl-4"
                      >
                        <LinkList
                          className="pt-2 link-list clearfix "
                        >
                          <li
                            className="py-2"
                          >
                            <Icon
                              tag="svg"
                              className="mr-2 align-top icon icon-sm icon-white"
                              icon="it-mail"
                              padding={false}
                              size=""
                            />
                            <p className="ml-1 d-inline-block">
                              Posta Elettronica
                              <br />
                              <a className="list-item"
                                href="mailto:appaltinnovativi@agid.gov.it">
                                appaltinnovativi@agid.gov.it
                              </a>
                            </p>
                          </li>
                        </LinkList>
                      </div>
                      <div
                        className="col-xl-4"
                      >
                        <LinkList
                          className="pt-2 link-list clearfix "
                        >
                          <li
                            className="py-2"
                          >
                            <Icon
                              tag="svg"
                              className="mr-2 align-top icon icon-sm icon-white"
                              icon="it-telephone"
                              padding={false}
                              size=""
                            />
                            <p className="ml-1 d-inline-block">
                              Telefono
                              <br />
                              <a className="list-item"
                                href="tel:+3906852641">
                                06852641
                              </a>
                            </p>
                          </li>
                        </LinkList>
                      </div>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </section>

          <section className="mt-4">
            <Row tag="div">
              <Col tag="div"
              >
                <ul className="list-inline text-center social">

                  <li className="list-inline-item">
                    <a className="mx-2 text-white" href="https://it.linkedin.com/company/agenzia-italia-digitale"
                      aria-label="LinkedIn"
                      target="_blank"
                      rel="noreferrer"
                      title="LinkedIn"
                    >
                      <Icon
                        tag="svg"
                        className=" align-top  icon-white"
                        icon="it-linkedin"
                        padding={false}
                        size=""
                      />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </li>

                  <li className="list-inline-item">
                    <a className="mx-2 text-white" href="https://twitter.com/agidgov"
                      aria-label="Twitter"
                      title="Twitter"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon
                        tag="svg"
                        className=" align-top  icon-white"
                        icon="it-twitter"
                        padding={false}
                        size=""
                      />
                      <span className="sr-only">Twitter</span>
                    </a>
                  </li>

                  <li className="list-inline-item">
                    <a className="mx-2 text-white" href="https://medium.com/@AgidGov"
                      aria-label="Medium"
                      title="Medium"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon
                        tag="svg"
                        className=" align-top  icon-white"
                        icon="it-medium"
                        padding={false}
                        size=""
                      />
                      <span className="sr-only">Medium</span>
                    </a>
                  </li>

                </ul>
              </Col>
            </Row>
          </section>

        </Container >
      </div >
      <div className="it-footer-small-prints clearfix pt-2">
        <Container tag="section"
          className="border-cyan border-top"
        >
          <ul className="it-footer-small-prints-list list-inline mb-0 d-flex flex-column flex-md-row">

            <li className="list-inline-item">
              <a className="list-item font-weight-semibold" href="https://appaltinnovativi.131.1.216.224.sslip.io/privacy-policy"
                title="Privacy policy">Privacy policy</a>
            </li>

            <li className="list-inline-item">
              <Link to="https://appaltinnovativi.131.1.216.224.sslip.io/note-legali" className="list-item font-weight-semibold">Note Legali</Link>
            </li>
            
          </ul>
        </Container>
      </div>
    </footer >
  )
}

Footer.propTypes = {
  siteTitle: PropTypes.string
}

Footer.defaultProps = {
  siteTitle: ''
}
export default Footer
