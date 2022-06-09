import PropTypes from 'prop-types'
import React from 'react'
import { CardBody, Card, CardReadMore, CardTitle } from 'design-react-kit'
import LogoConsultazioni from '../assets/images/consultazioni.png'

const CardConsultazioni = ({
  category,
  image,
  title,
  description,
  publicationDate,
  rangeAmount,
  proponent,
  contractor,
  isOpen,
  procedure,
  strapiId
}) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 d-flex mb-4">
      <Card
        noWrapper={false}
        className="card-teaser card-consultazioni align-self-stretch rounded shadow "
      >
        <CardBody >
          <div className="top-icon mb-2">
            <h6 className="text-primary">
              <img className="icon mr-1" src={LogoConsultazioni} />
              {category}
            </h6>
          </div>
          <div className="card-text mb-5">
            <a>
              <img className="w-100" src={image} />
            </a>
            <CardTitle tag="h5" className="mb-2 mt-2">
              {title}
            </CardTitle>
            <div className="my-2">
              <p>{description}</p>

              <div className="dati-card">
                <p>
                  <strong>Pubblicazione: </strong>
                  {publicationDate}
                  <br />
                  {rangeAmount != null && (
                    <>
                      <strong>Fascia di importo: </strong>
                      {rangeAmount}
                      <br />
                    </>
                  )}
                  {procedure != null && (
                    <>
                      <strong>Tipologia Procedura: </strong>
                      {procedure}
                      <br />
                    </>
                  )}
                  <strong>Proponente: </strong>
                  {proponent}
                  <br />
                  {contractor.length > 0 && (<strong>Appaltante: </strong>)}{contractor}
                </p>
              </div>
            </div>
          </div>

          <CardReadMore
            iconName="it-arrow-right"
            tag="a"
            href={'/consultazioni/' + title.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-')}
            text="Leggi di più"
          />

          {isOpen === true && (
            <span className="badge badge-success badge-pill badge-open p-2">
              OPEN
            </span>
          )}

        </CardBody>{' '}
      </Card>{' '}
    </div>
  )
}

CardConsultazioni.propTypes = {
  siteTitle: PropTypes.string,
  category: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  publicationDate: PropTypes.string,
  rangeAmount: PropTypes.string,
  proponent: PropTypes.array,
  contractor: PropTypes.array,
  isOpen: PropTypes.bool,
  strapiId: PropTypes.string
}

CardConsultazioni.defaultProps = {
  siteTitle: ''
}

export default CardConsultazioni
