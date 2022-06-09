import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import LogoRepubblicaItaliana from '../assets/images/logo-repubblica-italiana-blu.svg'
import {
  Header,
  Headers,
  HeaderContent,
  HeaderRightZone,
  HeaderSocialsZone,
  HeaderToggler,
  HeaderLinkZone,
  Icon,
  LinkList,
  LinkListItem,
  Nav,
  NavItem,
  NavLink,
  HeaderBrand,
  Collapse
} from 'design-react-kit'

function getSectionFromLocation ({ pathname } = {}) {
  if (pathname === '/') {
    return ''
  }
  if (/il-programma/.test(pathname)) {
    return 'Il Programma'
  }
  if (/sfide/.test(pathname)) {
    return 'Sfide'
  }
}

const SlimHeaderFullResponsive = () => {
  return (
    <Header type="slim" theme="default">
      <HeaderContent>
        <HeaderBrand responsive>Altre Informazioni</HeaderBrand>
      </HeaderContent>
    </Header>
  )
}

const SlimHeader = () => {
  const [isOpen, toggleDropdown] = useState(false)
  return (
    <Header type="slim" theme="">
      <HeaderContent>
        <HeaderBrand tag="a" href="https://www.governo.it" target="_blank" rel="noopener noreferrer">
                    Agenzia per l&#39;Italia Digitale
        </HeaderBrand>
        <HeaderLinkZone>
          <HeaderToggler onClick={() => toggleDropdown(!isOpen)} id="collapsetoggler">
            <span>Altre informazioni</span>
            <Icon icon="it-expand" />
          </HeaderToggler>
          <Collapse isOpen={isOpen} header>
            <LinkList tag="div">
              <LinkListItem
                href="http://www.agid.gov.it/"
                target="_blank"
                rel="noopener noreferrer"
              >
              </LinkListItem>
              <LinkListItem
                href="https://innovazione.gov.it/"
                target="_blank"
                rel="noopener noreferrer"
              >
                MITD
              </LinkListItem>
              <LinkListItem
                href="https://www.agid.gov.it/sites/default/files/repository_files/piano_triennale_per_linformatica_nella_pubblica_amministrazione_2021-2023.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Piano Triennale
              </LinkListItem>
              <LinkListItem
                href="https://innovazione.gov.it/progetti/sperimentazione-italia/#in-breve"

                target="_blank"
                rel="noopener noreferrer"
              >
                Sperimenta Italia
              </LinkListItem>
              <LinkListItem
                href="https://innovation-procurement.org/"

                target="_blank"
                rel="noopener noreferrer"
              >
                Innovation procurement
              </LinkListItem>
            </LinkList>
          </Collapse>
        </HeaderLinkZone>
      </HeaderContent>
    </Header>
  )
}

const CenterHeader = () => {
  return (
    <Header type="center" theme="light">
      <HeaderContent>
        <div className="it-brand-wrapper">
          <a href="/">
            <LogoRepubblicaItaliana className="icon icon-lg" />
            <div className="it-brand-text pr-0">
              <h2 className="appalti-main-title">
                <span className="font-weight-bolder">Smarter Italy</span>
              </h2>
              <h3 className="d-md-block">Appaltinnovativi.GOV</h3>
            </div>
          </a>
        </div>
        <HeaderRightZone>
          <HeaderSocialsZone label="Seguici su">
            <ul>
              <li>
                <a aria-label="Linkedin" href="https://it.linkedin.com/company/agenzia-italia-digitale" target="_blank" rel="noreferrer">
                  <Icon color="" icon="it-linkedin" padding={false} size="" />
                </a>
              </li>
              <li>
                <a aria-label="Twitter" href="https://twitter.com/agidgov" target="_blank" rel="noreferrer">
                  <Icon color="" icon="it-twitter" padding={false} size="" />
                </a>
              </li>
              <li>
                <a aria-label="Facebook" href="https://www.facebook.com/AgIDGovIT/" target="_blank" rel="noreferrer">
                  <Icon color="" icon="it-facebook" padding={false} size="" />
                </a>
              </li>
            </ul>
          </HeaderSocialsZone>
        </HeaderRightZone>
      </HeaderContent >
    </Header >
  )
}

const NavHeader = ({ active }) => {
  const [isOpen, toggleDropdown] = useState(false)
  return (
    <Header type="navbar" theme="">
      <HeaderContent expand="lg" megamenu>
        <HeaderToggler
          onClick={() => toggleDropdown(!isOpen)}
          className="custom-navbar-toggler"
          aria-controls="nav10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <Icon icon="it-burger" color="primary" />
        </HeaderToggler>
        <Collapse
          isOpen={isOpen}
          navbar
          header
          onOverlayClick={() => toggleDropdown(!isOpen)}
        >
          <div className="menu-wrapper">
            <Nav navbar>
              {['Il Programma', 'Sfide'].map(
                label => {
                  const isActive = label === active
                  return (
                    <NavItem active={isActive} key={label}>
                      <NavLink to={`/${label.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-')}`} active={isActive} tag={Link}>
                        <span>{label}</span>
                        {isActive && <span className="sr-only">current</span>}
                      </NavLink>
                    </NavItem>
                  )
                }
              )}

              <NavItem>
                <NavLink href='https://appaltinnovativi.gov.it/' tag="a">
                  <span>Appaltinnovativi</span>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </Collapse>
      </HeaderContent>
    </Header>
  )
}

const CompleteHeader = ({ location, type }) => {
  const SlimTag = type === 'default' ? SlimHeader : SlimHeaderFullResponsive

  const page = getSectionFromLocation(location)
  return (
    <Headers >
      <SlimTag />
      <div className="it-nav-wrapper">
        <CenterHeader />
        <NavHeader active={page} />
      </div>
    </Headers>
  )
}

CompleteHeader.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  type: PropTypes.string
}

CompleteHeader.defaultProps = {
  type: 'default'
}

NavHeader.propTypes = {
  active: PropTypes.string.isRequired
}

export default CompleteHeader
