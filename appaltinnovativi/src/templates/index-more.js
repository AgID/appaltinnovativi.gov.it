import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import '../components/style.css'
import CardAppalti from '../components/card-appalti'
import CardFabbisogni from '../components/card-fabbisogni'
import CardConsultazioni from '../components/card-consultazioni'
import SearchBar from '../components/search-bar'

import {
  Container,
  Row,
  FormGroup,
  Input,
  Col,
  Label} from 'design-react-kit'


class IndexMorePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stato: Array(3).fill(""),
      categoria: Array(),
      procedura: Array(),
      importo: Array()
    }
    this.initCategorias()
    this.initProceduras()
    this.initImportos()

  }

  componentDidMount() {
    this.setStateFromSession()
  }


  chkCounter = 3
  diff = this.chkCounter
  index = 0
  categorias = []
  proceduras = []
  importos = []


  initCategorias() {
    const data = this.props.data
    data.allStrapiSfida.nodes.forEach(sfida => {
      let entry = sfida.categoriaSfida.nome
      if (!this.categorias.includes(entry))
        this.categorias.push(entry)
    })
    this.state.categoria.length = this.categorias.length
    this.state.categoria.fill("")
  }

  initProceduras() {
    const data = this.props.data
    data.allStrapiSfida.nodes.forEach(sfida => {
      if (sfida.stato === "consultazione") {
        let entryCons = sfida.consultazione.procedura
        if (entryCons != null) {
          if (!this.proceduras.includes(entryCons.nome))
            this.proceduras.push(entryCons.nome)
        }
      }
      if (sfida.stato === "appalto") {
        sfida.appalto.forEach(appalto => {
          let entryApp = appalto.procedura.nome
          if (!this.proceduras.includes(entryApp))
            this.proceduras.push(entryApp)
        })
      }
    })
    this.state.procedura.length = this.proceduras.length
    this.state.procedura.fill("")
  }

  initImportos() {
    const data = this.props.data
    data.allStrapiSfida.nodes.forEach(sfida => {
      if (sfida.stato === "consultazione") {
        let entryCons = sfida.consultazione.fasciaImporto
        if (entryCons != null) {
          if (!this.importos.includes(entryCons.fascia))
            this.importos.push(entryCons.fascia)
        }
      }
      if (sfida.stato === "appalto") {
        sfida.appalto.forEach(appalto => {
          let entryApp = appalto.fasciaImporto.fascia
          if (!this.importos.includes(entryApp))
            this.importos.push(entryApp)
        })
      }
    })
    this.state.importo.length = this.importos.length
    this.state.importo.fill("")
  }


  applicaFiltriStato = (e) => {
    const filterState = this.state.stato.slice()
    let filter = e.target.id
    switch (filter) {
      case "Fabbisogno":
        if (filterState[0] == "") {
          filterState[0] = filter
          this.setState({ stato: filterState })
        }
        else {
          filterState[0] = ""
          this.setState({ stato: filterState })
        }
        break;
      case "Consultazione":
        if (filterState[1] == "") {
          filterState[1] = filter
          this.setState({ stato: filterState })
        }
        else {
          filterState[1] = ""
          this.setState({ stato: filterState })
        }
        break;
      case "Appalto":
        if (filterState[2] == "") {
          filterState[2] = filter
          this.setState({ stato: filterState })
        }
        else {
          filterState[2] = ""
          this.setState({ stato: filterState })
        }
        break;
    }
    sessionStorage.setItem("stato", filterState)
  }

  applicaFiltriCategoria = (e) => {
    const filterCat = this.state.categoria.slice()
    let filter = e.target.id
    let index = e.target.name
    if (filterCat[index] == "") {
      filterCat[index] = filter
      this.setState({ categoria: filterCat })
    }
    else {
      filterCat[index] = ""
      this.setState({ categoria: filterCat })
    }
    sessionStorage.setItem("categoria", filterCat)
  }

  applicaFiltriProcedura = (e) => {
    const filterProc = this.state.procedura.slice()
    let filter = e.target.id
    let index = e.target.name
    if (filterProc[index] == "") {
      filterProc[index] = filter
      this.setState({ procedura: filterProc })
    }
    else {
      filterProc[index] = ""
      this.setState({ procedura: filterProc })
    }
    sessionStorage.setItem("procedura", filterProc)
  }

  applicaFiltriImporto = (e) => {
    const filterImp = this.state.importo.slice()
    let filter = e.target.id
    let index = e.target.name
    if (filterImp[index] == "") {
      filterImp[index] = filter
      this.setState({ importo: filterImp })
    }
    else {
      filterImp[index] = ""
      this.setState({ importo: filterImp })
    }
    sessionStorage.setItem("importo", filterImp)
  }

  createCardAppalti = (sfida, appalto) => {
    return (
      <CardAppalti
        key={sfida.id + '-' + appalto.idAppalto}
        category={sfida.categoriaSfida.nome}
        image={sfida.immagine.publicURL}
        title={appalto.titolo}
        publicationDate={appalto.dataPubblicazione}
        rangeAmount={appalto.fasciaImporto.fascia}
        description={appalto.descrizioneBreve}
        procedure={appalto.procedura.nome}
        proponent={sfida.proponente.map(prop => (prop.ente.alias + ' '))}
        contractor={sfida.appaltante.map(app => (app.ente.alias + ' '))}
        isOpen={sfida.bollinoOPEN}
      ></CardAppalti>
    )
  }

  setStateFromSession() {
    let stato = sessionStorage.getItem("stato")
    let categoria = sessionStorage.getItem("categoria")
    let procedura = sessionStorage.getItem("procedura")
    let importo = sessionStorage.getItem("importo")
    if (stato) {
      stato = stato.split(",")
      this.setState({ stato: stato })
    }
    if (categoria) {
      categoria = categoria.split(",")
      this.setState({ categoria: categoria })
    }
    if (procedura) {
      procedura = procedura.split(",")
      this.setState({ procedura: procedura })
    }
    if (importo) {
      importo = importo.split(",")
      this.setState({ importo: importo })
    }
  }

  render() {
    this.chkCounter = 0
    this.diff = this.chkCounter
    const data = this.props.data
    const categorias = this.categorias
    const proceduras = this.proceduras
    const importos = this.importos
    const allProcEqualsNull = this.state.procedura.every(v => v === "")
    const allImpEqualsNull = this.state.importo.every(v => v === "")

    function customIncludes(item, array, state) {
      let allEqualsNull = state.every(v => v === "")
      if (array.length == 0 && allEqualsNull)
        return true
      if (array.length == 0 && !allEqualsNull)
        return false
      return array.includes(item)
    }

    const filterData = () => {
      let resStato = []
      let resCategoria = []
      let resProcedura = []
      let resImporto = []
      let result = []
      this.state.stato.forEach(stato => {
        stato != "" && (
          data.allStrapiSfida.nodes.filter(sfida => (sfida.stato === stato.toLowerCase())).forEach(sfida => { resStato.push(sfida) })
        )
      })
      this.state.categoria.forEach(cat => {
        cat != "" && (
          data.allStrapiSfida.nodes.filter(sfida => (sfida.categoriaSfida.nome === cat)).forEach(sfida => { resCategoria.push(sfida) })
        )
      })
      this.state.procedura.forEach(proc => {
        proc != "" && (
          data.allStrapiSfida.nodes.filter(sfida => (sfida.stato === "consultazione" && (sfida.consultazione.procedura != null && (sfida.consultazione.procedura.nome === proc)) ||
            sfida.stato === "appalto" && (sfida.appalto.some(appalto => (appalto.procedura.nome === proc)))))
            .forEach(sfida => { resProcedura.push(sfida) })
        )
      })
      this.state.importo.forEach(imp => {
        imp != "" && (
          data.allStrapiSfida.nodes.filter(sfida => (sfida.stato === "consultazione" && (sfida.consultazione.fasciaImporto != null && (sfida.consultazione.fasciaImporto.fascia === imp)) ||
            sfida.stato === "appalto" && (sfida.appalto.some(appalto => (appalto.fasciaImporto.fascia === imp)))))
            .forEach(sfida => { resImporto.push(sfida) })
        )
      })
      result = data.allStrapiSfida.nodes.filter(element => customIncludes(element, resStato, this.state.stato) && customIncludes(element, resCategoria, this.state.categoria) && customIncludes(element, resProcedura, this.state.procedura) && customIncludes(element, resImporto, this.state.importo))
      return result

    }

    const filteredData = filterData()
    filteredData.sort()


    return (
      <Layout location={this.props.location}>
        <SEO title="Tutte le sfide" description="Il percorso dell’innovazione" />
        <section>
          <Container tag="div" >
            <FormGroup check>
              
              <Row >
                <Col className="col-12 col-md-6 col-lg-2 mb-4">
                  <legend className="mt-3 mb-3">Stato</legend>

                  <Input key='fabb' className="mb-1" type="checkbox" name="Fabbisogno" id="Fabbisogno" onChange={(e) => this.applicaFiltriStato(e)} />
                  {this.state.stato.includes("Fabbisogno") && (document.getElementById("Fabbisogno").checked = true)}
                  <Label
                    for="Fabbisogno"
                    tag="label"
                  >Fabbisogno</Label>
                  <br />
                  <Input key='cons' className="mb-1" type="checkbox" id="Consultazione" onChange={(e) => this.applicaFiltriStato(e)} />
                  {this.state.stato.includes("Consultazione") && (document.getElementById("Consultazione").checked = true)}
                  <Label
                    check
                    for="Consultazione"
                    tag="label"
                  >Consultazione</Label>
                  <br />
                  <Input key='app' className="mb-1" type="checkbox" id="Appalto" onChange={(e) => this.applicaFiltriStato(e)} />
                  {this.state.stato.includes("Appalto") && (document.getElementById("Appalto").checked = true)}
                  <Label
                    check
                    for="Appalto"
                    tag="label"
                  >Appalto</Label>
                  <br />

                </Col>

                <Col className="col-12 col-md-6 col-lg-3 mb-4">
                  <legend className="mt-3 mb-3">Categoria</legend>
                  <FormGroup check tag="div">
                    {categorias.map(cat => {
                      this.index = this.chkCounter - this.diff
                      this.chkCounter++
                      return (
                        <div key={cat}>
                          <Input  className="mb-1" type="checkbox" name={this.index} id={cat} onClick={(e) => this.applicaFiltriCategoria(e)} />
                          {this.state.categoria.includes(cat) && (document.getElementById(cat).checked = true)}
                          <Label
                            check
                            for={cat}
                            tag="label"
                          >{cat}</Label>
                          <br />
                        </div>
                      )
                    }
                    )}
                  </FormGroup>
                  <p hidden >{this.diff = this.chkCounter}</p>
                </Col>
                <Col className="col-12 col-md-6 col-lg-4 mb-4">
                  <legend className="mt-3 mb-3">Tipologia procedura</legend>
                  <FormGroup check tag="div">
                    {proceduras.map(proc => {

                      this.index = this.chkCounter - this.diff
                      this.chkCounter++
                      return (
                        <div key={proc}>
                          <Input  className="mb-1" type="checkbox" name={this.index} id={proc} onChange={(e) => this.applicaFiltriProcedura(e)} />
                          {this.state.procedura.includes(proc) && (document.getElementById(proc).checked = true)}
                          <Label
                            check
                            for={proc}
                            tag="label"
                          >{proc}</Label>
                          <br />
                        </div>
                      )
                    }
                    )}
                  </FormGroup>
                  <p hidden >{this.diff = this.chkCounter}</p>
                </Col>
                <Col className="col-12 col-md-6 col-lg-3 mb-4">
                  <legend className="mt-3 mb-3">Fascia importo</legend>
                  <FormGroup check tag="div">
                    {importos.map(imp => {
                      this.index = this.chkCounter - this.diff
                      this.chkCounter++
                      return (
                        <div key={imp}>
                          <Input  className="mb-1" type="checkbox" name={this.index} id={imp} onChange={(e) => this.applicaFiltriImporto(e)} />
                          {this.state.importo.includes(imp) && (document.getElementById(imp).checked = true)}
                          <Label
                            check
                            for={imp}
                            tag="label"
                          >{imp}</Label>
                          <br />
                        </div>
                      )
                    }
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="col-12 col-md-6 mb-4">
                    <SearchBar></SearchBar>
                </Col>
              </Row>
            </FormGroup>
          </Container>
        </section>
        <div className="section bg-light " id="evidenza">
          <Container tag="div" >
            <Row>
              {filteredData.map(sfida => {
                switch (sfida.stato) {
                  case 'fabbisogno':
                    return (
                      <CardFabbisogni
                        key={sfida.id}
                        category={sfida.categoriaSfida.nome}
                        image={sfida.immagine.publicURL}
                        title={sfida.fabbisogno.titolo}
                        publicationDate={sfida.fabbisogno.dataPubblicazione}
                        description={sfida.fabbisogno.descrizioneBreve}
                        proponent={sfida.proponente.map(prop => (prop.ente.alias + ' '))}
                        contractor={sfida.appaltante.map(app => (app.ente.alias + ' '))}
                        isOpen={sfida.bollinoOPEN}
                        keycloak={this.props.keycloak}
                        strapiId={sfida.id}
                      ></CardFabbisogni>
                    )
                  case 'consultazione':
                    return (
                      <CardConsultazioni
                        key={sfida.id}
                        category={sfida.categoriaSfida.nome}
                        image={sfida.immagine.publicURL}
                        title={sfida.consultazione.titolo}
                        publicationDate={sfida.consultazione.dataPubblicazione}
                        rangeAmount={sfida.consultazione.fasciaImporto.fascia}
                        description={sfida.consultazione.descrizioneBreve}
                        procedure={sfida.consultazione.procedura != null ? sfida.consultazione.procedura.nome : null}
                        proponent={sfida.proponente.map(prop => (prop.ente.alias + ' '))}
                        contractor={sfida.appaltante.map(app => (app.ente.alias + ' '))}
                        isOpen={sfida.bollinoOPEN}
                        
                      ></CardConsultazioni>
                    )
                  case 'appalto':

                    if (allProcEqualsNull && allImpEqualsNull)
                      return (
                        sfida.appalto.map(appalto => {
                          return (
                            this.createCardAppalti(sfida, appalto)
                          )
                        }
                        )
                      )
                    if (!allProcEqualsNull && allImpEqualsNull)
                      return (
                        sfida.appalto.map(appalto => {
                          return (
                            (this.state.procedura.includes(appalto.procedura.nome)) && (
                              this.createCardAppalti(sfida, appalto)
                            )
                          )
                        }
                        )
                      )
                    if (allProcEqualsNull && !allImpEqualsNull)
                      return (
                        sfida.appalto.map(appalto => {
                          return (
                            (this.state.importo.includes(appalto.fasciaImporto.fascia)) && (
                              this.createCardAppalti(sfida, appalto)
                            )
                          )
                        }
                        )
                      )
                    if (!allProcEqualsNull && !allImpEqualsNull)
                      return (
                        sfida.appalto.map(appalto => {
                          return (
                            (this.state.procedura.includes(appalto.procedura.nome) && this.state.importo.includes(appalto.fasciaImporto.fascia)) && (
                              this.createCardAppalti(sfida, appalto)
                            )
                          )
                        }
                        )
                      )
                }
              })}
            </Row>
          </Container>
        </div>
      </Layout >
    )
  }
}

export const InEvidenzaQuery = graphql`
 query allSfide {
  allStrapiSfida( sort: { fields: [appalto___dataPubblicazione, consultazione___dataPubblicazione, fabbisogno___dataPubblicazione], order: [DESC, DESC, DESC] }){
    nodes {
      id
      stato
      bollinoOPEN

      categoriaSfida {
        nome
      }

      proponente {
        ente {
          alias
        }
      }
      appaltante {
        ente {
          alias
        }
      }

      immagine {
        publicURL
      }

      fabbisogno {
        titolo
        dataPubblicazione
        descrizioneBreve
      }

      consultazione {
        titolo
        dataPubblicazione
        descrizioneBreve
        fasciaImporto {
          fascia
        }
        procedura{
          nome
        }
      }

      appalto {
        titolo
        idAppalto
        descrizioneBreve
        dataPubblicazione
        fasciaImporto {
          fascia
        }
        procedura {
          nome
        }      
      }
    }
  }
}
`

IndexMorePage.propTypes = {
  data: PropTypes.shape({
    allStrapiSfida: PropTypes.shape({
      nodes: PropTypes.array
    })
  })
}

export default IndexMorePage
