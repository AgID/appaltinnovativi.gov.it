/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'

import { withKeycloak } from '@react-keycloak/web'

import 'bootstrap-italia/dist/css/bootstrap-italia.min.css'
import '../components/style.css'
import 'typeface-titillium-web'
import 'typeface-roboto-mono'
import 'typeface-lora'
import Header from './header'
import Footer from './footer'
import { FontLoader } from 'design-react-kit'

const Layout = ({ keycloak, children, location }) => {
  const org = {
    name: 'APPALTINNOVATIVI.GOV',
    tagLine: 'Gli appalti della pubblica amministrazione',
    address: 'Via Liszt, 21 00144 Roma'
  }

  return (
    <>
      <FontLoader />
      <Header location={location} sticky type="default" org={org} keycloak={keycloak} />
      <main>{children}</main>
      <Footer org={org} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
}

export default withKeycloak(Layout)
