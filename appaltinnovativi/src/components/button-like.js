import React from 'react'
import Modal from 'react-modal'
import { Button } from 'design-react-kit'

const ButtonLike = ({
  keycloak,
  sfidaId,
  titoloSfida
}) => {
  const [modalIsOpen, setIsOpen] = React.useState(false)
  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false)
  }

  function handleLike(keycloak, sfidaId,titoloSfida) {
    if (keycloak !== undefined) {
      if (!keycloak.authenticated) {
        openModal()
      } else {
        window.open('https://survey.appaltinnovativi.gov.it/index.php/559759/newtest/Y?G01Q01=' + keycloak.idTokenParsed.preferred_username + '&G02Q03=' + sfidaId +'&G02Q04='+titoloSfida, '_blank')
      }
    }
  }

  return (
    <>
      <Button
        size="md"
        color="primary"
        onClick={() => handleLike(keycloak, sfidaId,titoloSfida)}
      >
        Like
      </Button>
      <Modal
        className="modal-style callout note bg-white"
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >

        <h2 >Ciao</h2>
        <div>Accedi per manifestare il tuo interesse</div>
        <br/>
        <Button color="primary" size="sm" className="centered-button" onClick={() => keycloak.login()}>
          Accedi
        </Button>
      </Modal>
    </>
  )
}

export default ButtonLike
