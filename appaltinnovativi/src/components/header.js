import PropTypes from 'prop-types'
import React, { useState } from 'react'
import LogoRepubblicaItaliana from '../assets/images/logo-repubblica-italiana-blu.svg'

import { withKeycloak } from '@react-keycloak/web'

import {
  Button,
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
  Collapse,
  HeaderSearch
} from 'design-react-kit'
import UserArea from './user-area'

function getSectionFromLocation ({ pathname } = {}) {
  if (pathname === '/' || /sfide/.test(pathname)) {
    return ''
  }
  if (/il-portale/.test(pathname)) {
    return 'Il Portale'
  }
  if (/fabbisogni/.test(pathname)) {
    return 'Fabbisogni'
  }
  if (/consultazioni/.test(pathname)) {
    return 'Consultazioni'
  }
  if (/appalti/.test(pathname)) {
    return 'Appalti'
  }
  if (/risorse/.test(pathname)) {
    return 'Risorse'
  }
  if (/open-data/.test(pathname)) {
    return 'Open Data'
  }
  return ''
}

function getUrl (loc) {
  if (loc === 'Smarter Italy') { return 'https://smarteritaly.appaltinnovativi.gov.it/' }
  if (loc === 'Made in Italy') { return 'https://madeinitaly.131.1.216.224.sslip.io/' }
  return '/' + loc.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-')
}

const SlimHeaderFullResponsive = ({ keycloak }) => {
  return (
    <Header type="slim" theme="default">
      <HeaderContent>
        <HeaderBrand responsive>Altre Informazioni</HeaderBrand>
        <HeaderRightZone>
          <Button color="primary" size="full" className="btn-icon" href="#">
            <span className="rounded-icon">
              <Icon color="primary" icon="it-user" />
            </span>
            <span className="d-none d-lg-block">
              Accedi all&#39;area personale
            </span>
          </Button>
        </HeaderRightZone>
      </HeaderContent>
    </Header>
  )
}

const SlimHeader = ({ keycloak }) => {
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
        {/* <HeaderRightZone> */}
        <div className="it-access-top-wrapper">

          {keycloak !== undefined ? (
            keycloak.authenticated ? (
              <>
                <UserArea keycloak={keycloak}/>
              </>
            ) : (
              <Button color="light" size="sm" className="ml-3 bg-light btn-light" onClick={() => keycloak.login()} >
                    Accedi
              </Button>
            )) : (
            <Button color="light" size="sm" className="ml-3 bg-light btn-light" >
                  Accedi
            </Button>
          )
          }

        </div>
        {/* </HeaderRightZone> */}
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
                <span className="font-weight-bolder">Appaltinnovativi.GOV</span>
              </h2>
              <h3 className="d-md-block">Gli appalti di innovazione della Pubblica Amministrazione</h3>
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
          <HeaderSearch label="Cerca" href="/sfide" iconName="it-search" />
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
              {['Il Portale', 'Fabbisogni', 'Consultazioni', 'Appalti', 'Risorse', 'Smarter Italy', 'Open Data'].map(
                label => {
                  const isActive = label === active
                  return (
                    <NavItem key={label}>
                      <NavLink href={getUrl(label)} active={isActive}>
                        <span>{label}</span>
                        {isActive && <span className="sr-only">current</span>}
                      </NavLink>
                    </NavItem>
                  )
                }
              )}
            </Nav>
          </div>
        </Collapse>
      </HeaderContent>
    </Header>
  )
}

const CompleteHeader = ({ keycloak, location, type }) => {
  const SlimTag = type === 'default' ? SlimHeader : SlimHeaderFullResponsive

  const page = getSectionFromLocation(location)
  return (
    <Headers >
      <SlimTag keycloak={keycloak} />
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

export default withKeycloak(CompleteHeader)
