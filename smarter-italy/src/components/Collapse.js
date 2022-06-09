import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Collapse as CollapseBase } from 'reactstrap'

const propTypes = {
  ...CollapseBase.propTypes, // eslint-disable-line react/forbid-foreign-prop-types
  /** Indica se il componente Collapse è usato all'interno di un componente Header */
  header: PropTypes.bool,
  /** Indica se il menu HeaderNav sia aperto o meno. Usato unicamente nel caso della HeaderNav, ovvero con navbar e header entrambi true */
  inOpen: PropTypes.bool,
  /** Funzione chiamata su click di overlay dell'HeaderNav aperto. Usato unicamente nel caso della HeaderNav, ovvero con navbar e header entrambi true */
  onOverlayClick: PropTypes.func
}

const Collapse = ({
  header,
  className,
  navbar,
  children,
  isOpen,
  onOverlayClick,
  ...attributes
}) => {
  const classes = classNames(className, 'navbar-collapsable', {
    expanded: isOpen
  })
  return (
    <CollapseBase
      className={classes}
      navbar={navbar}
      style={{ display: isOpen ? 'block' : 'none' }}
      {...attributes}>

      {children}
    </CollapseBase>
  )
}

Collapse.propTypes = propTypes
Collapse.defaultProps = CollapseBase.defaultProps
export default Collapse
