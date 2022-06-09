import React, { useState } from 'react'
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap'

const SearchBar = () => {
  const [inputVal, setInputVal] = useState(0)

  const search = () => {
    const text = inputVal
    window.open('https://www.google.com/search?q=site%3Aappaltinnovativi.gov.it ' + '"' + encodeURIComponent(text) + '"', '_blank')
  }

  return (
    <InputGroup >
      <Input type="text" id="searchbar" placeholder="Ricerca per testo" onChange={(e) => setInputVal(e.target.value)} />
      <InputGroupAddon addonType="append"><Button color="primary" onClick={() => search()}> Cerca </Button></InputGroupAddon>
    </InputGroup>
  )
}

export default SearchBar
