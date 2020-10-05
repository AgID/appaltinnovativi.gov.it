import React from 'react'
import PropTypes from 'prop-types'

import BackgroundImage from 'gatsby-background-image'

const BackgroundDiv = ({ className, src }) => {

  const imageData = src
  return (
    <BackgroundImage
      Tag="div"
      className={className}
      fluid={imageData}
    >
      <div className="img-svg"></div>
    </BackgroundImage>
  )

}

BackgroundDiv.propTypes = {
  className: PropTypes.string
}

export default BackgroundDiv
