import React, { useState } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const UserArea = (props) => {
  const [dropdownOpen, setOpen] = useState(false)

  const toggle = () => setOpen(!dropdownOpen)
  const redirect = () => { window.open('https://survey.appaltinnovativi.gov.it/index.php/444157/newtest/Y?G01Q06=' + props.keycloak.idTokenParsed.preferred_username, '_blank') }
  return (
    <>
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle className="ml-3 btn-light btn-sm" caret>
                Area Personale
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => redirect()}>Esprimi un fabbisogno</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => props.keycloak.logout()}>Esci</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    </>
  )
}

export default UserArea
