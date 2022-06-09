import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'

import BackgroundImage from 'gatsby-background-image'

const BackgroundDiv = ({ className }) => {
  <StaticQuery
    query={graphql`
      query {
        background: file(relativePath: { eq: "assets/images/backgrounds/christopher-burns-Kj2SaNHG-hg-unsplash.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const imageData = data.background.childImageSharp.fluid
      return (
        <BackgroundImage
          Tag="div"
          className={className}
          fluid={imageData}
        >
          <div className="img-svg"></div>
        </BackgroundImage>
      )
    }}
  />
}

BackgroundDiv.propTypes = {
  className: PropTypes.string
}

export default BackgroundDiv
