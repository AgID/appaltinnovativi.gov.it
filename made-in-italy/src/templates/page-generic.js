import React, { useState } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout-child'
import SEO from '../components/seo'
import Collapse from '../components/Collapse'
import {
  Container,
  Row,
  Col,
  Icon,
  NavbarToggler,
  LinkListItem,
  LinkList
} from 'design-react-kit'
import ReactMarkdown from 'react-markdown'
import '../components/style.css'

export default function PageGeneric({ location, data }) {
  const [isOpen, toggleDropdown] = useState(false)
  return (
    <Layout location={location}>
      <SEO title={data.strapiPaginaMadeInItaly.titolo} description="" />
      <section className="section section-muted project-intro">
        <div className="section-content">
          <Container tag="div" className="my-4">
            <Row>
              <Col className="col-12">
                <div className="d-flex justify-content-between">
                  <div className="project-intro--logo mw-100">
                    <h1 className="max-w-40 text-600">
                      {data.strapiPaginaMadeInItaly.titolo}
                    </h1>
                  </div>
                </div>
              </Col>
            </Row>
            <span className="project-intro--print">
              {data.strapiPaginaMadeInItaly.titolo}
            </span>
          </Container>
        </div>
      </section>

      <article className="container my-5">
        <Row>
          <div className="col-12 col-lg-8 ">
            <div className="card-wrapper card-space pb-0">
              <div className="card card-bg card-big">
                <div className="px-3 px-md-5 card-body pb-0">
                  <div className="card-text">
                    <div className="my-3">
                      {data.strapiPaginaMadeInItaly.sezione.map((s, index) => {
                        return (
                          <div
                            key={index}
                            className="my-3"
                            id={s.titolo != null ?
                              s.titolo
                                .toLowerCase()
                                .replace(/[^a-z0-9 -]/g, '')
                                .replace(/\s+/g, '-')
                              :
                              ""}
                          >
                            {s.titolo != null &&
                              (<h3>{s.titolo}</h3>)
                            }
                            <br />
                            {s.descrizione != null &&
                              (<ReactMarkdown source={s.descrizione} escapeHtml={false} />)
                            }
                            {s.allegato != null &&
                              (s.allegato.extension === 'png' ||
                                s.allegato.extension === 'jpg' ||
                                s.allegato.extension === 'jpeg' ? (
                                  <img
                                    src={s.allegato.publicURL}
                                    alt={s.allegato.publicURL}
                                  ></img>
                                ) : (
                                  <a href={s.allegato.publicURL}>
                                    <Icon icon="it-clip" />
                                  Scarica allegato
                                  </a>
                                ))}
                          </div>
                        )
                      })}
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <nav className="navbar navbar-collapsable it-navscroll-wrapper navbar-expand-lg it-bottom-navscroll it-left-side affix-top col-default">
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
                <div className="close-div-custom">
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
                    <LinkList>
                      {data.strapiPaginaMadeInItaly.sezione.map((s, index) => {
                        return (

                          <LinkListItem
                            href={s.titolo !== null ? (
                              '#' +
                              s.titolo
                                .toLowerCase()
                                .replace(/[^a-z0-9 -]/g, '')
                                .replace(/\s+/g, '-')
                            )
                              : '#'}
                            key={index}
                          >
                            {s.titolo}
                          </LinkListItem>
                        )
                      })}
                    </LinkList>
                  </div>
                </div>
              </Collapse>
            </nav>
          </div>
        </Row>
      </article>
    </Layout>
  )
}

export const result = graphql`
  query pageQuery($pageId: String) {
    strapiPaginaMadeInItaly(id: { eq: $pageId }) {
      titolo
      sezione {
        titolo
        descrizione
        allegato {
          publicURL
          extension
        }
      }
    }
  }
`
//commento
// PageGeneric.PropTypes = {
//   location: PropTypes.shape({
//     pathname: PropTypes.string
//   }),
//   data: PropTypes.shape({
//     allStrapiSfida: PropTypes.shape({
//       nodes: PropTypes.array
//     })
//   })
// }
